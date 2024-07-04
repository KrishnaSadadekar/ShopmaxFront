import { useState, useEffect } from "react";

function OrderDetails({ cart }) {
    const [openSection, setOpenSection] = useState(null);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        setTotal(newTotal);
        console.log(total);
    }, [cart]);


    const toggleCollapse = (section) => {
        setOpenSection((prevSection) => (prevSection === section ? null : section));
    };

    return (
        <div className="row mb-5">
            <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Your Order</h2>
                <div className="p-3 p-lg-5 border">
                    <table className="table site-block-order-table mb-5">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        {
                            cart.length > 0 ? (
                                cart.map((item) =>
                                    <tbody>

                                        <tr>
                                            <td>{item.product_name} <strong className="mx-2">x</strong> {item.qty}</td>
                                            <td>${item.qty*item.price}</td>
                                        </tr>



                                    </tbody>
                                )) : (<div>
                                    <h4>No products!</h4>
                                </div>)

                        }
                        <tr>
                            <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                            <td className="text-black font-weight-bold"><strong>${total}</strong></td>
                        </tr>
                    </table>

                    <div className="border p-3 mb-3">
                        <h3 className="h6 mb-0">
                            <a
                                className="d-block"
                                onClick={() => toggleCollapse('online')}
                                href="#!"
                                aria-expanded={openSection === 'online'}
                                aria-controls="collapseOnline"
                                style={{ cursor: 'pointer' }}
                            >
                                Online Payment
                            </a>
                        </h3>
                        <div className={`collapse ${openSection === 'online' ? 'show' : ''}`} id="collapseOnline">
                            <div className="py-2">
                                <p className="mb-0">
                                    Pay online using your credit card or digital wallet. Please ensure your payment details are correct.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border p-3 mb-3">
                        <h3 className="h6 mb-0">
                            <a
                                className="d-block"
                                onClick={() => toggleCollapse('cash')}
                                href="#!"
                                aria-expanded={openSection === 'cash'}
                                aria-controls="collapseCash"
                                style={{ cursor: 'pointer' }}
                            >
                                Cash On Delivery
                            </a>
                        </h3>
                        <div className={`collapse ${openSection === 'cash' ? 'show' : ''}`} id="collapseCash">
                            <div className="py-2">
                                <p className="mb-0">
                                    Pay with cash upon delivery. Ensure you have the exact amount as change might not be available.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
