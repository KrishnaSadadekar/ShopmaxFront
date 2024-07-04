import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";

function Navbar() {
    const navigate = useNavigate();
    const { email, logout } = useContext(AuthContext);
    
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const { state: { cart }, updateCartAfterLogin } = useCart();
    const [cartCount, setCartCount] = useState(cart.length);

    // Update cart count when cart changes
    useEffect(() => {
        updateCartAfterLogin(email);
    });
    useEffect(() => {

        setCartCount(cart.length);
    }, [cart]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


    const toggleMobileMenu = () => {
        setIsMobileMenuVisible(!isMobileMenuVisible);
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
                                <li><Link to="/">Home</Link></li>
                                <li><Link to={'/myorders'}>My Orders</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                {email ? (


                                    <li onClick={handleLogout}><Link>Logout</Link></li>

                                ) : (
                                    <li><Link to="/login">Login</Link></li>
                                )}
                            </ul>
                        </nav>
                    </div>

                    <div className="icons">
                        <span>{email}</span>

                        {
                            email ? (
                                < Link to="/cart" className="icons-btn d-inline-block bag">
                                    <span className="icon-shopping-bag"></span>
                                    {cartCount > 0 && <span className="number">{cartCount}</span>}
                                </Link>
                            ) : (
                                < Link to="/cart" className="icons-btn d-inline-block bag">
                                    <span className="icon-shopping-bag"></span>
                                </Link>
                            )


                        }
                        <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none">
                            <span className="icon-menu"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Navbar;
