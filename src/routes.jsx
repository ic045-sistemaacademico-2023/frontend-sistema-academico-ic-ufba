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
import RegisterEnrollmentOpportunity from "./pages/RegisterEnrollmentOpportunity";
import EnrollmentOpportunities from "./pages/EnrollmentOpportunities";
import EnrollmentOpportunityPage from "./pages/EnrollmentOpportunityPage";

import { useEffect, useState } from "react";
import api from "./utils/api";
import useAuth from "./hooks/useAuth";
import PageLoyout from "./pages/PageLoyout";
import SelfRegister from "./pages/SelfRegister";
import RequestEnrollment from "./pages/RequestEnrollment";
import EnrollmentProof from "./pages/EnrollmentProof";
import EnrollmentRequests from "./pages/EnrollmentRequests";
import EnrollmentRequestPage from "./pages/EnrollmentRequestPage";

export default function AppRoutes() {
  const { token, setToken } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/login"
          element={<LoginPage setToken={setToken} />}
        />
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/cadastro" element={<SelfRegister />} />
        <Route exact path="/recuperar-senha" element={<PasswordReset />} />

        <Route element={<PageLoyout />}>
          <Route element={<ProtectedRoute user={user} redirectPath="/login" />}>
            <Route index element={<WelcomePage />} />
            <Route exact path="/curso/:id" element={<SubjectsPage />} />
            <Route exact path="/disciplina/:id" element={<SubjectSillabus />} />
            <Route exact path="/turmas" element={<ClassesPage />} />

            {/* Aluno */}
            <Route element={<ProtectedRoute user={user} roles={["ALUNO"]} />}>
              <Route exact path="/historico" element={<HistoryPage />} />
              <Route
                exact
                path="/comprovante-matricula"
                element={<StudentPage />}
              />
              <Route
                exact
                path="/solicitacao-de-matricula"
                element={<RequestEnrollment />}
              />
              <Route
                exact
                path="/compr-solicitacao-matricula"
                element={<EnrollmentProof />}
              />
            </Route>

            {/* Usuários */}
            <Route element={<ProtectedRoute user={user} roles={["ADMIN"]} />}>
              <Route exact path="/usuarios" element={<UsersPage />} />
              <Route
                exact
                path="/cadastrar/usuario"
                element={<RegisterUser />}
              />
              <Route
                exact
                path="/atualizar/usuario/:id"
                element={<RegisterUser />}
              />
              <Route
                exact
                path="/gerenciar/usuarios"
                element={<ManageUsersPage />}
              />
            </Route>

            {/* Disciplinas */}
            <Route
              element={
                <ProtectedRoute
                  user={user}
                  roles={["ADMIN", "COORDENADOR_DE_CURSO"]}
                />
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
                  user={user}
                  roles={["ADMIN", "COORDENADOR_DE_CURSO", "PROFESSOR"]}
                />
              }
            >
              <Route
                exact
                path="/professor/turmas"
                element={<ProfessorClasses />}
              />
              <Route exact path="/turma/:id" element={<CourseClassPage />} />
              <Route
                exact
                path="/cadastrar/turma"
                element={<RegisterClass />}
              />
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
                  user={user}
                  roles={["ADMIN", "COORDENADOR_DE_CURSO", "ALUNO"]}
                />
              }
            >
              <Route exact path="/cursos" element={<CoursesPage />} />
              <Route
                exact
                path="/cadastrar/curso"
                element={<RegisterCourse />}
              />
              <Route
                exact
                path="/atualizar/curso/:id"
                element={<RegisterCourse />}
              />
            </Route>
          </Route>

          {/* Oportunidade Matricula */}
          <Route
            element={
              <ProtectedRoute roles={["ADMIN", "COORDENADOR_DE_CURSO"]} />
            }
          >
            <Route
              exact
              path="/cadastrar/oportunidade"
              element={<RegisterEnrollmentOpportunity />}
            />
            <Route
              exact
              path="/atualizar/oportunidade/:id"
              element={<RegisterEnrollmentOpportunity />}
            />
            <Route
              exact
              path="/oportunidades"
              element={<EnrollmentOpportunities />}
            />
            <Route
              exact
              path="/oportunidade/:id"
              element={<EnrollmentOpportunityPage />}
            />
            <Route
              exact
              path="/solicitacoes"
              element={<EnrollmentRequests />}
            />
            <Route
              exact
              path="/solicitacao-matricula/:id"
              element={<EnrollmentRequestPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
