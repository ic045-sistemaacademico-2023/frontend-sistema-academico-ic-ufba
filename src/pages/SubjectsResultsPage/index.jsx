import SubjectsResults from "../../componentes/SubjectsResults";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import StudentInfos from "../../componentes/StudentInfos";

function SubjectsResultsPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [subjectsResults, setCourseResults] = useState();
  const [student, setStudent] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          fetchStudent(response.data);
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStudent = async (user) => {
      try {
        if (!user?.id) return;
        const response = await api.get(`/aluno/${user?.id}`);
        setStudent(response.data);
        fetchSubjectResults(response.data?.id);
      } catch (error) {
        console.log(error);
        toast.error(`Error ao carregar o aluno`);
      }
    };

    const fetchSubjectResults = async (id) => {
      try {
        const response = await api.get(`/nota/${id}/aluno`);
        if (response.status === 200) {
          setCourseResults(response.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar disciplinas do curso");
      }
    };

    fetchUser();
  }, [token]);

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
