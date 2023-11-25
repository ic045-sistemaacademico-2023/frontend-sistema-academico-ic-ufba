import { useParams } from "react-router-dom";

import CourseClassInfos from "../../componentes/CourseClassInfos";
import ClassStudents from "../../componentes/ClassStudents";
import Button from "../../componentes/Button";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CourseClassPage() {
  const { id } = useParams();
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/turma/${id}`);
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
      <CourseClassInfos course={data} />
      <ClassStudents classStudents={data?.alunos} />

      <div className="py-4 mb-4">
        <Button onClick={() => navigate(-1)} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}

export default CourseClassPage;
