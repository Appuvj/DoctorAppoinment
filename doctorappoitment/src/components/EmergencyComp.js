import React from 'react';
import './EmergencyComp.css'; // Import your custom CSS file

const EmergencyComp = () => {
    return (
        <div>
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
                            <a href="mailto:info.dwd@vkhealth.org" className="service-link">info.dwd@vkhealth.org</a>
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

            <div className="banner--main-content-info position--absolute">
                <h1 className="font--bold font--family color--grey-dark fs--40 mb--15" style={{ lineHeight: 1.2 }}>
                    Delivering Care Nationwide
                </h1>
                <div className="font--medium fs--16 color--grey-dark font--family mb--15">
                    <div>
                        Trusted by millions for over 23 years, our NABL &amp; JCI-accredited network comprises 21 hospitals and numerous clinics across India. With over 4K+ top doctors &amp; 110+ specialties, we strive to deliver healthcare excellence to each individual we serve.
                    </div>
                </div>
            </div>

            <img
                id="image-banner"
                fetchPriority="high"
                width="1920"
                height="500"
                decoding="async"
                data-nimg="1"
                className="banner-image banner--main-content-img undefined"
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/May2024/8qEsvW0op8bpACXdlXTV.webp?w=3840&q=100"
                style={{ color: 'transparent' }}
                alt="Delivering Care Nationwide"
                srcSet="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/May2024/8qEsvW0op8bpACXdlXTV.webp?w=1920&q=100 1x, https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/May2024/8qEsvW0op8bpACXdlXTV.webp?w=3840&q=100 2x"
            />
        </div>
    );
}

export default EmergencyComp;
