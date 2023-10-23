import Sidebar from "../../componentes/Sidebar";

import { courseData } from "./data";
import { courseClasses } from "./courses";
import SubjectInfos from "../../componentes/SubjectInfos";
import CourseClasses from "../../componentes/CourseClasses";
import { useParams } from "react-router-dom";
import Button from "../../componentes/Button";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

function SubjectSillabus() {
  const [data, setData] = useState();
  const { codigo } = useParams();

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await api.get(`disciplina/codigo/${codigo}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados da disciplina");
      }
    };
    fetchSubjectData();
  }, []);


  return (
    <div className="w-full pl-64">
      <Sidebar />

      <SubjectInfos course={{...courseData, ...data}} />
      <CourseClasses courseClasses={courseClasses} />
      <div className="py-4 mb-4">
        <Button href="/disciplinas" secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default SubjectSillabus;
