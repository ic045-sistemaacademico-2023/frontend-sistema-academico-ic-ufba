import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import Button from "../../componentes/Button";
import { useNavigate } from "react-router-dom";
import { status } from "../../componentes/UsersTable/data";

export default function EnrollmentRequestPage() {
  const { id } = useParams();
  const requestId = id;

  const [requests, setRequests] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = useCallback(async () => {
    if (!requestId) return;
    try {
      const response = await api.get(
        `/solicitacao-turma/solicitacao-matricula/${requestId}`,
      );
      if (response.status === 200) {
        setClasses([]);
        response.data.map((request) => {
          const { turma } = request;
          turma["status"] = request.status;
          setClasses((classes) => [...classes, turma]);
          turma.dias = turma.dias.split(",");
          turma.horario = turma.horario.split("/");
        });
        setRequests(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [requestId]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const turmasPorDisciplina = classes.reduce((acc, turma) => {
    const { disciplina } = turma;
    if (turma.status === "WAITING_APPROVAL") {
      if (!acc[disciplina.nome]) {
        acc[disciplina.nome] = [];
      }
      acc[disciplina.nome].push(turma);
    }
    if (acc.length === 0) {
      return [];
    }
    return acc;
  }, {});

  const turmasPorDisciplinaFinalizadas = classes.reduce((acc, turma) => {
    const { disciplina } = turma;
    if (turma.status !== "WAITING_APPROVAL") {
      if (!acc[disciplina.nome]) {
        acc[disciplina.nome] = [];
      }
      acc[disciplina.nome].push(turma);
    }
    if (acc.length === 0) {
      return [];
    }
    return acc;
  }, {});

  const approveStudent = async (alunoId, turmaId) => {
    try {
      const response = await api.put(
        `/solicitacao-turma/aprovar/turma/${turmaId}/aluno/${alunoId}`,
      );
      if (response.status === 200) {
        toast.success("Aluno aprovado com sucesso!");
        fetchRequests();
      } else {
        toast.error("Erro ao aprovar aluno");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao aprovar aluno");
    }
  };

  const reproveStudent = async (alunoId, turmaId) => {
    try {
      const response = await api.put(
        `/solicitacao-turma/recusar/turma/${turmaId}/aluno/${alunoId}`,
      );
      if (response.status === 200) {
        toast.success("Aluno reprovado com sucesso!");
        fetchRequests();
      } else {
        toast.error("Erro ao reprovar aluno");
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao reprovar aluno");
    }
  };

  return (
    <div className="w-full pl-64">
      <div className="flex flex-col z-10 gap-2 p-5">
        <div className="bg-primary-100 shadow-lg rounded-lg flex flex-col p-5">
          <h1 className="text-xl text-gray-700 font-bold mb-6">
            Solicitação de Matrícula
          </h1>
          <dl className="grid grid-cols-3 gap-4 mt-5">
            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">Nome:</dt>
              <dd className="text-lg font-medium text-primary-800">
                {requests[0]?.aluno?.nome}
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">CPF:</dt>
              <dd className="text-lg font-medium text-primary-800">
                {requests[0]?.aluno?.usuario.cpf}
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">Curso:</dt>
              <dd className="text-lg font-medium text-primary-800">
                {requests[0]?.aluno?.curso.nome}
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">Período de Ingresso:</dt>
              <dd className="text-lg font-medium text-primary-800">
                {requests[0]?.aluno?.periodo_ingresso}
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">Ano do Currículo:</dt>
              <dd className="text-lg font-medium text-primary-800">
                {requests[0]?.aluno?.curso.periodo_curriculo}
              </dd>
            </div>

            <div className="flex flex-col">
              <dt className="text-sm text-gray-500">
                Coeficiente de Rendimento (CR):
              </dt>
              <dd className="text-lg font-medium text-primary-800">
                {requests[0]?.aluno?.cr}
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6 p-5 bg-primary-100 mt-4 rounded-lg">
          <h2 className="text-lg font-bold text-center">Turmas</h2>
          <table className="w-full text-sm text-center  text-gray-700">
            <thead className="text-xs text-gray-900 uppercase bg-gray-5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Turmas
                </th>
                <th scope="col" className="px-6 py-3">
                  Professor
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
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            {requests?.length === 0 && (
              <tbody>
                <tr className="bg-white border border-gray-100 hover:bg-primary-100">
                  <td
                    colSpan="5"
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                  >
                    Nenhuma turma disponível
                  </td>
                </tr>
              </tbody>
            )}
            <tbody>
              {Object.keys(turmasPorDisciplina).map((nomeDisciplina, index) => (
                <Fragment key={index}>
                  <tr>
                    <td
                      className={`py-2 px-3 whitespace-nowrap text-clip bg-slate-200 font-medium`}
                    >
                      {nomeDisciplina}
                    </td>
                  </tr>
                  {turmasPorDisciplina[nomeDisciplina].map((turma, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                      } border border-gray-100 hover:bg-primary-100 h-full`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap max-w-[10rem] truncate">
                        {turma.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {turma.professor.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {turma.dias.map((dia, index) => (
                          <div key={index}>{dia}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {turma.horario.map((horario, index) => (
                          <div key={index}>{horario}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {turma.sala}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {status[turma.status].split(" ").map((word) => (
                          <div key={word}>{word}</div>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap justify-center items-center gap-2">
                          <Button
                            onClick={() =>
                              approveStudent(requests[0]?.aluno?.id, turma.id)
                            }
                          >
                            Aprovar
                          </Button>
                          <Button
                            onClick={() =>
                              reproveStudent(requests[0]?.aluno?.id, turma.id)
                            }
                            secondary
                          >
                            Reprovar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6 p-5 bg-primary-100 mt-4 rounded-lg">
          <h2 className="text-lg font-bold text-center">Resultado</h2>
          <table className="w-full text-sm text-center  text-gray-700">
            <thead className="text-xs text-gray-900 uppercase bg-gray-5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Turmas
                </th>
                <th scope="col" className="px-6 py-3">
                  Professor
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
                  Status
                </th>
              </tr>
            </thead>
            {Object.keys(turmasPorDisciplinaFinalizadas).length === 0 && (
              <tbody>
                <tr className="bg-white border border-gray-100 hover:bg-primary-100">
                  <td
                    colSpan="6"
                    className="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap"
                  >
                    Nenhuma turma finalizada
                  </td>
                </tr>
              </tbody>
            )}
            <tbody>
              {Object.keys(turmasPorDisciplinaFinalizadas).map(
                (nomeDisciplina, index) => (
                  <Fragment key={index}>
                    <tr>
                      <td
                        className={`py-2 px-3 whitespace-nowrap text-clip bg-slate-200 font-medium`}
                      >
                        {nomeDisciplina}
                      </td>
                    </tr>
                    {turmasPorDisciplinaFinalizadas[nomeDisciplina].map(
                      (turma, idx) => (
                        <tr
                          key={idx}
                          className={`${
                            idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                          } border border-gray-100 hover:bg-primary-100 h-full`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap max-w-[10rem] truncate">
                            {turma.code}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {turma.professor.nome}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {turma.dias.map((dia, index) => (
                              <div key={index}>{dia}</div>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {turma.horario.map((horario, index) => (
                              <div key={index}>{horario}</div>
                            ))}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {turma.sala}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {status[turma.status].split(" ").map((word) => (
                              <div key={word}>{word}</div>
                            ))}
                          </td>
                        </tr>
                      ),
                    )}
                  </Fragment>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-primary-100 p-5 z-10 m-5 shadow-lg rounded-lg">
        <h2 className="text-lg font-bold text-center">Legendas</h2>
        <table className="w-full text-sm text-center text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Legenda
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
              <td className="px-6 py-4">Aguardando Aprovação</td>
              <td className="px-6 py-4">
                O aluno realizou a solicitação de matrícula e está aguardando o
                resultado.
              </td>
            </tr>
            <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
              <td className="px-6 py-4">Aprovado</td>
              <td className="px-6 py-4">
                A solicitão de matrícula do aluno foi aceita pela coordenação.
              </td>
            </tr>
            <tr className="bg-gray-50 border border-gray-100 hover:bg-primary-100 whitespace-nowrap text-sm text-gray-900">
              <td className="px-6 py-4">Reprovado</td>
              <td className="px-6 py-4">
                A solicitação de matrícula do aluno foi negada pela coordenação.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <Button onClick={() => navigate("/solicitacoes")}>Voltar</Button>
      </div>
    </div>
  );
}
