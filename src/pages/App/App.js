import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import SubjectSelection from "../SubjectSelection/SubjectSelection";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<SubjectSelection />} />
        <Route path="elementary-physics" element={<h1>vapo</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
