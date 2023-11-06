import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";

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
      <Container className="lead text-muted mt-4">
        <h3 className="jumbotron-heading text-center">{exercise?.name}</h3>
        <p className="lead text-muted p-2">{exercise?.question}</p>

        <div
          className="p-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form
            style={{
              display: "flex",
              flexDirection: "Column",
              gap: 3,
              justifyContent: "space-between",
              alignItens: "center",
            }}
          >
            {exercise?.options?.map((option, i) => {
              return (
                <Form.Group key={option} controlId={option}>
                  <Form.Check
                    type="radio"
                    label={option}
                    name="options"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                </Form.Group>
              );
            })}
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
              onClick={() => {
                if (selectedOption) setShowModal(true);
              }}
            >
              Enviar Resposta
            </Button>
          </div>

          <div> </div>
        </div>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
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
    </>
  );
};

export default Question;
