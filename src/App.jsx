import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import CoursesPage from "./pages/Courses";
import HistoryPage from "./pages/History";
import LoginPage from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import RegisterClass from "./pages/RegisterClass";
import RegisterSubject from "./pages/RegisterSubject";
import RegisterUser from "./pages/RegisterUser";
import StudentPage from "./pages/Student";
import SubjectSillabus from "./pages/SubjectSillabus";
import SubjectsPage from "./pages/Subjects";

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
        <Route
          exact
          path="/cadastro-disciplina"
          element={<RegisterSubject />}
        />
        <Route exact path="/cadastrar-turma" element={<RegisterClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
