import React, {useContext} from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Context} from "../../store/Context"
import SubjectCard from "./components/SubjectCard";

const SubjectSelection = () => {
  const navigate = useNavigate();
  const context = useContext(Context)
  const {state, setState} = context;

  return (
    <Container>
      <h1>Matérias</h1>

      <Container
        style={{
          padding: "24px 0",
          display: "flex",
          gap: 24,
        }}
      >
        {Object.values(state.subjectsData).map((subject) => (
          <SubjectCard
            key={subject.key}
            subject={subject}
            onClick={() => navigate(subject.key)}
          />
        ))}
      </Container>
    </Container>
  );
};

export default SubjectSelection;
