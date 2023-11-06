import React from "react";
import { Button, Card } from "react-bootstrap";

const ExerciseCard = ({ exercise, onClick }) => {
  function exerciseStatus() {
    if (exercise.completed) {
      return "Feito";
    } else {
      return "Pendente";
    }
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant={exercise?.completed ? "success" : "primary"}
          onClick={() => onClick(exercise)}
        >
          {exercise?.name ?? ""}
        </Button>
      </Card.Body>

      <Card.Footer>Status: {exerciseStatus()}</Card.Footer>
    </Card>
  );
};

export default ExerciseCard;
