import React, { useContext, useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { Button } from 'react-bootstrap';
import DIrection from './DIrection';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const { state: { cart, loading, error }, removeItemFromCart } = useCart();
  const [total, setTotal] = useState(0);
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Calculate total whenever cart changes
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleRemoveItem = (product_id, size) => {
    removeItemFromCart(product_id, size);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DIrection title={"cart"} />
      <div className='site'>
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <div className="site-blocks-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <tr key={`${item.product_id}-${item.size}`}>
                          <td className="product-thumbnail d-flex">
                            <img src={`./images/${item.image}`} alt={item.product_name} className="img-fluid" />
                          </td>
                          <td className="product-name">
                            <h2 className="h5 text-black">{item.product_name}</h2>
                          </td>
                          <td><h4 className='h5'><span>&#8377;</span>{item.price}</h4></td>
                          <td>
                            <h2 className="h5 text-black">{item.qty}</h2>
                          </td>
                          <td><h5><span>&#8377;</span>{(item.price * item.qty).toFixed(2)}</h5></td>
                          <td>
                            <Button className="btn btn-primary height-auto btn-sm"
                              onClick={() => handleRemoveItem(item.product_id, item.size)}
                            >X</Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">Your cart is empty</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-6">
                    <Link to={'/shop'} className='btn btn-primary' size="sm" block>
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <span className="text-black">Total</span>
                      </div>
                      <div className="col-md-6 text-right">
                        <strong className="text-black">
                        <span>&#8377;</span>{total.toFixed(2)}
                        </strong>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <Link to={'/order'} className='btn btn-primary' size="lg" block>
                          Proceed To Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
