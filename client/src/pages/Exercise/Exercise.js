import React from "react";
import Question from "./components/Question/Question";
import Simulation from "./components/Simulation/Simulation";
import { useNavigate } from "react-router";

const Exercise = ({ exercise }) => {
  const navigate = useNavigate();

  function onSubmitAnswer(submitedAnswer) {
    if (submitedAnswer == exercise.answer) {
      // TODO: Completar exercicio

      navigate("/elementary-physics");
    }
  }

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <Question exercise={exercise} onSubmitAnswer={onSubmitAnswer} />
      <Simulation exercise={exercise} />
    </div>
  );
};

export default Exercise;
