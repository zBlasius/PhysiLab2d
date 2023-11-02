import React, { useState } from "react";
import ControlBar from "./components/ControlBar";
import Simulation0 from "./Simulations/Simulation0";
import Simulation1 from "./Simulations/Simulation1";

const Simulation = ({ exercise }) => {
  const [speed, setSpeed] = useState(1.0);

  function getExercise(exercise, speed) {
    if (exercise.key == "exercise01") {
      return <Simulation1 speed={speed} />;
    } else if (exercise.key == "exercise02") {
      return <Simulation0 speed={speed} />;
    } else {
      return <Simulation0 speed={speed} />;
    }
  }

  function onClickRestart() {}

  return (
    <div
      style={{
        height: "90%",
        width: "100%",
      }}
    >
      <ControlBar
        speed={speed}
        setSpeed={setSpeed}
        onClickRestart={onClickRestart}
      />

      {getExercise(exercise, speed)}
    </div>
  );
};

export default Simulation;
