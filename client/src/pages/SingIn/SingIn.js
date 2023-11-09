import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
const firebaseConfig = {
  "type": "service_account",
  "project_id": "math-learning-5e0f0",
  "private_key_id": "a2e64940780781dbb8b9b60bf328bb5cd3a4a7d5",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDa1vD7JjIfgaIW\n1j8IhEf1GvCrMa9ZrWW9nqokVQuiFQRZNZqobN9NMvJjVl9E1oq0OZ+rp+VzR3IE\ne46ZLH7AyHA5hf+ENb8Bk4+CS5d1H0GuLqF32DqaS56+XCQZWQ2WT9b46Lh0VnX5\n3+3W+g3wGCR7LPYNSHE0W1Uma/GkohNkeGICd+tda1UujFkvFKsZ/rgxITkdpbao\nN+nlPUNX+XNIXefE5jEPqWW5otSLPLcVeLOgK76TsM/H4QT4L7ViS4kpwJfGz4q8\nCHwIzhsAYaR4v2oGHDVhBVdEfa4U1dEV8T16CW9QT8zQyKrM3qUndwHo1jDSphYI\ntHKa8N+xAgMBAAECggEAZkfYiKGRAq29esv22P2ufg3x1ymZKaJD74ylO+bt0Xre\nNe26U6bS9UtvA2O+kjdty481I+8MbEVDsnmnK8sikOr9nL0WsA3IsK1tgPngl5Kc\nyZKs0A0lUrEuSA1bp+c51PuK33oxn9o7OKbjDDuB4Sn/fvyEIbAujMh1M0h3P7jN\nOCW1dFARp6vS+tjKG4qZpBKBMmlwuU6+vsomfZCSfB1IHFgfx1ul8II8ajQ5yPtN\nkXWoH/VOANhh3V5fvjLcp34+L2fZeIiIWHjr3tdtJujvcMsWLv6FjTZLtLmZ2XXZ\nUhrAPxjBP/dGDph9a9U6HNY/21iwAPGDj5utSgOEMwKBgQD308heOVBtNVYyRtQ3\nIxg68Kc23n+RxSCYoHPyNrGZG/GgEP4pcBxdP0bX0Q204zHcHNKWMzoOYR9greh3\neZ+pEHdz9UpwFR2bUYqRIZs+qzISq6Efxy69p/etBTIifmvBAqmANWk14ObY/qc9\nXTtYBW6Jqc1LlQLuIWNGhT9CUwKBgQDiDnAXF4Hho+bc3tqLz37hD0+DUiqdNLHu\nRjTk6J5PgH6V+n+011k53TqxaIVPnpKJqU/LzJ6HlymBI7BbrYT6xzAZdB0Feo80\ntI9BxUsSq+3yPijxLFJaVdYf7n2OmIby4vFmytq7zPhIRamg2Y/aej/kXmeqG+wb\nGk862vhdawKBgDI24C9vT4OBPiDbxx4Q51Tx8/+jH5gKqCskv7mBKYULa27yYn1E\n8QpXyuPpwOw46J5f3K+AW7AUL8ZoFmU26InaA0oklluVe7U/1WLIu2r8Rx4PVotY\n0XiuMvoExn7EvNKT1oJa0CGRm1S2bG57mI2iNB6CoE1DOR/E9heQ4htvAoGAEOet\ngDyUzO/54siTpWL2BRSlCJgLccgwCjab3AZ9WEqurL6X8EkudgJSUlQTrBmascrE\nmeQKcu9d/jdSB/kY+bwNn8msJe29ad6a2/tKGvJakAQQAcEjw3ep1Kd8Ij7L0Lwh\n+2LuKp8wbg8vmUTL2jXMM2LP88u0w24bQLaBXlMCgYBuj4PiphhzBIbsN3cWpIvC\nyUOOCcLVdo7zIGdyC8ZCmpllHcy13jAIaaZmSpi8wGKC7ormN0D8NTZat3TndwmX\noJU8TGLyPepOneBlrYMf/YRh664g8UOkQQIioh3tl263f4PkscsS4IqNKQy73C34\nhDbjpxLbArC7kgbqLWHEVQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-gst5y@math-learning-5e0f0.iam.gserviceaccount.com",
  "client_id": "117147591144829109375",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gst5y%40math-learning-5e0f0.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

firebase.initializeApp(firebaseConfig);



export default function SingIn({ props }) {
  
  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await firebase.auth().signInWithPopup(provider);
      alert('Autenticado com sucesso!');
    } catch (error) {
      console.log('errp', error)
      alert('Erro ao autenticar com o Google. Verifique o console para obter detalhes.' + JSON.parse(error));
    }
  };

  return (
    <div className="form-signin w-100 m-auto bg-body-tertiary">
      <Form onSubmit={() => console.log}>
        <h1 className="h3 mb-3 fw-normal">Nova conta</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={""}
            onChange={() => console.log}
          />
          <label htmlFor="floatingInput">Digite seu melhor email</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={""}
            onChange={() => console.log}
          />
          <label htmlFor="floatingPassword">Senha</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={""}
            onChange={() => console.log}
          />
          <label htmlFor="floatingPassword">Confirme sua senha</label>
        </div>

        <Button
          className="btn btn-primary w-100 py-2"
          type="submit"
          onClick={() => console.log('teste')}
        >
          Criar conta
        </Button>

        <Button
          className="btn btn-primary w-100 py-2"
          type="submit"
          onClick={() => handleGoogleSignIn()}
        >
          Login
        </Button>
        <p className="mt-5 mb-3 text-body-secondary">Math learning</p>
      </Form>
    </div>
  );
}
