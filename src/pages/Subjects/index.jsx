import CourseSubjects from "../../componentes/CourseSubjects";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";

function SubjectsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseSubjects, setCourseSubjects] = useState([]);
  const [courseData, setCourseData] = useState({});

  const fetchCourseSubjects = useCallback(async () => {
    try {
      const response = await api.get(`/disciplina/curso/${id}`);
      if (response.status === 200) {
        const subjects = response.data.map((subject) => {
          return {
            id: subject.id,
            nome: subject.nome,
            codigo: subject.codigo,
          };
        });

        setCourseSubjects(subjects);
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar disciplinas do curso");
    }
  }, [id]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await api.get(`/curso/${id}`);
        if (response.status === 200) {
          const course = {
            nome: response.data.nome,
            id: response.data.id,
            coordenadorDeCurso: response.data.coordenadorDeCurso,
            semestre: response.data.semestre,
            turno: response.data.turno,
            periodo_curriculo: response.data.periodo_curriculo,
          };

          setCourseData(course);
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar dados do curso");
      }
    };

    fetchCourseData();
    fetchCourseSubjects();
  }, [id, fetchCourseSubjects]);

  return (
    <div className="w-full pl-64">
      <CourseSubjects
        courseData={courseData}
        subjects={courseSubjects}
        fetchSubjects={fetchCourseSubjects}
      />

      <div className="py-4 mb-4">
        <Button onClick={() => navigate(-1)} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default SubjectsPage;
