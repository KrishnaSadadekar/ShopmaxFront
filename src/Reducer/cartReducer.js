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
          cart: state.cart.filter(item => !(item.product_id === action.payload.product_id && item.size === action.payload.size))
        };
      case 'UPDATE_CART':
        return { ...state, cart: action.payload };
      case 'CLEAR_CART':
        return { ...state, cart: [] };
      default:
        return state;
    }
  };
  