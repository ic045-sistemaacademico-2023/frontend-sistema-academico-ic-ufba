import Sidebar from "../../componentes/Sidebar";

import SubjectInfos from "../../componentes/SubjectInfos";
import CourseClasses from "../../componentes/CourseClasses";
import Button from "../../componentes/Button";
import api from "../../utils/api.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubjectSillabus() {
  const [subjectData, setSubjectData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classDataLoaded, setClassDataLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const responseSubjectData = await api.get(`/disciplina/${id}`);
        setSubjectData(responseSubjectData.data);
      } catch (error) {
        toast.error("Error ao carregar dados da disciplina");
      }
    };
    fetchSubject();
  }, [id]);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const responseClassData = await api.get("/turma/1");
        setClassData([responseClassData.data]);
      } catch (error) {
        toast.error("Erro ao carregar dados da disciplina");
      }
    };
    fetchClass();
    // Simular uma chamada assíncrona (pode ser uma chamada para /turma/1)
    setTimeout(() => {
      const fakeClassData = {
        id: 1,
        // outros dados...
      };
      setClassData(fakeClassData);
      setClassDataLoaded(true); // Marca como carregado
    }, 2000); // Simula um atraso de 2 segundos
  }, []);

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <SubjectInfos subjectData={subjectData} />
      {classDataLoaded ? (
        <CourseClasses courseClasses={classData} />
      ) : (
        <strong className="text-sm text-primary-600 block p-4">
          Carregando dados das turma...
        </strong>
      )}
      <div className="py-4 mb-4">
        <Button href="/disciplinas" secondary>
          Voltar
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SubjectSillabus;
