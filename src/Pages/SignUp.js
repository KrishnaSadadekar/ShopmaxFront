import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Service/helper";
function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const navigate=useNavigate();
    const [message, setMessage] = useState({ content: '', type: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/createuser`, formData);

            if (response.data && response.data.success) {
                // localStorage.setItem("authToken", response.data.authToken);
                setMessage({ content: 'User created successfully!', type: 'success' });
                navigate("/");
                
            } else {
                alert('0---')
                setMessage({ content: response.data.message || response.data.error || 'Failed to create user.', type: 'error' });
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'An error occurred. Please try again.';
            setMessage({ content: errorMessage, type: 'error' });
        }
    };

    return (
        <section className="form-07">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="_form_07_main">
                            <div className="row">
                                <div className="_form_07_main_sub_01 col-sm-6 cv-kl-bn">
                                    <div>
                                        <div className="form-07-head">
                                            <h2>Shopmax!</h2>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                        <div className="form-7-social-media">
                                            <ol>
                                                <li><i className="fa fa-facebook"></i></li>
                                                <li><i className="fa fa-twitter"></i></li>
                                                <li><i className="fa fa-youtube"></i></li>
                                                <li><i className="fa fa-linkedin"></i></li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 cv-kl-bn">
                                    <div className="_bg_cs">
                                        <h2>Sign Up!</h2>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="row d-flex">
                                            <div className="form-group col-md-6">
                                                <label>Enter Your First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control"
                                                    placeholder="Enter First Name"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Enter Your Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control"
                                                    placeholder="Enter Last Name"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Enter Your Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Enter Your Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter Password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block btn_04">Sign Up!</button>
                                        </div>

                                        {
                                            message.content && (
                                                <p className={`message ${message.type}`}>
                                                    {message.content}
                                                </p>
                                            )
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
