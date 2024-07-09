// Context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Service/helper';
import { CartService } from '../Service/CartService'; // Import CartService

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const storedEmail = localStorage.getItem('email');

    if (authToken) {
      verifyAuthToken(authToken);
    } else if (storedEmail) {
      setEmail(storedEmail);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyAuthToken = async (authToken) => {
    try {
      console.log('Verify the token')
      const decoded = parseJwt(authToken);
      if (decoded && decoded.email) {
        setEmail(decoded.email);
        localStorage.setItem('email', decoded.email);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Failed to decode token:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, { email, password });
      const { authToken } = response.data;
      localStorage.setItem('authToken', authToken);
      setEmail(email);
      localStorage.setItem('email', email);
      const cart = await CartService.updateCart(email); // Fetch the user's cart after login
      
      return "success";
    } catch (error) {
      console.error('Login failed:', error);
      return "failure";
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    localStorage.removeItem('cart'); // Remove cart from local storage
    setEmail(null);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
    } catch (error) {
      console.error('Invalid JWT token:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ email, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
