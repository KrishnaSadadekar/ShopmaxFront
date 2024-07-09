// Service/CartService.js
import axios from 'axios';
import { BASE_URL } from './helper';

export const CartService = {
  fetchCart: async (email) => {
    const response = await axios.post(`${BASE_URL}/api/cart`, { email });
    return response.data || [];
  },

  updateCart: async (email) => {
    const response = await axios.post(`${BASE_URL}/api/cart`, { email });
    return response.data || [];
  },

  addItem: async (item) => {
    await axios.post(`${BASE_URL}/api/addtocart`, { item });
  },

  removeItem: async (email, product_id, size) => {
    await axios.post(`${BASE_URL}/api/removeitem`, { email, product_id, size });
  },

  clearCart: async (email) => {
    await axios.post(`${BASE_URL}/api/clearcart`, { email });
  }
};
