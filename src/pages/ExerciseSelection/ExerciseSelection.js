import exercisesJSON from "../../database/exercises.json";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const ExerciseSelection = ({ subject }) => {
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    if (subject?.key && !exercises) {
      setExercises(Object.values(exercisesJSON[subject.key]) ?? []);
    }
  }, [subject, exercises]);

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <h1>{subject?.name ?? ""} __ Exercícios</h1>

      {exercises?.map((exercise) => exercise.name)}
    </Container>
  );
};

export default ExerciseSelection;
