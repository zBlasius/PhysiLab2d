import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Context } from "../utils/Context";
import { Button } from "reactstrap";
import { signOut, getAuth } from "firebase/auth";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationStr = location.pathname;
  const { state, setState } = useContext(Context);

  const showLogout = locationStr === "/home";

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
        <Navbar.Brand>
          <div
            onClick={() => navigate("/home")}
            style={{
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            <span className="text-white">PhysiLab2d</span>
          </div>
        </Navbar.Brand>

        <div style={{ right: 0 }}>
          {showLogout ? (
            <div>
              <span
                style={{ marginRight: 18, color: "white", fontSize: "0.8em" }}
              >
                {state?.user?.email ?? ""}
              </span>

              <Button
                onClick={() => {
                  const auth = getAuth();
                  signOut(auth)
                    .then(() => {
                      setState((s) => ({ ...s, user: null }));
                      navigate("/login");
                    })
                    .catch((error) => {
                      alert("Erro ao desconectar o usuário:", error);
                    });
                }}
                color="secondary"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate(removeLastPathSegment(location.pathname))}
              color="secondary"
            >
              Voltar
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
