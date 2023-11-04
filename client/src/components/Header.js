import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from 'reactstrap';
import './header.css'

function BasicExample() {
  const navigate = useNavigate();
  const location = useLocation();


  function removeLastPathSegment(url) {
    const segments = url.split("/");
    segments.pop();
    const modifiedUrl = segments.join("/");
    if (!modifiedUrl) return "/";
    return modifiedUrl;
  }

  return (
    <Navbar expand="lg" className="bg-dark navbar-brand">
      <Container className='text-white'>
        <Navbar.Brand href="#home"> <span className='text-white'> Math Learning </span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"> <span className='text-white'> Home </span></Nav.Link>
            <Nav.Link href="#link">  <span className='text-white'>Link</span></Nav.Link>
            <NavDropdown title={<span className='text-white'> Dropdown </span>} id="nav-dropdown" className='text-white'>
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <span className='text-white'>
                  Another action
                </span>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <span className='text-white'>
                  Separated link
                </span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <div style={{ right: 0 }}>
          <Button onClick={() => navigate(removeLastPathSegment(location.pathname))} color="secondary" className="my-2">
            Voltar
          </Button>
        </div>
      </Container>
    </Navbar >
  );
}

export default BasicExample;
