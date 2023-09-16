import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import StudentPage from "./pages/Student";
import SubjectsPage from "./pages/Subjects";
import RegisterUser from "./pages/RegisterUser";
import PasswordReset from "./pages/PasswordReset";
import Sidebar from "./componentes/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<StudentPage />} />
        <Route exact path="/disciplinas" element={<SubjectsPage />} />
        <Route exact path="/cadastro-usuario" element={<RegisterUser />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
