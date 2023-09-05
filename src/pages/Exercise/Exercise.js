import React from "react";
import { Container } from "react-bootstrap";
import Question from "./components/Question/Question";
import Simulation from "./components/Simulation/Simulation";

const Exercise = ({ exercise }) => {
  // TODO:
  function onSubmitAnswer(submitedAnswer) {
    console.log("submitedAnswer: ", submitedAnswer);
  }

  return (
    <Container
      style={{
        height: "100 vh",
        width: "100 vw",
      }}
    >
      <Question exercise={exercise} onSubmitAnswer={onSubmitAnswer} />
      <Simulation exercise={exercise} />
    </Container>
  );
};

export default Exercise;
