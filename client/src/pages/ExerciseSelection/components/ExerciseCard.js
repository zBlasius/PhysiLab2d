import React from "react";
import { Button, Card } from "react-bootstrap";

const ExerciseCard = ({ exercise, onClick }) => {
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

      <Card.Footer>TODO: Progresso</Card.Footer>
    </Card>
  );
};

export default ExerciseCard;
