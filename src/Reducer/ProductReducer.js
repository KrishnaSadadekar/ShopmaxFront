const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                filteredProducts: action.payload  // Initially show all products
            };
        case 'FILTER_BY_CATEGORY':
            
            return {

                ...state,
                filteredProducts: action.payload === 'All' ? state.products : state.products.filter(
                    product => product.category === action.payload
                )
            };
        default:
            return state;
    }
};

export default productReducer;
