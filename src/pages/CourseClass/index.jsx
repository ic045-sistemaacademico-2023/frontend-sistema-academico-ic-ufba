import { useParams } from "react-router-dom";

import Sidebar from "../../componentes/Sidebar";
import CourseClassInfos from "../../componentes/CourseClassInfos";
import ClassStudents from "../../componentes/ClassStudents";
import Button from "../../componentes/Button";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

function CourseClassPage() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/turma/${id}`);
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error(`Error ao carregar a turma ${id}`);
      }
    };
    fetchUsers();
  }, [id]);

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <CourseClassInfos course={data} />
      <ClassStudents classStudents={data?.alunos} />

      <div className="py-4 mb-4">
        <Button href={`/disciplina/${data?.disciplina?.id}`} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default CourseClassPage;
