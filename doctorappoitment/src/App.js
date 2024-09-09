

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
        alt="Vk Hospital Logo"
        className="logo"
      />
      <span className="hospital-title">Vk Hospital</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto my-2 my-lg-0">
        <Nav.Link onClick={()=>navigate("")}>Home</Nav.Link>
        <Nav.Link onClick={()=>navigate("about-us")}>About Us</Nav.Link>
        <NavDropdown title="Doctor Services" id="navbarScrollingDropdown">
          <NavDropdown.Item >Pediatrician</NavDropdown.Item>
          <NavDropdown.Item >Neurologist</NavDropdown.Item>
          <NavDropdown.Item >Surgeon</NavDropdown.Item>
          <NavDropdown.Item >ENT Specialist</NavDropdown.Item>
          <NavDropdown.Item >General Practitioner</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >Doctor Blogs</NavDropdown.Item>
        </NavDropdown>
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
</>
  );
}

export default App;
