import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import CourseClasses from "../../componentes/CourseClasses";
import Button from "../../componentes/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProfessorClasses() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);

  const { token } = useAuth();
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

  const fetchClasses = useCallback(async () => {
    try {
      if (!user) return;

      const userId = user?.id;
      const response = await api.get(`/professor/${userId}/turmas`);
      if (response.status === 200) {
        const classes = response.data?.map((classItem) => {
          return {
            id: classItem.id,
            dias: classItem.dias,
            horario: classItem.horario,
            sala: classItem.sala,
            professor: classItem.professor.nome,
          };
        });
        setClasses(classes);
      } else {
        toast.error("Erro ao carregar turmas");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar turmas");
    }
  }, [user]);

  useEffect(() => {
    fetchClasses();
  }, [id, fetchClasses]);

  return (
    <div className="w-full pl-64">
      <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <h1 className="text-2xl text-primary-800 font-bold pb-2">
          Professor {user?.nome}
        </h1>
      </div>
      <CourseClasses
        courseClasses={classes}
        fetchClasses={fetchClasses}
        entity="Professor"
      />
      <div className="py-4 mb-4">
        <Button onClick={() => navigate(-1)} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default ProfessorClasses;
