// components/CheckOut.js
import React, { useState } from "react";
import BillingDetails from "../Components/BillingDetails";
import OrderDetails from "../Components/OrderDetails";
import { useCart } from "../Context/CartContext";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const { state: { cart },clearCart } = useCart();
  const { email } = useAuth();
  const newTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [Razorpay] = useRazorpay();
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  console.log('Total: ', newTotal)
  const [billingDetails, setBillingDetails] = useState({
    cart: cart,
    email: email,
    country: 'Hindustand',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    stateCountry: '',
    postalZip: '',
    phone: '',
    total: newTotal
  });

  // Handle of Payment 
  const initPay = (data) => {
    console.log('In initPay:', data.order.id);
    const options = {
      key: data.rzp_key_id,
      amount: data.order.amount,
      currency: data.order.currency,
      name: 'shopmax',
      description: "Test",
      order_id: data.order.id,
      handler: async (response) => {
        try {
          console.log('Payment Response:', response);
          const verificationResponse = await axios.post('http://localhost:4000/api/verifypayment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          console.log('Verified payment data:', verificationResponse.data);
          clearCart();
          navigate('/thankyou');
        } catch (error) {
          console.error('Payment Verification Error:', error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Handle of Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Cart:', cart);
    console.log('Billing Details:', billingDetails);

    const response = await axios.post('http://localhost:4000/api/order', billingDetails);
    console.log(response.data);
    // setOrder(response.data.order);

    initPay(response.data);
    // Add further form submission logic here


  };

  return (
    <div>
      <div className="container">
        <div className="row mb-5">
          <h2 className="h3 mb-3 text-black">Checkout</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <BillingDetails billingDetails={billingDetails} setBillingDetails={setBillingDetails} />
            <div className="col-md-6">
              <OrderDetails cart={cart} />
            </div>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default CheckOut;
