import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import "./header.css";

function Header() {
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
    <Navbar className="bg-dark navbar-brand" style={{ margin: 0 }}>
      <Container>
        <Navbar.Brand href="/">
          <span className="text-white">Math Learning</span>
        </Navbar.Brand>

        <div style={{ right: 0 }}>
          <Button
            onClick={() => navigate(removeLastPathSegment(location.pathname))}
            color="secondary"
          >
            Voltar
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
