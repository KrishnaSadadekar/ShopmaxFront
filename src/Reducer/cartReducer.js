export const cartReducer = (state, action) => {
  switch (action.type) {
      case 'ADD_ITEM': {
          // Check if item already exists in cart
          const existingItemIndex = state.items.findIndex(
              item => item.product_id === action.payload.product_id && item.size === action.payload.size
          );
          if (existingItemIndex >= 0) {
              // Item exists, update quantity
              const updatedItems = state.items.map((item, index) =>
                  index === existingItemIndex
                      ? { ...item, qty: item.qty + action.payload.qty }
                      : item
              );
              return { ...state, items: updatedItems };
          }
          // Item does not exist, add new item
          return { ...state, items: [...state.items, action.payload] };
      }
      case 'REMOVE_ITEM':
          return {
              ...state,
              items: state.items.filter(
                  item => !(item.product_id === action.payload.product_id && item.size === action.payload.size)
              )
          };
      case 'CLEAR_CART':
          return { ...state, items: [] };
      case 'UPDATE_ITEM_QUANTITY':
          return {
              ...state,
              items: state.items.map(item =>
                  item.product_id === action.payload.product_id && item.size === action.payload.size
                      ? { ...item, qty: action.payload.qty }
                      : item
              )
          };
      default:
          return state;
  }
};
