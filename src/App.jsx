import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import StudentPage from "./pages/Student";
import SubjectsPage from "./pages/Subjects";
import RegisterUser from "./pages/RegisterUser";
import HistoryPage from "./pages/History";
import PasswordReset from "./pages/PasswordReset";
import SubjectSillabus from "./pages/SubjectSillabus";
import CoursesPage from "./pages/Courses";
import RegisterCourse from "./pages/RegisterCourse";
import UsuariosPage from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/disciplinas" element={<SubjectsPage />} />
        <Route exact path="/disciplina/:id" element={<SubjectSillabus />} />
        <Route exact path="/cadastro-usuario" element={<RegisterUser />} />
        <Route exact path="/comprovante-matricula" element={<StudentPage />} />
        <Route exact path="/historico" element={<HistoryPage />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />
        <Route exact path="/ementa-disciplina" element={<SubjectSillabus />} />
        <Route exact path="/cursos" element={<CoursesPage />} />
        <Route exact path="/cadastro-curso" element={<RegisterCourse />} />
        <Route exact path="/usuarios" element={<UsuariosPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
