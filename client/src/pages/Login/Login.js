import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import logoImage from "./crystal-ball.png";
import { useNavigate } from "react-router";
import { Context } from "../../store/Context";
import "./login.css";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(Context);
  const navigate = useNavigate();

  const singIn = () => {
    navigate("/singIn");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-signin w-100 m-auto bg-body-tertiary">
      <Form onSubmit={handleSubmit}>
        <img className="mb-4" src={logoImage} alt="" width="64" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <Button
          className="btn btn-primary w-100 py-2"
          type="submit"
          onClick={() => singIn()}
        >
          Sign in
        </Button>
        <p className="mt-5 mb-3 text-body-secondary">Math learning</p>
      </Form>
    </div>
  );
};

export default SignInForm;
