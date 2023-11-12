import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { ContextProvider } from "./store/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>
);
