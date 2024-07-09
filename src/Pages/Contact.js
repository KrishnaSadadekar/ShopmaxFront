import React, { useState } from "react";
import DIrection from "../Components/DIrection";

function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields (example)
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            // Example: Send formData to backend API
          console.log('Data: ',formData)
          alert('Thank you for your Feedback! we Will contact sooon')

        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting the form. Please try again later.");
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <DIrection title={"Contact"} />

            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="h3 mb-3 text-black">Get In Touch</h2>
                        </div>
                        <div className="col-md-7">
                            <form onSubmit={handleSubmit}>
                                <div className="p-3 p-lg-5 border">
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="c_fname" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" id="c_lname" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_email" className="text-black">Email <span className="text-danger">*</span></label>
                                            <input type="email" className="form-control" id="c_email" name="email" value={formData.email} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_subject" className="text-black">Subject </label>
                                            <input type="text" className="form-control" id="c_subject" name="subject" value={formData.subject} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_message" className="text-black">Message </label>
                                            <textarea name="message" id="c_message" cols="30" rows="7" className="form-control" value={formData.message} onChange={handleInputChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-lg-12">
                                            <button type="submit" className="btn btn-primary btn-lg btn-block">Send Message</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 ml-auto">
                            <div className="p-4 border mb-3">
                                <span className="d-block text-primary h6 text-uppercase">New York</span>
                                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
                            <div className="p-4 border mb-3">
                                <span className="d-block text-primary h6 text-uppercase">London</span>
                                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
                            <div className="p-4 border mb-3">
                                <span className="d-block text-primary h6 text-uppercase">Canada</span>
                                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
