import React from "react";
import { Button, Card } from "react-bootstrap";

const SubjectCard = ({ subject, onClick }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Header>{subject?.name ?? ""}</Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={`img/${subject?.image ?? ""}`} />
      </Card.Body>
      <Card.Footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="primary" onClick={onClick}>Abrir exercícios</Button>
      </Card.Footer>
    </Card>
  );
};

export default SubjectCard;
