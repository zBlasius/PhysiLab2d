import subjectsJSON from "../../database/subjects.json";

import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";
import ExerciseSelection from "../ExerciseSelection/ExerciseSelection";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SubjectSelection />} />
        <Route
          path="elementary-physics"
          element={
            <ExerciseSelection subject={subjectsJSON["elementary-physics"]} />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
