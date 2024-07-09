// Context/CartContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { CartService } from '../Service/CartService';
import { AuthContext } from './AuthContext';

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  loading: false,
  error: null,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CART_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_CART_SUCCESS':
      return { ...state, loading: false, cart: action.payload };
    case 'FETCH_CART_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_ITEM':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.product_id !== action.payload.product_id || item.size !== action.payload.size)
      };
    case 'UPDATE_CART':
      return { ...state, cart: action.payload }; // Update entire cart
    case 'CLEAR_CART':
      return { ...state, cart: [] }; // Clear cart
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { email } = useContext(AuthContext) || {};

  useEffect(() => {
    if (email) {
      fetchCart();
    }
  }, [email]);

  const fetchCart = async () => {
    dispatch({ type: 'FETCH_CART_REQUEST' });
    try {
      const cartData = await CartService.fetchCart(email);
      localStorage.setItem('cart', JSON.stringify(cartData));
      dispatch({ type: 'FETCH_CART_SUCCESS', payload: cartData });
    } catch (error) {
      dispatch({ type: 'FETCH_CART_FAILURE', payload: error.message });
    }
  };

  const addItemToCart = async (item) => {
    const updatedCart = [...state.cart, item];
    dispatch({ type: 'ADD_ITEM', payload: item });
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    try {
      await CartService.addItem(item);
      fetchCart();
    } catch (error) {
      console.error('Failed to add item:', error.message);
    }
  };

  const removeItemFromCart = async (product_id, size) => {
    const updatedCart = state.cart.filter(item => item.product_id !== product_id || item.size !== size);
    dispatch({ type: 'REMOVE_ITEM', payload: { product_id, size } });
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    try {
      await CartService.removeItem(email, product_id, size);
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error.message);
      dispatch({ type: 'FETCH_CART_FAILURE', payload: error.message });
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR_CART' });
    try {
      await CartService.clearCart(email);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Failed to clear cart:', error.message);
    }
  };

  const clearCartLocal = () => {
    localStorage.removeItem('cart');
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addItemToCart, removeItemFromCart, clearCart, clearCartLocal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
