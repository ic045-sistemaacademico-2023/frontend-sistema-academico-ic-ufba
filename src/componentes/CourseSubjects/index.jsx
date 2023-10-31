import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function CourseSubjects({ courseData, subjects, fecthSubjects }) {
  const navigate = useNavigate();

  async function deleteSubject(id) {
    try {
      const response = await api.delete(`/disciplina/${id}`);
      if (response.status === 204) {
        toast.success("Disciplina deletada com sucesso!");
        fecthSubjects();
      } else {
        toast.error("Erro ao deletar disciplina");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar disciplina");
    }
  }

  return (
    <div className="pt-10">
      <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg overflow-auto">
        {courseData.nome && (
          <>
            <h1 className="text-xl text-gray-700 font-bold">
              {courseData.nome}
            </h1>
            <dl className="grid grid-cols-3 gap-4 mt-5">
              <div className="flex flex-col">
                <dt className="text-sm text-gray-500">Coordenador:</dt>
                <dd className="text-lg font-medium text-primary-800">
                  {courseData.coordenadorDeCurso.nome}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-sm text-gray-500">Turno:</dt>
                <dd className="text-lg font-medium text-primary-800">
                  {courseData.turno}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-sm text-gray-500">Período do Currículo:</dt>
                <dd className="text-lg font-medium text-primary-800">
                  {courseData.periodo_curriculo}
                </dd>
              </div>
            </dl>
            <h3 className="text-lg font-medium mt-16 mb-2">Disciplinas:</h3>
            <hr />
          </>
        )}
        {subjects && subjects.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-900 uppercase bg-gray-5">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Código
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0 ? "bg-white" : "bg-primary-50"
                  } border text-center border-gray-100 hover:bg-primary-100 cursor-pointer`}
                  onClick={() => navigate(`/disciplina/${subject.id}`)}
                >
                  <td className="px-6 py-4">{subject.id}</td>
                  <td className="px-6 py-4">{subject.codigo}</td>
                  <td className="px-6 py-4">{subject.nome}</td>
                  <td className="px-6 py-4 min-w-[64px]">
                    <Button
                      secondary
                      href={`atualizar/disciplina/${subject.id}`}
                    >
                      Editar
                    </Button>
                    <Button onClick={() => deleteSubject(subject.id)}>
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <strong className="text-sm text-primary-600 block p-4">
            Não há disciplinas para este curso ainda.
          </strong>
        )}
      </div>
    </div>
  );
}

export default CourseSubjects;
