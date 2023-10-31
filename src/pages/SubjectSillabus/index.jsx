import Sidebar from "../../componentes/Sidebar";

import SubjectInfos from "../../componentes/SubjectInfos";
import CourseClasses from "../../componentes/CourseClasses";
import Button from "../../componentes/Button";
import api from "../../utils/api.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

function SubjectSillabus() {
  const [subject, setSubject] = useState({});
  const [classes, setClasses] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await api.get(`/disciplina/${id}`);
        if (response.status === 200) setSubject(response.data);
      } catch (error) {
        toast.error("Error ao carregar dados da disciplina");
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await api.get(`/disciplina/${id}/turmas`);
        if (response.status === 200) {
          const classes = response.data.map((classItem) => {
            return {
              id: classItem.id,
              dias: classItem.dias,
              horario: classItem.horario,
              local: classItem.local,
              professor: classItem.professor.nome,
            };
          });

          setClasses(classes);
        }
      } catch (error) {
        toast.error("Erro ao carregar dados da disciplina");
      }
    };

    fetchSubject();
    fetchClasses();
  }, [id]);

  const fetchClasses = async () => {
    try {
      const response = await api.get(`/disciplina/${id}/turmas`);
      if (response.status === 200) {
        const classes = response.data.map((classItem) => {
          return {
            id: classItem.id,
            dias: classItem.dias,
            horario: classItem.horario,
            local: classItem.local,
            professor: classItem.professor.nome,
          };
        });

        setClasses(classes);
      }
    } catch (error) {
      toast.error("Erro ao carregar dados da disciplina");
    }
  };

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <SubjectInfos subjectData={subject} />
      <CourseClasses courseClasses={classes} fetchClasses={fetchClasses} />
      <div className="py-4 mb-4">
        <Button href={`/curso/${subject?.curso?.id}`} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default SubjectSillabus;
