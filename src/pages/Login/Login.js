import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Container fluid className="login-container mt-5">
      <Row className="justify-content-center align-items-center full-height">
        <Col md={4}>
          <div className="login-form">
            <h2 className="mb-4">Login</h2>
            <Form>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Seu e-mail" />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Senha" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mb-2 mt-2"
                onClick={() => handleLogin("email")}
              >
                Entrar
              </Button>
            </Form>
            <div className="text-center" style={{ padding: 24 }}>
              <p>Ou entre com</p>
              <Button variant="light" onClick={() => handleLogin("google")}>
                <i className="fab fa-google"></i> Google
              </Button>
              <Button variant="light" onClick={() => handleLogin("github")}>
                <i className="fab fa-github"></i> GitHub
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
