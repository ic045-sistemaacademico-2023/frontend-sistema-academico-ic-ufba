import { useEffect, useState } from "react";
import Sidebar from "../../componentes/Sidebar";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/curso/all");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error ao carregar dados dos cursos");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  async function deleteCourse(id) {
    try {
      const response = await api.delete(`/curso/${id}`);
      if (response.status === 204) {
        toast.success("Curso deletado com sucesso!");
        fetchCourses();
      } else {
        toast.error("Erro ao deletar curso");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar curso");
    }
  }

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <h2 className="text-xl text-gray-700 font-bold mt-4">Cursos</h2>
      <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do curso
              </th>
              <th scope="col" className="px-6 py-3">
                Coordenador
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Semestre
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Turno
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, courseIndex) => (
              <tr
                key={course.id}
                className={`${
                  courseIndex % 2 == 0 ? "bg-gray-50" : "bg-gray-100"
                } border border-gray-100 hover:bg-primary-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.nome}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {course.coordenadorDeCurso?.nome}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{course.semestre}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{course.turno}</div>
                </td>
                <td className="px-6 py-4 min-w-[64px]">
                  <Button secondary href={`atualizar/curso/${course.id}`}>
                    Editar
                  </Button>
                  <Button onClick={() => deleteCourse(course.id)}>
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
