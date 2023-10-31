import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import HistoryPage from "./pages/History";
import LoginPage from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import RegisterClass from "./pages/RegisterClass";
import RegisterSubject from "./pages/RegisterSubject";
import RegisterUser from "./pages/RegisterUser";
import StudentPage from "./pages/Student";
import SubjectSillabus from "./pages/SubjectSillabus";
import SubjectsPage from "./pages/Subjects";
import CourseClassPage from "./pages/CourseClass";
import CoursesPage from "./pages/Courses";
import RegisterCourse from "./pages/RegisterCourse";
import UsersPage from "./pages/Users";
import ManageUsersPage from "./pages/ManageUsers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfessorClasses from "./pages/ProfessorClasses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fluxo Inicial */}
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />

        {/* Aluno */}
        <Route exact path="/historico" element={<HistoryPage />} />
        <Route exact path="/comprovante-matricula" element={<StudentPage />} />

        {/* Usuários */}
        <Route exact path="/usuarios" element={<UsersPage />} />
        <Route exact path="/cadastrar/usuario" element={<RegisterUser />} />
        <Route exact path="/atualizar/usuario/:id" element={<RegisterUser />} />
        <Route exact path="/gerenciar-usuarios" element={<ManageUsersPage />} />

        {/* Disciplinas */}
        <Route exact path="/curso/:id" element={<SubjectsPage />} />
        <Route exact path="/disciplina/:id" element={<SubjectSillabus />} />
        <Route
          exact
          path="/cadastrar/disciplina"
          element={<RegisterSubject />}
        />
        <Route
          exact
          path="/atualizar/disciplina/:id"
          element={<RegisterSubject />}
        />

        {/* Turmas */}
        <Route
          exact
          path="/professor/:id/turmas"
          element={<ProfessorClasses />}
        />
        <Route exact path="/turma/:id" element={<CourseClassPage />} />
        <Route exact path="/cadastrar/turma" element={<RegisterClass />} />
        <Route exact path="/atualizar/turma/:id" element={<RegisterClass />} />

        {/* Cursos */}
        <Route exact path="/cursos" element={<CoursesPage />} />
        <Route exact path="/cadastrar/curso" element={<RegisterCourse />} />
        <Route exact path="/atualizar/curso/:id" element={<RegisterCourse />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
