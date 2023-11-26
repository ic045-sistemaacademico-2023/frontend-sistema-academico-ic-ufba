import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Button from "../../componentes/Button";
import { diasData } from "./data";
import { Fragment, useEffect, useState } from "react";
import api from "../../utils/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  turmas: yup.array(),
});

const initialValues = {
  turmas: [],
};

export default function RequestEnrollment() {
  const [dias, setDias] = useState(diasData);
  const { handleSubmit, register } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const clearDias = () => {
    const diasClear = dias;
    Object.values(diasClear).forEach((dia) => {
      for (let i = 0; i < 22; i++) {
        dia[i] = false;
      }
    });
    setDias(diasClear);
  };

  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        }
      }
    };

    fetchUser();
  }, [token]);

  const userId = user?.id;

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (!userId) return;
        const response = await api.get(`/aluno/${userId}`);
        setStudent(response.data);
      } catch (error) {
        console.log(error);
        toast.error(`Error ao carregar o aluno`);
      }
    };
    fetchStudent();
  }, [userId]);

  const coordenadorId = student?.curso.coordenadorDeCurso.id;

  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const fetchTurmas = async () => {
      if (!coordenadorId) return;
      try {
        const response = await api.get(
          `/turma/disponiveis/coordenador/${coordenadorId}`,
        );
        if (response.status === 200) {
          response.data.map((turma) => {
            turma.dias = turma.dias.split(",");
            turma.horario = turma.horario.split("/");
          });
          setTurmas(response.data);
        } else {
          toast.error("Erro ao obter turmas");
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao obter turmas");
      }
    };
    fetchTurmas();
  }, [coordenadorId]);

  const turmasPorDisciplina = turmas.reduce((acc, turma) => {
    const { disciplina } = turma;
    if (!acc[disciplina.nome]) {
      acc[disciplina.nome] = [];
    }
    acc[disciplina.nome].push(turma);
    return acc;
  }, {});

  const onSubmit = async (data) => {
    const turmasSelectionadas = [];

    let error = false;

    let disciplinas = [];

    turmas.forEach((turma) => {
      if (data[`turma${turma.id}`]) {
        if (disciplinas.includes(turma.disciplina.id)) {
          toast.error(
            "Você não pode solicitar matrícula em mais de uma turma da mesma disciplina",
          );
          error = true;
          return;
        }
        disciplinas.push(turma.disciplina.id);
      }
    });

    const diasModificados = dias;
    turmas.forEach((turma) => {
      if (data[`turma${turma.id}`]) {
        turmasSelectionadas.push(turma.id);
        turma.dias.map((dia, index) => {
          const horario = turma.horario[index];
          const horarioInicio = parseInt(horario.split("-")[0].split(":")[0]);
          const horarioFim = parseInt(horario.split("-")[1].split(":")[0]);

          for (let i = horarioInicio; i < horarioFim; i++) {
            if (dias[dia][i]) {
              toast.error(`Conflito de horário na turma ${turma.code}`);
              error = true;
              return;
            }

            diasModificados[dia][i] = true;
          }
        });
      }
    });

    setDias(diasModificados);
    clearDias();

    if (error) return;

    turmas.forEach((turma) => {
      delete data[`turma${turma.id}`];
    });

    data.turmas = turmasSelectionadas;
    data.aluno = student.id;

    if (data.turmas.length === 0) {
      toast.error("Selecione pelo menos uma turma");
      return;
    }

    try {
      const response = await api.post("/solicitacao-matricula", data);
      if (response.status === 200) {
        toast.success("Solicitação de matrícula enviada com sucesso!");
        navigate("/comprovante-matricula");
      } else {
        console.log(data);
        toast.error(
          "Erro ao solicitar matrícula. Verifique se já não há outra solicitação em aberto.",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Erro ao solicitar matrícula. Verifique se já não há outra solicitação em aberto.",
      );
      navigate("/comprovante-matricula");
    }
  };

  return (
    <div className="w-full pl-64">
      <div className="bg-primary-100 p-5 m-10 flex flex-col rounded-lg items-center">
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Solicitar Matrícula
        </h1>
        <p>Escolha as turmas que deseja solicitar matrícula</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 z-10 rounded-lg m-10 flex flex-col bg-primary-100"
      >
        <div className="p-5 flex justify-between">
          <h2 className="text-primary-900 text-xl font-bold ">
            Turmas disponíveis
          </h2>
          <div>
            <Button type="submit">Solicitar Matrícula</Button>
          </div>
        </div>
        <table className="w-full text-sm text-center  text-gray-700">
          <thead className="text-xs text-gray-900 uppercase bg-gray-5">
            <tr>
              <th scope="col" className="px-6 py-3">
                Disciplina
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Turma
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
            </tr>
          </thead>
          {turmas?.length === 0 && (
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
                <tr className="bg-gray-50 border border-gray-100 hover:bg-slate-200">
                  <td
                    className={` py-2 whitespace-nowrap text-clip font-medium bg-slate-200`}
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
                    <td></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label
                        className="relative flex items-centerrounded-md cursor-pointer"
                        htmlFor={`checkbox${turma.id}`}
                        data-ripple-dark="true"
                      >
                        <input
                          type="checkbox"
                          name="turmas"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 checked:border-primary-400 checked:bg-primary-400 checked:before:bg-primary-400 hover:before:opacity-10"
                          id={`checkbox${turma.id}`}
                          {...register(`turma${turma.id}`)}
                        />
                        <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-[0.65rem]  -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </label>
                    </td>
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
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}
