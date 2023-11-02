import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BackButton = (style) => {
  const navigate = useNavigate();
  const location = useLocation();

  function removeLastPathSegment(url) {
    const segments = url.split("/");
    segments.pop();
    const modifiedUrl = segments.join("/");
    if (!modifiedUrl) return "/";
    return modifiedUrl;
  }

  return (
    <div style={{ marginBottom: 6 }}>
      <Button
        variant="secondary"
        onClick={() => navigate(removeLastPathSegment(location.pathname))}
      >
        Voltar
      </Button>
    </div>
  );
};

export default BackButton;
