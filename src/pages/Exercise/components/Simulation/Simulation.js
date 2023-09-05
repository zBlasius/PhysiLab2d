import React, { useState } from "react";
import ControlBar from "./components/ControlBar";
import RenderBox from "./components/RenderBox";

const Simulation = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  function onClickRestart() {}

  return (
    <div>
      <ControlBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        speed={speed}
        setSpeed={setSpeed}
        onClickRestart={onClickRestart}
      />
      <RenderBox />
    </div>
  );
};

export default Simulation;
