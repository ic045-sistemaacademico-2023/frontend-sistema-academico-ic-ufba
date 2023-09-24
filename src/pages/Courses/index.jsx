import Sidebar from "../../componentes/Sidebar";
import { courses } from "./data";

export default function CoursesPage() {
  const onClickCourse = (codigo) => {
    window.open(`/disciplinas/${codigo}`, "_self")
  }

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do curso
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Período do currículo
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Turno
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Duração mínima
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Duração máxima
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, courseIndex) => (
              <tr
                key={course.codigo}
                className={`${
                  courseIndex % 2 == 0 ? "bg-white" : "bg-primary-50"
                } border border-gray-100 hover:bg-primary-100 cursor-pointer`}
                onClick={() => onClickCourse(course.codigo)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.codigo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.nome}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{course.periodoCurriculo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{course.turno}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{course.duracaoMinima}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="text-sm text-gray-900">{course.duracaoMaxima}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
