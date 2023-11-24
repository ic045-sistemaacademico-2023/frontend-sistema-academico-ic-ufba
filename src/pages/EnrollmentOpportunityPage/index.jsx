import Sidebar from "../../componentes/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Button from "../../componentes/Button";
import { formatDateDayMonthYear } from "../../utils/dateFormater";

export default function EnrollmentOpportunityPage() {
  const { id } = useParams();

  const [opportunitySubjectClasses, setOpportunitySubjectClasses] = useState(
    [],
  );
  const [opportunityData, setOpportunityData] = useState({});

  async function fetchOpportunityData() {
    try {
      const response = await api.get(`/oportunidade/${id}`);
      if (response.status === 200) {
        const opportunity = {
          nome: response.data.oportunidadeMatricula.nome,
          id: response.data.oportunidadeMatricula.id,
          coordenadorDeCurso: response.data.oportunidadeMatricula.coordenador,
          dataInicial: response.data.oportunidadeMatricula.dataInicial,
          dataFinal: response.data.oportunidadeMatricula.dataFinal,
          aberta: response.data.oportunidadeMatricula.aberta,
        };
        setOpportunityData(opportunity);
        setOpportunitySubjectClasses(response.data.disciplinaTurmas);
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao carregar dados da oportunidade de matrícula");
    }
  }

  useEffect(() => {
    const getOpportunityData = async () => {
      await fetchOpportunityData();
    };

    getOpportunityData();
  }, [id]);

  const navigate = useNavigate();

  async function deleteSubjectClass(idOpportunity, idSubject, idClass) {
    try {
      const response = await api.put(
        `/oportunidade/removeturma/${idOpportunity}/${idSubject}/${idClass}`,
      );
      if (response.status === 204) {
        toast.success("Turma deletada com sucesso!");
        await fetchOpportunityData();
      } else {
        toast.error("Erro ao deletar turma");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar turma");
    }
  }

  return (
    <div className="w-full pl-64">
      <Sidebar />

      <div className="pt-10">
        <div className="bg-primary-50 p-5 z-10 m-5 shadow-lg rounded-lg overflow-auto">
          {opportunityData.nome && (
            <>
              <h1 className="text-xl text-gray-700 font-bold">
                {opportunityData.nome}
              </h1>
              <dl className="grid grid-cols-4 gap-4 mt-5">
                <div className="flex flex-col">
                  <dt className="text-sm text-gray-500">Coordenador:</dt>
                  <dd className="text-lg font-medium text-primary-800">
                    {opportunityData.coordenadorDeCurso.nome}
                  </dd>
                </div>

                <div className="flex flex-col">
                  <dt className="text-sm text-gray-500">Situação:</dt>
                  <dd className="text-lg font-medium text-primary-800">
                    {opportunityData.aberta ? "Aberta" : "Fechada"}
                  </dd>
                </div>

                <div className="flex flex-col">
                  <dt className="text-sm text-gray-500">Data Inicial:</dt>
                  <dd className="text-lg font-medium text-primary-800">
                    {formatDateDayMonthYear(opportunityData.dataInicial)}
                  </dd>
                </div>

                <div className="flex flex-col">
                  <dt className="text-sm text-gray-500">Data Final:</dt>
                  <dd className="text-lg font-medium text-primary-800">
                    {formatDateDayMonthYear(opportunityData.dataFinal)}
                  </dd>
                </div>
              </dl>
              <h3 className="text-lg font-medium mt-16 mb-2">Disciplinas:</h3>
              <hr />
            </>
          )}
          {opportunitySubjectClasses && opportunitySubjectClasses.length > 0 ? (
            <>
              {opportunitySubjectClasses.map((subjectClasses) => (
                <>
                  <h2 className="text-lg text-gray-700 font-bold mt-10">
                    {`${subjectClasses.disciplina.nome} - ${subjectClasses.disciplina.codigo} / ${subjectClasses.disciplina.area}`}
                  </h2>
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-5">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                          Código
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Professor
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Local
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Dias/Horário
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectClasses.turmas.map((subjectClass, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 == 0 ? "bg-white" : "bg-primary-50"
                          } border text-center border-gray-100 hover:bg-primary-100 h-full`}
                        >
                          <td className="px-6 py-4 h-full">
                            {subjectClass.code}
                          </td>
                          <td className="px-6 py-4 h-full">
                            {subjectClass.professor.nome}
                          </td>
                          <td className="px-6 py-4 h-full">
                            {subjectClass.local}
                          </td>
                          <td className="px-6 py-4 h-full">{`${subjectClass.dias} / ${subjectClass.horario}`}</td>
                          <td className="px-6 py-4 h-full">
                            <div className="flex flex-wrap justify-center items-center gap-2">
                              <Button
                                onClick={() =>
                                  navigate(`/turma/${subjectClass.id}`)
                                }
                              >
                                Visualizar
                              </Button>
                              <Button
                                onClick={() =>
                                  deleteSubjectClass(
                                    opportunityData.id,
                                    subjectClasses.disciplina.id,
                                    subjectClass.id,
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
                </>
              ))}
            </>
          ) : (
            <strong className="text-sm text-primary-600 block p-4">
              Não há disciplinas para esta oportunidade.
            </strong>
          )}
        </div>
      </div>

      <div className="py-4 mb-4">
        <Button href={`/oportunidades`} secondary>
          Voltar
        </Button>
      </div>
    </div>
  );
}
