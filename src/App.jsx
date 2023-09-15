import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import StudentPage from "./pages/Student";
import SubjectsPage from "./pages/Subjects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StudentPage />} />
        <Route exact path="/disciplinas" element={<SubjectsPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
