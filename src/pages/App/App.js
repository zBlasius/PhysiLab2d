import subjectsJSON from "../../database/subjects.json";
import exercisesJSON from "../../database/exercises.json";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";
import ExerciseSelection from "../ExerciseSelection/ExerciseSelection";
import Exercise from "../Exercise/Exercise";
import Exercise1 from "../Exercise/Exercises/Exercise1";
import { Container } from "react-bootstrap";
import Login from "../Login/Login";

function App() {
  return (
    <Container
      style={{
        height: "100vh",
        width: "100vw",
        padding: 36,
      }}
    >
      <Routes>
        <Route index element={<SubjectSelection />} />

        <Route path="joel" element={<Exercise1 />} />

        <Route path="login" element={<Login />} />
        <Route
          path="elementary-physics"
          element={
            <ExerciseSelection subject={subjectsJSON["elementary-physics"]} />
          }
        />
        <Route
          path="elementary-physics/exercise01"
          element={
            <Exercise
              exercise={exercisesJSON["elementary-physics"]["exercise01"]}
            />
          }
        />
        <Route
          path="elementary-physics/exercise02"
          element={
            <Exercise
              exercise={exercisesJSON["elementary-physics"]["exercise02"]}
            />
          }
        />
        <Route
          path="elementary-physics/exercise03"
          element={
            <Exercise
              exercise={exercisesJSON["elementary-physics"]["exercise03"]}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
