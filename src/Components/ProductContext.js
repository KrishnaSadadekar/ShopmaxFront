import { useReducer, useContext, createContext } from "react";
import productReducer from "../Reducer/ProductReducer";

// Create the context
const ProductContext = createContext();

const initialState = {
    products: [],
    filteredProducts: []
};
// Export a custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};
