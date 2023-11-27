import SubjectsResults from "../../componentes/SubjectsResults";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import StudentInfos from "../../componentes/StudentInfos";

function SubjectsResultsPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [subjectsResults, setCourseResults] = useState();
  const [student, setStudent] = useState(null);

  const fetchUser = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchStudent = useCallback(async () => {
    if (!user) return;
    try {
      const response = await api.get(`/aluno/${user?.id}`);
      if (response.status === 200) {
        setStudent(response.data);
      } else {
        toast.error(`Erro ao carregar o aluno`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ao carregar o aluno`);
    }
  }, [user]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const fetchSubjectResults = useCallback(async () => {
    if (!student) return;
    try {
      const response = await api.get(`/nota/aluno/${student.id}`);
      if (response.status === 200) {
        setCourseResults(response.data);
      } else {
        toast.error("Erro ao carregar disciplinas do curso");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar disciplinas do curso");
    }
  }, [student]);

  useEffect(() => {
    fetchSubjectResults();
  }, [fetchSubjectResults]);

  return (
    <div className="w-full pl-64">
      <StudentInfos studentData={student} pageTitle={"Resultados"} />
      <SubjectsResults subjectsResults={subjectsResults} />

      <div className="py-4 mb-4">
        <Button onClick={() => navigate(-1)} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default SubjectsResultsPage;
