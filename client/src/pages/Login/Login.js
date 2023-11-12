import React, { useState } from "react";
import { Container } from "reactstrap";
import { Button, Form } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login(email, password) {
    if (email && password) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("VAPO: ", );
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log("erro");
        });
    } else {
      // Sem email ou senha
      console.log("erroAAAAA");
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

        <Button variant="primary" onClick={() => login(email, password)}>
          Entrar
        </Button>

        <Button variant="secondary">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default LogIn;
