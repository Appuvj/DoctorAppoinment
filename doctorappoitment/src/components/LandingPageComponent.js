import React, { useEffect } from 'react'
import { Navbar, Nav, NavDropdown, Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Slider from 'react-slick'; // Make sure to import Slider
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./landingpage.css"
import { useNavigate } from 'react-router-dom';


const doctorData = [
    {
      imgSrc: '/images/Vijay.JPEG',
      name: 'Dr. Vijay',
      property: '{Founder}',
      achievement: 'Cardiologist',

      note: " Expert in heart surgeries with a focus on complex cases Over 20 years of experience in cardiology.Passionate about patient care and outcomes.Known for pioneering cardiac procedures.", },
    {
      imgSrc: '/images/Karupu.jpg',
      name: 'Dr. Karuppu',
      property: '{Founder}',
      achievement: 'Pediatric Care',
      note: 'Specializes in pediatric care with a gentle approach.15 years of dedicated service to child healthcare.Expert in treating common and rare childhood diseases.Renowned for his compassionate care and expertise.',
    },
    {
      imgSrc: '/images/Sanjai.jpg',
      name: 'Dr. Sanjai',
      property: '{Founder}',
      achievement: 'Top Surgeon',
      note: 'Top surgeon with over 500 successful surgeries.Renowned for precision and excellence in the operating room.Over 15 years of experience in complex surgical procedures.Committed to patient safety and surgical innovation.',
    },
    {
      imgSrc: '/images/Ikfan.jpg',
      name: 'Dr. Ikfan',
      achievement: 'Neurologist',
      note: 'Leading neurologist with a focus on neurological disorders.Over 10 years of research and clinical practice in neurology.Passionate about advancing treatment methods.Known for his groundbreaking work in neuro-rehabilitation.',
    },
    {
      imgSrc: '/images/Nirmal.jpg',
      name: 'Dr. Nirmal',
      achievement: 'ENT Specialist',
      note: 'ENT specialist with extensive experience in ear, nose, and throat care.Trusted by patients for his accurate diagnoses and treatments.Over 12 years in the field, treating a wide range of ENT issues.Renowned for his patient-centric approach and skillful care.',
    },
    {
      imgSrc: '/images/Kamalesh.jpg',
      name: 'Dr. Kamalesh',
      achievement: 'Pulmonologist',
      note: 'Pulmonologist with expertise in treating lung diseases.Over 10 years of experience in respiratory medicine.Specializes in managing chronic respiratory conditions.Known for his dedication to improving patient quality of life.',
    },
    {
      imgSrc: '/images/Hamsa.jpg',
      name: 'Dr. Hamsa',
      achievement: 'Veterinarian',
      note: 'Compassionate veterinarian skilled in animal surgery.Over 8 years of experience in veterinary care.Passionate about animal welfare and healthcare.Known for her gentle approach and surgical precision.',
    },
    {
      imgSrc: '/images/Dinesh.jpg',
      name: 'Dr. Dinesh',
      achievement: 'Urologist',
      note: 'Urologist with a focus on urinary tract health.Over 10 years of experience in urology.Expert in both surgical and non-surgical treatments.Dedicated to patient education and preventive care.',
    },
    {
      imgSrc: '/images/Dharanesh.jpg',
      name: 'Dr. Dhanesh',
      achievement: 'Plastic Surgeon',
      note: 'Renowned plastic surgeon with a focus on cosmetic enhancements.Over 12 years of experience in aesthetic and reconstructive surgeries.Known for his attention to detail and artistic approach.Committed to achieving natural-looking results for patients.',
    },
    {
      imgSrc: '/images/Eswaran.webp',
      name: 'Dr. Eswaran',
      achievement: 'Radiologist',
      note: 'Expert radiologist with advanced imaging and diagnostic skills.Over 15 years of experience in radiology.Leader in adopting new radiology techniques.Dedicated to accurate and timely diagnoses for better patient outcomes.',
    },
  ];
  
  // Add more doctor data as needed


// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};
const LandingPageComponent = () => {

    const navigate = useNavigate()
    useEffect(()=>{
      sessionStorage.clear()
        },[])
    return (
        <>
       

                {/* Hero Section */}
      <div className="landing-page background-image">
        <Container className="text-center hero-text" fluid>
          <Row className="h-100 justify-content-center align-items-center">
            <Col md={8}>
              <h1 className="display-3">Welcome to VK Hospital</h1>
              <p className="lead">Providing quality healthcare services for your family.</p>
              <Button variant="primary" size="lg" onClick={()=>navigate("/login")}>Make an Appointment</Button>
            </Col>
          </Row>
        </Container>
      </div>
  {/* Carousel */}
  <Container className="my-5">
        <Slider {...settings}>
          {doctorData.map((doctor, index) => (
            <div key={index}>
              <Card className="doctor-card">
                <Card.Img
                  variant="top"
                  src={doctor.imgSrc}
                  alt={`Doctor ${index + 1}`}
                />
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Text>
                    <strong>{doctor.achievement}</strong><br />
                    <strong>{doctor.property}</strong><br />
                    <div className="star-rating">
                    {'★'.repeat(5).split('').map((star, i) => (
                      <span key={i} className="star">{star}</span>
                    ))}
                  </div>
                    <span className="note"> {doctor.note}</span>
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </Container>

      <Container>
      <div className="heading">
      <h2
        className="fs--44 font--family font--bold color--grey-dark mb--15"
        style={{ lineHeight: '1.2' }}
      >
        Expert Care Nationwide
      </h2>
      <p className="fs--18 font--family font--medium color--grey">
        Our expert doctors provide specialized care across 21 hospitals nationwide, covering 110+ specialties such as cardiac sciences, cancer care, orthopaedics, neurology, gastroenterology, liver and kidney transplants etc.
      </p>
    </div>
      </Container>
       {/* Features Section */}
       <Container className="my-5">
        <Row className="text-center">
          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card-icon">
                  <img 
                    src="https://th.bing.com/th?id=OIP.qs9g-wXXXkf4FW9Lstc9OwHaH1&w=243&h=257&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                    alt="Why Choose Us"
                    className="icon"
                  />
                </div>
                <Card.Title>Why Choose Us?</Card.Title>
                <Card.Text>
                  Learn more about the reasons to choose our hospital for your healthcare needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card-icon">
                  <img 
                    src="https://img.icons8.com/ios/50/000000/appointment-reminders.png"
                    alt="Appointment"
                    className="icon"
                  />
                </div>
                <Card.Title>Appointment</Card.Title>
                <Card.Text>
                  Schedule your appointments easily and conveniently with our online system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card-icon">
                  <img 
                    src="https://th.bing.com/th/id/OIP.TU4vmwJxrqfvOF3yJjIHsgAAAA?w=162&h=180&c=7&r=0&o=5&pid=1.7"
                    alt="Emergency Cases"
                    className="icon"
                  />
                </div>
                <Card.Title>Emergency Cases</Card.Title>
                <Card.Text>
                  Immediate assistance for emergency situations, 24/7.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <div className="card-icon">
                  <img 
                    src="https://img.icons8.com/ios/50/000000/clock.png"
                    alt="Working Hours"
                    className="icon"
                  />
                </div>
                <Card.Title>Working Hours</Card.Title>
                <Card.Text>
                  Find out our working hours and plan your visit accordingly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
      <div className="heading">
  <h2 className="fs--44 font--family font--bold color--grey-dark mb--15" style={{ lineHeight: '1.2' }}>
    VK's Healthcare Insights
  </h2>
  <p className="fs--18 font--family font--medium white--space-preline color--grey">
    Read about VK Hospital Health's success stories, stay informed with the latest news and media updates, and explore informative blogs from our experts.
  </p>
</div>
      </Container>
      <Container>
      <Row>
        {[
          {
            imgSrc: 'https://th.bing.com/th/id/OIP.nUff0gyd3rIJr8WH3e8m9wHaE-?w=247&h=180&c=7&r=0&o=5&pid=1.7',
            title: 'Successful Treatment of Rectal Cancer | Patient Success Story',
            description: 'Navigating through the complexities of cancer diagnosis and treatment can be an overwhelming experience, impacting both physical and mental health.'
          },
          {
            imgSrc: 'https://th.bing.com/th/id/OIP.LY8P-4EYD2kUiK4B5isxrQHaE8?w=268&h=180&c=7&r=0&o=5&pid=1.7',
            title: 'Osteosarcoma: Overcoming Bone Cancer with Expertise | Patient Testimonial',
            description: 'Battling a severe health condition like osteosarcoma, a type of bone cancer, is a challenging journey, both physically and emotionally.'
          },
          {
            imgSrc: 'https://th.bing.com/th/id/OIP._Vw99P5HuyWZSZh6d9ESewHaDh?w=288&h=166&c=7&r=0&o=5&pid=1.7',
            title: 'Successful Treatment of Bone Cancer | Patient Success Story',
            description: 'Bone cancer is a serious disease, and dealing with it can be a very challenging task.'
          },
          {
            imgSrc: 'https://th.bing.com/th/id/OIP.iwOeQQKOlJ-P30uuHSP4NQHaE8?w=231&h=180&c=7&r=0&o=5&pid=1.7',
            title: 'Beating Rectal Cancer with Care at Narayana Hospital | A Patient\'s Story',
            description: 'Facing rectal cancer is a daunting journey, filled with uncertainties and challenges.'
          }
        ].map((story, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <div className="card">
              <div className="card-image">
                <img src={story.imgSrc} alt={story.title} />
              </div>
              <h2 className="card-title">{story.title}</h2>
              <p className="card-description">{story.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>

    <Container>
      <div className="footer-container">
        <div className="footer-logo">
        <div className="header">
  <a href="/" className="logo-container">
    <img
      alt="VK Hospital logo"
      fetchPriority="high"
      width="185"
      height="90"
      decoding="async"
      src="https://th.bing.com/th/id/OIP.9BmHHAAqK4X0PEZJE3QPkwAAAA?rs=1&pid=ImgDetMain"
      className="logo"
    />
    <span className="hospital-name">VK Hospital</span>
  </a>
</div>

<div className="social-media">
  <h2>Connect With Us</h2>
  <ul className="social-icons">
    <li>
      <a href="https://www.facebook.com">
        <img src="http://ts4.mm.bing.net/th?id=OIP.RL4czXDzNVgIjHV1bDMd0wHaHa&pid=15.1" alt="Facebook" />
        <i className="fab fa-facebook-f"></i>
      </a>
    </li>
    <li>
      <a href="https://twitter.com">
        <img src="http://ts4.mm.bing.net/th?id=OIP.T9W8FR0DLy4WuS8DKub7AgHaFj&pid=15.1" alt="Twitter" />
        <i className="fab fa-twitter"></i>
      </a>
    </li>
    <li>
      <a href="https://in.linkedin.com">
        <img src="https://th.bing.com/th/id/OIP.waOtRAV99hCXTCS_RvbK6QHaGp?w=217&h=195&c=7&r=0&o=5&pid=1.7" alt="LinkedIn" />
        <i className="fab fa-linkedin-in"></i>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com">
        <img src="https://th.bing.com/th/id/OIP.72S49bENY6EMqQr0n7eg_AAAAA?w=164&h=180&c=7&r=0&o=5&pid=1.7" alt="Instagram" />
        <i className="fab fa-instagram"></i>
      </a>
    </li>
    <li>
      <a href="https://www.youtube.com">
        <img src="https://th.bing.com/th/id/OIP.hR6TQma4SWfP-yfQmT5oqgHaHa?w=203&h=203&c=7&r=0&o=5&pid=1.7" alt="YouTube" />
        <i className="fab fa-youtube"></i>
      </a>
    </li>
  </ul>
</div>

        </div>
        <div className="footer-links">
          <div className='guide'>
            <h2>Patient Guide</h2>
            <ul>
              <li><a href="/find-a-doctor">Find a Doctor</a></li>
              <li><a href="/hospitals">Our Network</a></li>
              <li><a href="https://narayana.health/ocaapp/video-consult?utm_source=corp_webisite">Video Consultation</a></li>
              <li><a href="/appointment">Book an Appointment</a></li>
              <li><a href="/enquiry-form">Make an Enquiry</a></li>
              <li><a href="/feedback-form">Feedback</a></li>
              <li><a href="/health-check-package">Health Check Package</a></li>
            </ul>
          </div>
          <div className='treat'>
            <h2>What We Treat</h2>
            <ul>
              <li><a href="/diseases/chest-pain">Chest Pain</a></li>
              <li><a href="/diseases/heart-attacks">Heart Attack</a></li>
              <li><a href="/diseases/varicose-veins">Varicose Veins</a></li>
              <li><a href="/diseases/thyroid-problems">Thyroid Problems</a></li>
              <li><a href="/diseases">View All</a></li>
            </ul>
          </div>
          <div className='professionals'>
            <h2>For Medical Professionals</h2>
            <ul>
              <li><a href="/academics">Academics</a></li>
              <li><a href="/clinical-research">Clinical Research</a></li>
            </ul>
          </div>
          <div className='company'>
            <h2>Company</h2>
            <ul>
              <li><a href="/about-us">About Us</a></li>
              <li><a href="/leadership">Leadership</a></li>
              <li><a href="/investor-relations">Stakeholder Relations</a></li>
              <li><a href="/news-media">News &amp; Media Relations</a></li>
              <li><a href="https://jobs.narayanahealth.org/NH-India/">Careers</a></li>
              <li><a href="/csr-overview">CSR</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </div>
          
        </div>
      </div>
    </Container>
    <footer>

<div className="flex container--fluid flex--justify-content-between pt--20 pb--30">
<ul className="flex">
<li className="pd--5">
  <a
    className="mr--35 color--grey fs--14 font--family font--medium"
    target="_blank"
    id="56"
    href="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/sharing-medias/February2024/3J4BiVJ1QWMsp6nSt6yG.pdf"
    rel="noreferrer"
  >
    NPPA Implant Pricing
  </a>
</li>
<li className="pd--5">
  <a
    className="mr--35 color--grey fs--14 font--family font--medium"
    target="_self"
    id="57"
    href="/terms-of-use"
  >
    Terms &amp; Conditions
  </a>
</li>
<li className="pd--5">
  <a
    className="mr--35 color--grey fs--14 font--family font--medium"
    target="_self"
    id="58"
    href="/privacy-policy"
  >
    Privacy Policy
  </a>
</li>
<li className="pd--5">
  <a
    className="mr--35 color--grey fs--14 font--family font--medium"
    target="_self"
    id="59"
    href="/disclaimer"
  >
    Disclaimer
  </a>
</li>
</ul>
<span className="pd--5 color--grey font--family font--medium fs--14" id="222">
© VK Indutries Pvt Ltd | All Rights Reserved
</span>
</div>


</footer>
        </>
      );
}

export default LandingPageComponent
