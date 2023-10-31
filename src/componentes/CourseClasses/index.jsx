import { useNavigate } from "react-router-dom";
import Button from "../Button";
import api from "../../utils/api";
import { toast } from "react-toastify";

function CourseClasses({ courseClasses, fetchClasses }) {
  const currentYear = new Date().getFullYear();
  const currentPeriod = new Date().getMonth() < 6 ? 1 : 2;

  const navigate = useNavigate();

  async function deleteClass(id) {
    try {
      const response = await api.delete(`/turma/${id}`);
      if (response.status === 204) {
        toast.success("Turma deletado com sucesso!");
        fetchClasses();
      } else {
        toast.error("Erro ao deletar turma");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar turma");
    }
  }

  return courseClasses?.length === 0 ? (
    <strong className="text-sm text-primary-600 block p-4">
      Disciplina sem turmas cadastradas para o período
    </strong>
  ) : (
    <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
      <strong className="text-xl text-primary-600">
        Lista de turmas - Semestre {currentYear}.{currentPeriod}
      </strong>
      <table className="w-full text-sm text-center text-gray-700 mt-4">
        <thead className="text-xs text-gray-900 uppercase bg-gray-5">
          <tr>
            <th scope="col" className="px-6 py-3">
              Turma
            </th>
            <th scope="col" className="px-6 py-3">
              Dias
            </th>
            <th scope="col" className="px-6 py-3">
              Horários
            </th>
            <th scope="col" className="px-6 py-3">
              Local
            </th>
            <th scope="col" className="px-6 py-3">
              Docente
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {courseClasses.map((classItem, index) => (
            <tr
              key={index}
              className={`${
                index % 2 == 0 ? "bg-gray-50" : "bg-gray-100"
              } border border-gray-100 hover:bg-primary-100`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {classItem.id}
              </th>
              <td className="px-6 py-4">{classItem.dias}</td>
              <td className="px-6 py-4">{classItem.horario}</td>
              <td className="px-6 py-4">{classItem.local}</td>
              <td className="px-6 py-4">{classItem.professor}</td>
              <td className="px-2 py-2 flex flex-wrap justify-center">
                <Button onClick={() => navigate(`/turma/${classItem.id}`)}>
                  Visualizar
                </Button>
                <Button secondary href={`/atualizar/turma/${classItem.id}`}>
                  Editar
                </Button>
                <Button onClick={() => deleteClass(classItem.id)}>
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseClasses;
