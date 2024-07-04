import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCart, CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';

function Product({ Product }) {
    // State to store selected size and quantity
    const { email } = useContext(AuthContext);
    const { addItemToCart } = useCart();
    const [item, setItem] = useState({
        email: email,
        product_id: Product.product_id || '', // Ensure to get product_id from Product
        size: 'Medium',
        qty: 1,

    });


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addItemToCart(item);
            alert('Added to cart!');
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add to cart.');
        }
    };

    // Handle size change
    const handleSizeChange = (e) => {
        setItem({ ...item, size: e.target.value });
    };

    // Handle quantity change
    const handleQuantityChange = (e) => {
        const qty = parseInt(e.target.value, 10);
        setItem({ ...item, qty: isNaN(qty) ? 1 : qty });
    };

    return (
        <div className="site-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="item-entry">
                            <a href="#" className="product-item md-height bg-gray d-block">
                                <img
                                    src={`./images/${Product.image}`}
                                    alt={Product.product_name}
                                    className="img-fluid"
                                />
                            </a>
                        </div>
                    </div>
                    <Form onSubmit={handleSubmit} className="col-md-8">
                        <h2 className="text-black">{Product.product_name}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Pariatur, vitae, explicabo? Incidunt facere, natus soluta
                            dolores iusto! Molestiae expedita veritatis nesciunt doloremque
                            sint asperiores fuga voluptas, distinctio, aperiam, ratione
                            dolore.
                        </p>
                        <p className="mb-4">
                            Ex numquam veritatis debitis minima quo error quam eos dolorum
                            quidem perferendis. Quos repellat dignissimos minus, eveniet nam
                            voluptatibus molestias omnis reiciendis perspiciatis illum hic
                            magni iste, velit aperiam quis.
                        </p>
                        <p>
                            <strong className="text-primary h4">${Product.price}</strong>
                        </p>
                        <div className="mb-1 d-flex">
                            {['Small', 'Medium', 'Large', 'Extra Large'].map((size) => (
                                <label
                                    key={size}
                                    htmlFor={`option-${size.toLowerCase().replace(' ', '-')}`}
                                    className="d-flex mr-3 mb-3"
                                >
                                    <span
                                        className="d-inline-block mr-2"
                                        style={{ top: '2px', position: 'relative' }}
                                    >
                                        <input
                                            type="radio"
                                            id={`option-${size.toLowerCase().replace(' ', '-')}`}
                                            name="shop-sizes"
                                            value={size}
                                            checked={item.size === size}
                                            onChange={handleSizeChange}
                                        />
                                    </span>
                                    <span className="d-inline-block text-black">{size}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mb-5">
                            <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                                <div className="input-group-prepend">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary js-btn-minus"
                                        onClick={() =>
                                            setItem((prevItem) => ({
                                                ...prevItem,
                                                qty: Math.max(prevItem.qty - 1, 1),
                                            }))
                                        }
                                    >
                                        −
                                    </button>
                                </div>
                                
                                    <input
                                        type="text"
                                        className="form-control text-center"
                                        value={item.qty}
                                        onChange={handleQuantityChange}
                                        placeholder=""
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                    />
                                
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary js-btn-plus"
                                        onClick={() =>
                                            setItem((prevItem) => ({
                                                ...prevItem,
                                                qty: prevItem.qty + 1,
                                            }))
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary"
                        >
                            Add to Cart!
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Product;
