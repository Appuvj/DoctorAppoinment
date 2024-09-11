import React, { useState } from 'react';
import './EmergencyComp.css'; // Import your custom CSS file
import { Container } from 'react-bootstrap';

const EmergencyComp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',  // Added phone field here
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {  // Simple phone number validation
            newErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.message) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmitted(true);
            alert('Thank you for contacting us!');
            setFormData({
                name: '',
                email: '',
                phone: '',  // Reset phone field as well
                message: ''
            });
        }
    };

    return (
        <div>
            {/* Breadcrumb, Service Section, Map, and other content remain the same */}

            <Container>
                <h2 className="headTitle">
                    <strong>Message Us </strong>
                    <span>Please fill out our form, and we will get in touch shortly</span>
                </h2>
            </Container>

            <section className="contact-us-section">
                <div className="contact-us-container">
                    <div className="contact-form-wrapper">
                        <h2 className="contact-us-heading">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="contact-us-form">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`form-input ${errors.name ? 'input-error' : ''}`}
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                                />
                                {errors.phone && <span className="error-text">{errors.phone}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`form-input ${errors.message ? 'input-error' : ''}`}
                                ></textarea>
                                {errors.message && <span className="error-text">{errors.message}</span>}
                            </div>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                    <div className="contact-image-wrapper">
                        <img
                            src="https://www.srmhospital.co.in/wp-content/themes/eightmedi-lite/images/srm/contactus/04_message.jpg"
                            alt="Contact Us"
                            className="contact-us-image"
                        />
                    </div>
                </div>
            </section>

            <br />
        </div>
    );
}

export default EmergencyComp;
