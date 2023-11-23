import { useNavigate } from "react-router-dom";
import Button from "../Button";
import api from "../../utils/api";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

function CourseClasses({ courseClasses, fetchClasses, entity }) {
  const { token } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  const USER_ROLE = user?.role;

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
      {entity} sem turmas cadastradas para o período atual
    </strong>
  ) : (
    <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-primary-700">
        Lista de turmas - Semestre {currentYear}.{currentPeriod}
      </h2>
      <table className="w-full text-sm text-center text-gray-700 mt-10">
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
              Sala
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
              } border border-gray-100 hover:bg-primary-100 h-full`}
            >
              <th
                scope="row"
                className="px-6 py-4 h-full font-medium text-gray-900 whitespace-nowrap"
              >
                {classItem.id}
              </th>
              <td className="px-6 py-4 h-full">
                {classItem.dias.split(",").map((dia, index) => (
                  <div key={index}>{dia}</div>
                ))}
              </td>
              <td className="px-6 py-4 h-full">
                {classItem.horario.split("/").map((horario, index) => (
                  <div key={index}>{horario}</div>
                ))}
              </td>
              <td className="px-6 py-4 h-full">{classItem.sala}</td>
              <td className="px-6 py-4 h-full">{classItem.professor}</td>
              <td className="px-2 py-2 h-full">
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <Button onClick={() => navigate(`/turma/${classItem.id}`)}>
                    Visualizar
                  </Button>
                  {["ADMIN", "COORDENADOR_DE_CURSO", "PROFESSOR"].includes(
                    USER_ROLE,
                  ) && (
                    <>
                      <Button
                        secondary
                        href={`/atualizar/turma/${classItem.id}`}
                      >
                        Editar
                      </Button>
                      <Button onClick={() => deleteClass(classItem.id)}>
                        Deletar
                      </Button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseClasses;
