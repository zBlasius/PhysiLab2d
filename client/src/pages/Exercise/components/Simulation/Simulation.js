import React, { useRef, useState } from "react";
import ControlBar from "./components/ControlBar";
import Simulation0 from "./Simulations/Simulation0";
import Simulation1 from "./Simulations/Simulation1";
import Simulation2 from "./Simulations/Simulation2";
import Simulation3 from "./Simulations/Simulation3";

const Simulation = ({ exercise }) => {
  const [speed, setSpeed] = useState(0.0);
  const [reset, setReset] = useState(false);

  function getExercise(exercise, speed) {
    if (exercise.key == "exercise01") {
      return <Simulation1 speed={speed} reset={reset} />;
    } else if (exercise.key == "exercise02") {
      return <Simulation2 speed={speed} reset={reset} />;
    } else if (exercise.key == "exercise03") {
      return <Simulation3 speed={speed} reset={reset} />;
    } else {
      return <Simulation0 speed={speed} reset={reset} />;
    }
  }

  return (
    <div
      style={{
        height: "90%",
        width: "100%",
        position: "relative",
      }}
    >
      <ControlBar
        style={{ position: "absolute", top: 0, left: 0, zIndex: 999 }}
        speed={speed}
        setSpeed={setSpeed}
        onClickRestart={() => setReset((r) => !r)}
      />

      {getExercise(exercise, speed)}
    </div>
  );
};

export default Simulation;
