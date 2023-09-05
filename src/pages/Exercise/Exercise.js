import React from "react";
import Question from "./components/Question/Question";
import Simulation from "./components/Simulation/Simulation";

const Exercise = ({ exercise }) => {
  // TODO:
  function onSubmitAnswer(submitedAnswer) {
    console.log("submitedAnswer: ", submitedAnswer);
  }

  return (
    <div style={{ height: "700px", width: "100%" }}>
      <Question exercise={exercise} onSubmitAnswer={onSubmitAnswer} />
      <Simulation exercise={exercise} />
    </div>
  );
};

export default Exercise;
