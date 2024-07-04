import React from "react";

function BillingDetails({ billingDetails, setBillingDetails }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <div className="col-md-6 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">Billing Details</h2>
            <div className="p-3 p-lg-5 border">
                
                <div className="form-group row">
                    <div className="col-md-6">
                        <label htmlFor="firstName" className="text-black">
                            First Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={billingDetails.firstName || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="text-black">
                            Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={billingDetails.lastName || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-12">
                        <label htmlFor="address" className="text-black">
                            Address1 <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address1"
                            name="address1"
                            value={billingDetails.address1 || ''}
                            onChange={handleChange}
                            placeholder="Street address"
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-12">
                        <label htmlFor="address" className="text-black">
                            Address2 <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address2"
                            name="address2"
                            value={billingDetails.address2 || ''}
                            onChange={handleChange}
                            placeholder="Apartment, suite, unit etc. (optional)"
                            required
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <label htmlFor="stateCountry" className="text-black">
                            State / Country <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="stateCountry"
                            name="stateCountry"
                            value={billingDetails.stateCountry || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="postalZip" className="text-black">
                            Postal / Zip <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="postalZip"
                            name="postalZip"
                            value={billingDetails.postalZip || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group row mb-5">
                    
                    <div className="col-md-6">
                        <label htmlFor="phone" className="text-black">
                            Phone <span className="text-danger">*</span>
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={billingDetails.phone || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingDetails;
