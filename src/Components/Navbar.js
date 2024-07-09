// Navbar.js
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

function Navbar() {
    const navigate = useNavigate();
    
    const { email, logout } = useContext(AuthContext);
    const { state: { cart } } = useCart();
    const [cartCount, setCartCount] = useState(cart.length);
    const [isNavOpen, setIsNavOpen] = useState(false);

    // Toggle button 
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Close navbar on link click
    const handleNavLinkClick = () => {
        setIsNavOpen(false);
    }

    // Update cart count when cart changes
    useEffect(() => {
        setCartCount(cart.length); // Update cartCount when cart changes
    }, [cart]);


    const handleLogout = () => {
        logout();
         
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className="site-navbar bg-white py-2">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <div className="site-logo">
                            <Link to="/" className="js-logo-clone">ShopMax</Link>
                        </div>
                    </div>

                    <div className="main-nav d-none d-lg-block">
                        <nav className="site-navigation text-right text-md-center" role="navigation">
                            <ul className="site-menu js-clone-nav d-none d-lg-block">
                                <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
                                <li><Link to="/myorders" onClick={handleNavLinkClick}>My Orders</Link></li>
                                <li><Link to="/shop" onClick={handleNavLinkClick}>Shop</Link></li>
                                <li><Link to="/about" onClick={handleNavLinkClick}>About Us</Link></li>
                                <li><Link to="/contact" onClick={handleNavLinkClick}>Contact</Link></li>
                                {email ? (
                                    <li onClick={handleLogout}><Link to="#">Logout</Link></li>
                                ) : (
                                    <li><Link to="/login" onClick={handleNavLinkClick}>Login</Link></li>
                                )}
                            </ul>
                        </nav>
                    </div>

                    <div className="icons">
                        <span>{email}</span>
                        <Link to="/cart" className="icons-btn d-inline-block bag">
                            <span className="icon-shopping-bag"></span>
                            {cartCount > 0 && <span className="number">{cartCount}</span>}
                        </Link>
                        <i className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                            <span className="icon-menu" onClick={toggleNav}></span>
                        </i>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation */}
            {isNavOpen && (
                <div className="mobile-nav d-lg-none">
                    <nav className="site-navigation" role="navigation">
                        <ul className="site-menu">
                            <li><Link to="/" onClick={handleNavLinkClick}>Home</Link></li>
                            <li><Link to="/myorders" onClick={handleNavLinkClick}>My Orders</Link></li>
                            <li><Link to="/shop" onClick={handleNavLinkClick}>Shop</Link></li>
                            <li><Link to="/about" onClick={handleNavLinkClick}>About Us</Link></li>
                            <li><Link to="/contact" onClick={handleNavLinkClick}>Contact</Link></li>
                            {email ? (
                                <li onClick={handleLogout}><Link to="#">Logout</Link></li>
                            ) : (
                                <li><Link to="/login" onClick={handleNavLinkClick}>Login</Link></li>
                            )}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Navbar;
