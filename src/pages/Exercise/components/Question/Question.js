import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const Question = ({ exercise, onSubmitAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Container style={{ border: "1px solid black" }}>
      <h2>{exercise?.name}</h2>
      <p>{exercise?.question}</p>

      <Form
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItens: "center",
        }}
      >
        {exercise?.options?.map((option, i) => (
          <Form.Group key={option}>
            <Form.Check
              type="radio"
              label={option}
              name="options"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
          </Form.Group>
        ))}
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItens: "center",
        }}
      >
        <Button
          variant={selectedOption ? "primary" : "secondary"}
          onClick={() => onSubmitAnswer(selectedOption)}
        >
          Enviar Resposta
        </Button>
      </div>
    </Container>
  );
};

export default Question;
