import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import BackButton from "../../../../components/BackButton";

const Question = ({ exercise, onSubmitAnswer }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }

  function handleCloseModal() {
    setShowModal(false);
    onSubmitAnswer(selectedOption);
    setSelectedOption("");
  }

  return (
    <>
      <BackButton />

      <Container style={{ border: "1px solid black" }}>
        <h2>{exercise?.name}</h2>
        <p>{exercise?.question}</p>
        <Form
          style={{
            display: "flex",
            justifyContent: "space-between",
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
            onClick={() => setShowModal(true)}
          >
            Enviar Resposta
          </Button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {exercise.answer == selectedOption
                ? "Resposta Correta"
                : "Resposta Incorreta"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {exercise.answer == selectedOption
              ? "Parabéns! Você acertou."
              : "Que pena! Tente outra vez."}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseModal}>
              Concluir
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Question;
