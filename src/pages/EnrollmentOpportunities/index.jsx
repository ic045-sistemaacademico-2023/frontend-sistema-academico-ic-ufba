import { useCallback, useEffect, useState } from "react";
import Sidebar from "../../componentes/Sidebar";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function EnrollmentOpportunities() {
  const [enrollmentOpportunities, setEnrollmentOpportunies] = useState([]);
  const { token } = useAuth();
  const [coordenador, setCoordenador] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          let userId = response.data.id;
          const coordenadorResponse = await api.get(
            `/coordenador/byusuario/${userId}`,
          );
          if (response.status === 200) setCoordenador(coordenadorResponse.data);
          else console.log("Erro ao obter coordenador");
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  const fetchEnrollmentOpportunies = useCallback(async () => {
    if (!coordenador.id) return;
    try {
      const response = await api.get(
        `/oportunidade/bycoordenadorid/${coordenador.id}`,
      );
      setEnrollmentOpportunies(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error ao carregar oportunidades de matrícula");
    }
  }, [coordenador.id]);

  useEffect(() => {
    fetchEnrollmentOpportunies();
  }, [fetchEnrollmentOpportunies]);

  async function deleteEnrollmentOpportunity(id) {
    try {
      const response = await api.delete(`/oportunidade/${id}`);
      if (response.status === 204) {
        toast.success("Oportunidade de matrícula deletada com sucesso!");
        fetchEnrollmentOpportunies();
      } else {
        toast.error("Erro ao deletar oportundiade de matrícula");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar oportundiade de matrícula");
    }
  }

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <h2 className="text-xl text-gray-700 font-bold mt-4">
        Oportunidades de Matrícula
      </h2>
      <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <table className="w-full text-sm text-center text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Coordenador
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Situação
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {enrollmentOpportunities.map((oportunidade, oportunidadeIndex) => (
              <tr
                key={oportunidade.oportunidadeMatricula.id}
                className={`${
                  oportunidadeIndex % 2 == 0 ? "bg-gray-50" : "bg-gray-100"
                } border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900`}
              >
                <td className="px-6 py-4">
                  {oportunidade.oportunidadeMatricula.id}
                </td>
                <td className="px-6 py-4">
                  {oportunidade.oportunidadeMatricula.nome}
                </td>
                <td className="px-6 py-4">
                  {oportunidade.oportunidadeMatricula.coordenador?.nome}
                </td>
                <td className="px-6 py-4 text-center">
                  {oportunidade.oportunidadeMatricula.aberta
                    ? "Aberta"
                    : "Fechada"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    <Button
                      onClick={() =>
                        navigate(
                          `/oportunidade/${oportunidade.oportunidadeMatricula.id}`,
                        )
                      }
                    >
                      Visualizar
                    </Button>

                    <Button
                      secondary
                      href={`/atualizar/oportunidade/${oportunidade.oportunidadeMatricula.id}`}
                    >
                      Editar
                    </Button>

                    <Button
                      onClick={() =>
                        deleteEnrollmentOpportunity(
                          oportunidade.oportunidadeMatricula.id,
                        )
                      }
                    >
                      Deletar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
