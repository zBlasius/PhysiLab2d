import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackButton = (style) => {
  const navigate = useNavigate();
  return (
    <div style={{ marginBottom: 6 }}>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Voltar
      </Button>
    </div>
  );
};

export default BackButton;
