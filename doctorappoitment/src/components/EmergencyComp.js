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
            alert(`Hey ${submitted.name}, Thank you for contacting us!`);
            setFormData({
                name: '',
                email: '',
                phone: '',  
                message: ''
            });
        }
    };

    return (
        <div>
            {/* Breadcrumb, Service Section, Map, and other content remain the same */}
            <div className="container-fluid bg-grey-lighter">
                <div className="breadcrumb-container">
                    <a className="breadcrumb-link" href="/">Home&nbsp;&gt;</a>
                    <span className="breadcrumb-text">Emergency</span>
                </div>
            </div>
            <br />
            <section className="service-section">
                <div className="heading">
                    <h2 className="heading-text">Emergency Service</h2>
                </div>
                <div className="service-cards">
                    <div className="service-card">
                        <div className="service-icon-container">
                            <i className="nh-call service-icon"></i>
                            <a href="tel:+18003090309" className="service-link">180 0309 0309</a>
                        </div>
                        <h6 className="service-title">Free Ambulance</h6>
                        <p className="service-description">Acute emergencies and accidents</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon-container">
                            <i className="nh-envelope service-icon"></i>
                            <a href="mailto:info.dwd@vkhealth.org" classname="service-link">info.dwd@vkhealth.org</a>
                        </div>
                        <h6 className="service-title">Email Us</h6>
                        <p className="service-description">Acute emergencies and accidents</p>
                    </div>
                </div>
            </section>
            <br />

            <section className="container--fluid bg--white pb--50">
                <div className="accordion font--center pd--30"></div>
                <iframe
                    className="bg--radius-5 mt--20 width--column-one pd--30"
                    height="720"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5638004209!2d77.6948007!3d12.8068015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c33ea16001d%3A0x51693da9325cf807!2sMazumdar%20Shaw%20Medical%20Center!5e0!3m2!1sen!2sin!4v1692950326071!5m2!1sen!2sin"
                    title="Google Maps"
                ></iframe>
            </section>
            <br />
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
                                <input id="email"
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
