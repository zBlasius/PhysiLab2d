import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SubjectSelection />}>
        <Route path="SubjectSelection" element={<SubjectSelection />} />
      </Route>
    </Routes>
  );
}

export default App;
