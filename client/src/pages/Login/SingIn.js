import React, { useState, useContext } from "react";
import { Container } from "reactstrap";
import { Button, Form, Spinner } from "react-bootstrap";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { Context } from "../../utils/Context";
import { useNavigate } from "react-router-dom";
import Crud from "../../utils/Crud";
const provider = new GoogleAuthProvider();

const SingIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const { state, setState } = useContext(Context);
    const navigate = useNavigate();

    function register(event, email, password) {
        event.preventDefault();

        if (password != password2) {
            return setState({ ...state, alert: { show: true, message: "As senhas não são idênticas" } })
        }

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
                    const errorMessage = error.code == "auth/email-already-in-use" ? "Email já utilizado" : error.message;
                    setState({ ...state, alert: { show: true, message: errorMessage } })

                })
                .finally(() => setLoading(false));
        } else {
            setState({ ...state, alert: { show: true, message: "Sem senha ou email" } })
        }
    }

    function googleRegister(event) {
        event.preventDefault();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user

                return Crud.criarUsuario(state.db, user.uid).then((ret) => {
                    setState((prev) => ({ ...prev, user: user, navBarShow: true}));
                    navigate("/home");
                }).catch(err => {
                    setState((prev) => ({ ...prev, user: user, navBarShow: true}));
                    console.log('err', err)
                })
            }).catch((error) => {
                setState({ ...state, alert: { show: true, message: "Ocorreu um erro"}})
            });
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
                    <h2 className="jumbotron-heading mb-4">Cadastre-se</h2>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Novo E-mail</Form.Label>
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirme sua senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="senha"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </Form.Group>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: 'column',
                            gap: 15
                        }}
                    >
                        <Button
                            variant="primary"
                            onClick={(e) => register(e, email, password)}
                        >
                            Cadastrar
                        </Button>

                        <Button
                            variant="light"
                            onClick={(e) => googleRegister(e)}
                        >
                            <div style={{ display: 'flex' }}>  <img width="24" height="24" src="/img/g-icon.png" /> <span style={{ margin: 'auto' }}> Cadastrar pela Google </span></div>
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={(e) => navigate("/login")}
                        >
                            Voltar
                        </Button>
                    </div>
                </Form>
            )}
        </Container>
    );
};

export default SingIn;
