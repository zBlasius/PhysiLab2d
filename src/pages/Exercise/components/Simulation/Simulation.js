import React, { useState } from "react";
import ControlBar from "./components/ControlBar";
import Simulation0 from "./Simulations/Simulation0";
import Simulation1 from "./Simulations/Simulation1";

const Simulation = ({ exercise }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  function getExercise(exercise, isPlaying, speed) {
    if (exercise.key == "exercise01") {
      return <Simulation1 isPlaying={isPlaying} speed={speed} />;
    } else if (exercise.key == "exercise02") {
      return <Simulation0 isPlaying={isPlaying} speed={speed} />;
    } else {
      return <Simulation0 isPlaying={isPlaying} speed={speed} />;
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
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        speed={speed}
        setSpeed={setSpeed}
        onClickRestart={onClickRestart}
      />

      {getExercise(exercise, isPlaying, speed)}
    </div>
  );
};

export default Simulation;
