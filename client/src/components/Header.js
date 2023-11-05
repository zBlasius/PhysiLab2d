import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import "./header.css";

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
      <Container className="text-white">
        <Navbar.Brand href="/">
          <span className="text-white"> Math Learning </span>
        </Navbar.Brand>

        <div style={{ right: 0 }}>
          <Button
            onClick={() => navigate(removeLastPathSegment(location.pathname))}
            color="secondary"
            className="my-2"
          >
            Voltar
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
