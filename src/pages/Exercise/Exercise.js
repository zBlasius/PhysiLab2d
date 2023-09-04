import React from "react";
import { Container } from "react-bootstrap";

const Exercise = ({ exercise }) => {
  return (
    <Container>
      <h1>{exercise.name}</h1>
    </Container>
  );
};

export default Exercise;
