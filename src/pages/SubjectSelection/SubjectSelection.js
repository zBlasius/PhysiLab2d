import subjectsJSON from "../../database/subjects.json";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SubjectCard from "./components/SubjectCard";

const SubjectSelection = () => {
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    if (selectedSubject) {
    }
  }, [selectedSubject]);

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
        {Object.values(subjectsJSON).map((subject) => (
          <SubjectCard
            key={subject.key}
            subject={subject}
            onClick={() => setSelectedSubject(subject)}
          />
        ))}
      </Container>
    </Container>
  );
};

export default SubjectSelection;
