import React, { useState, useContext } from "react";
import { Container } from "reactstrap";
import { Button, Form, Spinner } from "react-bootstrap";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Context } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import { Crud } from "../../utils/Crud";
import helper from "../../utils/helper";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, setState } = useContext(Context);
  const navigate = useNavigate();

  async function updateContext(uid) {
    const userDataRes = await Crud.listarUsuario(state.db, uid);
    const exerciseData = Object.values(
      state.exerciseData["elementary-physics"]
    );

    const exerciseDataWithProgress = exerciseData.map((d) => {
      const exerciseProgress = userDataRes.exercises[d.key];

      if (exerciseProgress) {
        d.completed = true;
      }

      return d;
    });
    let allExercises = state.exerciseData;

    const exerciseDataWithProgressObj = {};

    exerciseDataWithProgress.forEach((ex) => {
      exerciseDataWithProgressObj[ex.key] = ex;
    });

    allExercises["elementary-physics"] = exerciseDataWithProgressObj;

    setState({ ...state, exerciseData: allExercises });
  }

  function login(event) {
    event.preventDefault();

    if (email && password) {
      const auth = getAuth();
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          await updateContext(user.uid);
          setState((prev) => ({ ...prev, user: user, navBarShow: true }));
          navigate("/home");
        })
        .catch((error) => {
          setState({...state, alert: {show: true, message: "Usuário não encontrado"}})
        })
        .finally(() => setLoading(false));
    } else {
      setState({...state, alert: {show: true, message: "Sem senha ou email"}})
    }
  }

  function register(event, email, password) {
    event.preventDefault();

    if (email && password) {
      const auth = getAuth();
      setLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          return Crud.criarUsuario(state.db, user.uid).then(() => {
            setState((prev) => ({ ...prev, user: user }));
            navigate("/home");
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setState({...state, alert: {show: true, message: `Erro (${errorCode}): ${errorMessage}`}})
        })
        .finally(() => setLoading(false));
    } else {
      setState({...state, alert: {show: true, message: "Sem senha ou email"}})
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
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            padding: 18,
            boxShadow: "rgba(0, 0, 0, 0.34) 0px 4px 10px",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{
              height: 80,
              width: 80,
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "30vw",
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

          <div
            style={{
              display: "flex",
              flexDirection:'column',
              gap:15
            }}
          >
            <Button
              variant="primary"
              onClick={(e) => login(e)}
            >
              Entrar
            </Button>

            <Button
              variant="light"
              onClick={(e) => setState({...state, alert: {show: true, message: "Usuário não encontrado"}})}
            >
              <div style={{display:'flex'}}>  <img width="24" height="24" src="/img/g-icon.png"/> <span style={{margin:'auto'}}> Entrar pela Google </span></div>
            </Button>

            <span> Novo por aqui? <a style={{cursor:'pointer'}} onClick={()=> navigate('/sing-in')} class="link-opacity-100">Cadastre-se</a></span>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default LogIn;
