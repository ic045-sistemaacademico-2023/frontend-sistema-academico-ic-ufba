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
import CourseClasses from "./componentes/CourseClasses";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <Route exact path="/usuario" element={<RegisterUser />} />
        <Route exact path="/usuario/:id" element={<RegisterUser />} />
        <Route exact path="/usuarios" element={<UsersPage />} />
        <Route exact path="/gerenciar-usuarios" element={<ManageUsersPage />} />

        {/* Disciplinas */}
        <Route exact path="/disciplinas" element={<SubjectsPage />} />
        <Route exact path="/disciplina/:codigo" element={<SubjectSillabus />} />
        <Route exact path="/ementa-disciplina" element={<SubjectSillabus />} />
        <Route
          exact
          path="/cadastro-disciplina"
          element={<RegisterSubject />}
        />

        {/* Turmas */}
        <Route exact path="/turma/:id" element={<CourseClassPage />} />
        <Route exact path="/turmas" element={<CourseClasses />} />
        <Route exact path="/cadastro-turma" element={<RegisterClass />} />

        {/* Cursos */}
        <Route exact path="/cursos" element={<CoursesPage />} />
        <Route exact path="/curso" element={<RegisterCourse />} />
        <Route exact path="/curso/:id" element={<RegisterCourse />} />
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
