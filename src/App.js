// src/App.js
import React, { useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import CheckOut from './Pages/CheckOut';
import Cart from './Components/Cart';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext'; // Ensure correct import
import ThankYou from './Components/ThankYou';
import MyOrders from './Pages/MyOrders';
function App() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'slide',
            once: true
        });
    }, []);

    return (
        <AuthProvider>
            <div className="site-wrap">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path='myorders'element={<ProtectedRoute element={MyOrders}></ProtectedRoute>}></Route>
                        <Route path="/cart" element={<ProtectedRoute element={Cart}></ProtectedRoute>} />
                        <Route path="/order" element={<ProtectedRoute element={CheckOut}></ProtectedRoute>} />
                        <Route path="/thankyou" element={<ProtectedRoute element={ThankYou}></ProtectedRoute>} />
                        {/* Protected Routes */}
                        
                    </Routes>
                    <Footer />
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
