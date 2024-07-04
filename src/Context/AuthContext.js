import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';

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
            const response = await axios.post('http://localhost:4000/api/login', { email, password });
            const { authToken } = response.data;
            localStorage.setItem('authToken', authToken);
            verifyAuthToken(authToken);
            localStorage.setItem('email', email);
            return "success";
        } catch (error) {
            console.error('Login failed:', error);
            return "failure";
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('email');
        localStorage.removeItem('cart');
        
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
