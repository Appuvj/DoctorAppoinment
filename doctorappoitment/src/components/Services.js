import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div>
  
      <div className="container-fluid bg-grey-lighter">
                <div className="breadcrumb-container">
                    <a className="breadcrumb-link" href="/">Home&nbsp;&gt;</a>
                    <span className="breadcrumb-text">Our Services</span>
                </div>
            </div>

      <section>

        <div className="booking-banner flex flex-align-items-center flex-justify-content-center flex-wrap reduce-mobile-img">
          <div className="booking-banner-content width-column-three-30">
            <h1 className="fs-40 font-bold font-family color-grey-dark mb-10">All-inclusive Care</h1>
            <p className="fs-18 font-medium font-family color-grey">
              We are committed to addressing all your healthcare needs, offering services ranging from hospitals
              and clinics to labs, pharmacies, and insurance. Our goal is to provide a comprehensive and
              personalised healthcare experience that best serves you.
            </p>
          </div>
          <img
            alt="Banner"
            className="booking-banner-image"
            src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/December2023/WpNzdpmdsyNYop1JsYiM.webp?w=1920&q=75"
            srcSet="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/December2023/WpNzdpmdsyNYop1JsYiM.webp?w=750&q=75 1x, https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/page-banner-details/December2023/WpNzdpmdsyNYop1JsYiM.webp?w=1920&q=75 2x"
            loading="lazy"
            width="650"
            height="650"
            decoding="async"
          />
        </div>
      </section>


      <div className="rowWrap">
            <div className="contactus_Shuttle_content">
            
                <div className="shuttle_text_block">
                    <h2 className="headTitle">Free Shuttle
                        <span>Free transport facility for patients.</span>
                    </h2>
                    <div className="Shuttle_content_text">
                        <ul>
                            <li>SVK Hospital provides free transport for patients pickup and drop.</li>
                            <li>Shuttle bus services available from <strong>6 am to 9 pm</strong> for patients pickup and drop from main road to the hospital.</li>
                            <li>Free bus service available to the remote villages from Monday to Saturday for the benefit of poor patients.</li>
                        </ul>
                    </div>
                </div>

         
                <div className="Shuttle_content_img">
                    <div className="img_row_1">
                        
                        <img src="https://th.bing.com/th/id/OIP.5r-a5vQTx8F6_J0kI6FAjAHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="Ambulance" />
                    </div>
                    
                </div>
            </div>
        </div>


    </div>
  );
};

export default Services;
