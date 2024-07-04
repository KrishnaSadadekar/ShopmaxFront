import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { email } = useAuth();
    console.log('In Protected route: ', email);
    if (email) {
        return email ? <Component {...rest} /> : <Navigate to="/login" replace />;
    }
    else
    {
        let email =localStorage.getItem('email')
        return email?<Component {...rest} />:<Navigate to={'/login'} replace />
    }


};

export default ProtectedRoute;
