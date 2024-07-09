import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import DIrection from '../Components/DIrection';
import { BASE_URL } from '../Service/helper';

function MyOrders() {
  const { email } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!email) {
        setError('No email provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching orders for email:', email);
        const response = await axios.post(`${BASE_URL}/api/myorder`, { email });
        console.log('API response:', response.data);
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]);

  const toggleProductList = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // Collapse if already expanded
    } else {
      setExpandedOrderId(orderId); // Expand clicked order
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-orders">
      <DIrection title={'myorders'}></DIrection>
      <div className='site'>
        <div className='site-section'>
          <div className='container'>
            <div className='row mb-5'>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Order Id</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Amount</th>
                    <th className="product-quantity">Payment Status</th>
                    <th className="product-quantity">Payment Id</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <React.Fragment key={order.order_id}>
                        <tr onClick={() => toggleProductList(order.order_id)}>
                          <td className="product-thumbnail d-flex">
                            <h2 className='h5 text-black'>{order.order_id}</h2>
                          </td>
                          <td className="product-name">Productlist
                            {order.products.length > 0 && (
                              <ul style={{ display: expandedOrderId === order.order_id ? 'block' : 'none' }}>
                                {order.products.map((item, index) => (
                                  <li key={index}>{item.product_name}</li>
                                ))}
                              </ul>
                            )}
                          </td>
                          <td>
                            <h2 className="h5 text-black">{order.totalAmount}</h2>
                          </td>
                          <td><h5>{order.status}</h5></td>
                          <td>
                            <h2 className="h5 text-black">{order.rzp_order_id}</h2>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">Your orders list is empty</td>
                    </tr>
                  )}
                </tbody>
              </table></div></div></div>
      </div>
    </div>
  );
}

export default MyOrders;
