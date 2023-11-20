import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import CourseClasses from "../../componentes/CourseClasses";
import Button from "../../componentes/Button";
import Sidebar from "../../componentes/Sidebar";

function ProfessorClasses() {
  const { id } = useParams();

  const [classes, setClasses] = useState([]);
  const [professor, setProfessor] = useState({});

  const fetchClasses = useCallback(async () => {
    try {
      const response = await api.get(`/professor/${id}/turmas`);
      if (response.status === 200) {
        const classes = response.data?.map((classItem) => {
          return {
            id: classItem.id,
            dias: classItem.dias,
            horario: classItem.horario,
            local: classItem.local,
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
  }, [id]);

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await api.get(`/professor/${id}`);
        if (response.status === 200) {
          setProfessor(response.data);
        } else {
          toast.error("Erro ao carregar professor");
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar professor");
      }
    };
    fetchProfessor();
  }, [id]);

  useEffect(() => {
    fetchClasses();
  }, [id, fetchClasses]);

  return (
    <div className="w-full pl-64">
      <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <h1 className="text-2xl text-primary-800 font-bold pb-2">
          Professor {professor?.nome}
        </h1>
      </div>
      <CourseClasses
        courseClasses={classes}
        fetchClasses={fetchClasses}
        entity="Professor"
      />
      <div className="py-4 mb-4">
        <Button href="/cursos" secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default ProfessorClasses;
