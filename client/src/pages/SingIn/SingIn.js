import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SingIn({ props }) {
  function createAccount() {}

  function checkInfo() {}
  // TODO: Remover logs

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
          onClick={() => createAccount()}
        >
          Criar conta
        </Button>
        <p className="mt-5 mb-3 text-body-secondary">Math learning</p>
      </Form>
    </div>
  );
}
