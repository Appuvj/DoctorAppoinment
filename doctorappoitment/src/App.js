

import { Navbar, Nav, NavDropdown, Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  return (
    <>
    <Navbar expand="lg" className="custom-navbar">
  <Container fluid>
    <Navbar.Brand href="#">
      <img
        src="https://th.bing.com/th/id/OIP.9BmHHAAqK4X0PEZJE3QPkwAAAA?rs=1&pid=ImgDetMain"
        alt="SVk Hospital Logo"
        className="logo"
      />
      <span className="hospital-title">SVk Hospital</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto my-2 my-lg-0">
        <Nav.Link onClick={()=>navigate("")}>Home</Nav.Link>
        <Nav.Link onClick={()=>navigate("about-us")}>About Us</Nav.Link>
        <Nav.Link onClick={()=>navigate("services")}>Our Services</Nav.Link>
        <Nav.Link onClick={()=>navigate("emergency")}>Emergency</Nav.Link>
        
      </Nav>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Outlet/>

<Container>
      <div className="footer-container">
        <div className="footer-logo">
        <div className="header">
  <a href="/" className="logo-container">
    <img
      alt="SVK Hospital logo"
      fetchPriority="high"
      width="185"
      height="90"
      decoding="async"
      src="https://th.bing.com/th/id/OIP.9BmHHAAqK4X0PEZJE3QPkwAAAA?rs=1&pid=ImgDetMain"
      className="logo"
    />
    <span className="hospital-name">SVK Hospital</span>
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
© SVK Indutries Pvt Ltd | All Rights Reserved
</span>
</div>


</footer>
</>
  );
}

export default App;
