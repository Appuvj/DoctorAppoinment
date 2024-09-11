import React from 'react'
import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './aboutus.css'
const AboutUsComponent = () => {
    return (
        <>
      
      <section className="clinical--research-banner banner flex position--relative banner--main-gradient flex--justify-content-between flex--align-items-center">
      <div className="banner--main-content-info">
        <h1 className="font--bold font--family color--grey-dark fs--40 mb--15" style={{ lineHeight: 1.2 }}>
          Our Mission
        </h1>
        <div className="font--medium fs--16 color--grey-dark font--family mb--15">
          <p>To make healthcare accessible to all.</p>
        </div>
      </div>

      <span className="banner-img-container">
        <img
          id="image-banner"
          className="banner-image"
          src="/images/landingpic2.jpg"
          alt="Banner"
        />
      </span>

      <div className="container--fluid stakeholder--banner-breadcrumbs flex flex--align-items-center pt--20 pb--20 bread--crumbs">
        <div className="bread--crumbs-item mr--5 flex flex--align-items-center">
          <a className="fs--16 font--normal font--family color--primary-blue cursor--pointer" href="/">Home&nbsp;&gt;</a>
        </div>
        <span className="fs--16 font--normal font--family color--grey-dark">About Us</span>
      </div>
    </section>

      <h2 className="fs--44 font--family font--bold color--grey-dark mb--15 about--story-heading position--relative width--column-two-0" style={{ lineHeight: '1.2' }}>
        Our Story Grew From Seeds of Compassion
      </h2>

      <Container>
        <div className="swiper-container mt--60 mb--30">
          <div className="swiper-wrapper">
            {[
              { year: 2024, title: "Guinness World Record", description: "Sets a Guinness World Record for conducting highest number of ECGs in a single day at a single venue" },
              { year: 2024, title: "CAP accreditation", description: "SVK's Health – Laboratory services gets prestigious CAP accreditation becoming first hospital in South India and fourth in India." },
              { year: 2023, title: "JCI Enterprise Accreditation", description: "SVK's Health gets International JCI Enterprise Accreditation becoming first hospital group in the country " },
              { year: 2022, title: "Acquired Sparsha Hospital", description: "Acquired Sparsha Hospital, Bommasandra and launched world class orthopaedic centre in SVK's Health City, Bengaluru" },
              
            ].map((item, index) => (
              <div className="swiper-slide" key={index}>
                <div className="about--story-slider flex pt--20">
                  <h3 className="about--story-slider-time fs--50 font--bold color--grey-dark ml--30 mr--30 pt--10">{item.year}</h3>
                  <div className="about--story-slider-image">
                    <div className="description bg--white bg--radius-5 pd--20">
                      <h3 className="fs--24 color--grey-dark font--bold mb--20">{item.title}</h3>
                      <p className="fs--20 color--grey-one font--medium">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <h2 className="centered-heading">
  Overview
</h2>


<Container>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}  // Loop the slides continuously
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide-content">
          <div className="about--pioneers-card">
            <div className="about--pioneers-card-text">
              <h4 className="title">Our Purpose: Keeping People Healthy</h4>
              <p className="description">
                Beyond treating you with care when you're sick, our goal is to ensure your long-term well-being. We prioritize your overall health – considering your body, emotions, and mind.
              </p>
            </div>
            <div className="about--pioneers-card-image">
              <img
                alt="Our Purpose: Keeping People Healthy"
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/pioneers-of-complex-surgeries/January2024/icmEQAMeb8rUVdF4xTFX.webp?w=828&q=75"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-content">
          <div className="about--pioneers-card">
            <div className="about--pioneers-card-text">
              <h4 className="title">Our Strengths: Technology, Brand, People, Discipline, Compassion</h4>
              <p className="description">
                Our success comes from using advanced technology, continuing to be a trusted brand with skilled and caring people; following discipline, and staying kind to everyone.
              </p>
            </div>
            <div className="about--pioneers-card-image">
              <img
                alt="Our Strengths: Technology, Brand, People, Discipline, Compassion"
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/pioneers-of-complex-surgeries/January2024/VnJ9Ju935GWNsvmWvI5j.webp?w=828&q=75"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-content">
          <div className="about--pioneers-card">
            <div className="about--pioneers-card-text">
              <h4 className="title">Asia's First Heart Hospital with an Artificial Heart Implant</h4>
              <p className="description">
                We've made history as Asia's first heart hospital to implant an artificial heart successfully. This achievement showcases our commitment to the latest medical solutions, taking cardiac care to new heights.
              </p>
            </div>
            <div className="about--pioneers-card-image">
              <img
                alt="Asia's First Heart Hospital with an Artificial Heart Implant"
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/pioneers-of-complex-surgeries/January2024/5elGED84dQUD2ErW8J2z.webp?w=828&q=75"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-content">
          <div className="about--pioneers-card">
            <div className="about--pioneers-card-text">
              <h4 className="title">Healthier People, Happier Planet: Our Sustainable Vision</h4>
              <p className="description">
                As we care about your health and the environment, we're taking steps to be eco-friendly and create a happy and healthy world for everyone.
              </p>
            </div>
            <div className="about--pioneers-card-image">
              <img
                alt="Healthier People, Happier Planet: Our Sustainable Vision"
                src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/pioneers-of-complex-surgeries/January2024/2RoEFpZfEEQJjMYPT5Rd.webp?w=828&q=75"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </Container>


    <Container>

    <div className="heading">
      <h2 className="fs--44 font--family font--bold color--grey-dark mb--0" style={{ lineHeight: 1.2 }}>
        Honours and Recognition
      </h2>
      <p className="fs--18 font--family font--medium color--black white--space-preline">
        SVK's Health's Accolades and Accreditations
      </p>
    </div>

    </Container>


    <div className="card-container">
  <div className="about-card">
    <div className="card-image">
      <img
        alt="Winning the Way Forward"
        src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/about-us-honours-and-recognitions/January2024/YXyyawJ2JAYLrZChH1tY.webp?w=128&q=75"
      />
    </div>
    <div className="card-content">
      <span className="card-title">Winning the Way Forward</span>
    </div>
  </div>
  <div className="about-card">
    <div className="card-image">
      <img
        alt="Winning the Way Forward"
        src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/about-us-honours-and-recognitions/January2024/ePtypp6vF4ztk4L7pkgf.webp?w=128&q=75"
      />
    </div>
    <div className="card-content">
      <span className="card-title">Gold Standard in Health Care</span>
    </div>
  </div>
  <div className="about-card">
    <div className="card-image">
      <img
        alt="Winning the Way Forward"
        src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/about-us-honours-and-recognitions/January2024/m0q4vAhTYKOXWL8FZEWC.webp?w=128&q=75"
      />
    </div>
    <div className="card-content">
      <span className="card-title"> Guinness World Record</span>
    </div>
  </div>
  <div className="about-card">
    <div className="card-image">
      <img
        alt="Winning the Way Forward"
        src="https://th.bing.com/th/id/OIP.Gte4AHpS_AcLZyrzgyfFFgHaKw?rs=1&pid=ImgDetMain"
      />
    </div>
    <div className="card-content">
      <span className="card-title">Excellence in Patient Safety 2023</span>
    </div>
  </div>
  <div className="about-card">
    <div className="card-image">
      <img
        alt="Winning the Way Forward"
        src="https://th.bing.com/th/id/OIP.dnxszKxjhiwq79jkfXlpLAHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"
      />
    </div>
    <div className="card-content">
      <span className="card-title"> Special Contribution to Assam & North East 2023</span>
    </div>
  </div>

  
</div>




    </>
    )
}

export default AboutUsComponent
