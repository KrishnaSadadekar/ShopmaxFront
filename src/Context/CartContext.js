import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
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
  const { email } = useContext(AuthContext);

  const fetchCart = async () => {
    dispatch({ type: 'FETCH_CART_REQUEST' });
    try {
      const response = await axios.post('http://localhost:4000/api/cart', { email });
      const cartData = response.data || [];
      localStorage.setItem('cart', JSON.stringify(cartData));
      dispatch({ type: 'FETCH_CART_SUCCESS', payload: cartData });
    } catch (error) {
      dispatch({ type: 'FETCH_CART_FAILURE', payload: error.message });
    }
  };

  const updateCartAfterLogin = async (email) => {
    try {
      const response = await axios.post('http://localhost:4000/api/cart', { email });
      const userCart = response.data || [];
      localStorage.setItem('cart', JSON.stringify(userCart));
      dispatch({ type: 'UPDATE_CART', payload: userCart });
    } catch (error) {
      console.error('Failed to fetch user cart:', error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchCart();
    }
  }, [email]);

  const addItemToCart = async (item) => {
    const updatedCart = [...state.cart, item];
    dispatch({ type: 'ADD_ITEM', payload: item });
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    try {
      await axios.post('http://localhost:4000/api/addtocart', { item });
      fetchCart();
    } catch (error) {
      console.error('Failed to add item:', error.message);
      // Optionally handle rollback
    }
  };

  const removeItemFromCart = async (product_id, size) => {
    const updatedCart = state.cart.filter(item => item.product_id !== product_id || item.size !== size);
    dispatch({ type: 'REMOVE_ITEM', payload: { product_id, size } });
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    try {
      await axios.post('http://localhost:4000/api/removeitem', { email, product_id, size });
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error.message);
      // Optionally handle rollback
    }
  };

  const clearCart = async() => {
    dispatch({ type: 'CLEAR_CART' });
    const response = await axios.post('http://localhost:4000/api/clearcart', { email });
      const cartData = response.data || [];
      localStorage.setItem('cart', JSON.stringify(cartData))
    
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addItemToCart, removeItemFromCart, clearCart, updateCartAfterLogin }}>
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
