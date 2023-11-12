import React, { useState, useContext } from "react";
import { Container } from "reactstrap";
import { Button, Form } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Context } from "../../utils/Context";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, setState } = useContext(Context);
  const navigate = useNavigate();

  function login(event, email, password) {
    event.preventDefault();

    if (email && password) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          setState((prev) => ({ ...prev, user: user }));

          alert("Sucesso!");
          navigate("/home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`Erro (${errorCode}): ${errorMessage}`);
        });
    } else {
      alert("Sem senha ou email");
    }
  }

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "25vw",
          margin: "auto",
          padding: 18,
          boxShadow: "rgba(0, 0, 0, 0.34) 0px 4px 10px",
        }}
      >
        <h2 className="jumbotron-heading mb-4">Login</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={(e) => login(e, email, password)}>
          Entrar
        </Button>

        <Button variant="secondary">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default LogIn;
