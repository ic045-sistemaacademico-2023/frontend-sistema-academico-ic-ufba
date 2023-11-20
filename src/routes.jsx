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
import ClassesPage from "./pages/ClassesPage";
import CoursesPage from "./pages/Courses";
import RegisterCourse from "./pages/RegisterCourse";
import UsersPage from "./pages/Users";
import ManageUsersPage from "./pages/ManageUsers";

import ProfessorClasses from "./pages/ProfessorClasses";
import ProtectedRoute from "./componentes/Sidebar/ProtectedRoute";
import WelcomePage from "./pages/Welcolme";
import RegisterEnrollment from "./pages/RegisterEnrollment";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/password-reset" element={<PasswordReset />} />

        <Route element={<ProtectedRoute redirectPath="/login" />}>
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/curso/:id" element={<SubjectsPage />} />
          <Route exact path="/disciplina/:id" element={<SubjectSillabus />} />
          <Route exact path="/turmas" element={<ClassesPage />} />

          {/* Aluno */}
          <Route element={<ProtectedRoute roles={["ALUNO"]} />}>
            <Route exact path="/historico" element={<HistoryPage />} />
            <Route
              exact
              path="/comprovante-matricula"
              element={<StudentPage />}
            />
          </Route>

          {/* Usuários */}
          <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
            <Route exact path="/usuarios" element={<UsersPage />} />
            <Route exact path="/cadastrar/usuario" element={<RegisterUser />} />
            <Route
              exact
              path="/atualizar/usuario/:id"
              element={<RegisterUser />}
            />
            <Route
              exact
              path="/gerenciar-usuarios"
              element={<ManageUsersPage />}
            />
          </Route>

          {/* Disciplinas */}
          <Route
            element={
              <ProtectedRoute roles={["ADMIN", "COORDENADOR_DE_CURSO"]} />
            }
          >
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
          </Route>

          {/* Turmas */}
          <Route
            element={
              <ProtectedRoute
                roles={["ADMIN", "COORDENADOR_DE_CURSO", "PROFESSOR"]}
              />
            }
          >
            <Route
              exact
              path="/professor/:id/turmas"
              element={<ProfessorClasses />}
            />
            <Route exact path="/turma/:id" element={<CourseClassPage />} />
            <Route exact path="/cadastrar/turma" element={<RegisterClass />} />
            <Route
              exact
              path="/atualizar/turma/:id"
              element={<RegisterClass />}
            />
          </Route>

          {/* Cursos */}
          <Route
            element={
              <ProtectedRoute
                roles={["ADMIN", "COORDENADOR_DE_CURSO", "ALUNO"]}
              />
            }
          >
            <Route exact path="/cursos" element={<CoursesPage />} />
            <Route exact path="/cadastrar/curso" element={<RegisterCourse />} />
            <Route
              exact
              path="/atualizar/curso/:id"
              element={<RegisterCourse />}
            />
          </Route>

           {/* Oportunidade Matricula */}
        <Route
            element={
              <ProtectedRoute roles={["ADMIN", "COORDENADOR_DE_CURSO"]} />
            }
          >
            <Route exact path="/cadastrar/oportunidade" element={<RegisterEnrollment />} />
            <Route exact path="/oportunidades" element={<CourseClassPage />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
