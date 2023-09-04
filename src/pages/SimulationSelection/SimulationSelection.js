import exercisesJSON from "../../database/exercises.json";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const SimulationSelection = ({ subject }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if(subject?.key) {
      setExercises(Object.values(exercisesJSON[subject.key]) ?? [])
    }
  }, [subject, exercises]);

  // TODO
  return <Container></Container>;
};

export default SimulationSelection;
