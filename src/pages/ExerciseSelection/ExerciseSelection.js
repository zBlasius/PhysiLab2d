import exercisesJSON from "../../database/exercises.json";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ExerciseCard from "./components/ExerciseCard";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";

const ExerciseSelection = ({ subject }) => {
  const navigate = useNavigate();
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
      <BackButton />

      <h1>{subject?.name ?? ""} __ Exercícios</h1>

      {exercises?.map((exercise) => (
        <ExerciseCard
          key={exercise.key}
          exercise={exercise}
          onClick={() => navigate("/" + subject.key + "/" + exercise.key)}
        />
      ))}
    </Container>
  );
};

export default ExerciseSelection;
