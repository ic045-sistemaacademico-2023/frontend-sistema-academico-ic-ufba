import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../../componentes/Forms/TextField";
import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";
import { status } from "./data";
import { formatDateYearMonthDay } from "../../utils/dateFormater";

const schema = yup.object().shape({
  nome: yup.string().required("O nome da oportunidade é obrigatório"),
  aberta: yup.string().required("O status da oportunidade é obrigatório"),
  descricao: yup.string().required("A descrição da oportunidade é obrigatório"),
  dataInicial: yup
    .date()
    .required("A data inicial da oportunidade é obrigatório"),
  dataFinal: yup.date().required("A data final da oportunidade é obrigatório"),
});

const initialValues = {
  nome: "",
  aberta: "",
  descricao: "",
  dataInicial: "",
  dataFinal: "",
};

function RegisterEnrollmentOpportunity() {
  const { id } = useParams();
  const isEditing = id !== undefined;
  const navigate = useNavigate();
  const { token } = useAuth();

  const [turmas, setTurmas] = useState([]);
  const [coordenador, setCoordenador] = useState();
  const [curso, setCurso] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        let response = await api.get("/user/me");

        if (response.status === 200) {
          let userId = response.data.id;
          const coordenadorResponse = await api.get(
            `/coordenador/byusuario/${userId}`,
          );
          if (response.status === 200){
            setCoordenador(coordenadorResponse.data);
            response = await api.get(`/curso/bycoordenador/${coordenadorResponse.data.id}`);
            if(response.status === 200) setCurso(response.data);
          }
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

  useEffect(() => {
    async function getDisciplinas() {
      try {

        let turmasRoute = "/turma/all";
        if(curso != null){
          turmasRoute = `/turma/all/bycurso/${curso.id}`;
        }

        const response = await api.get(turmasRoute);
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
        console.error(error);
        toast.error("Erro ao carregar disciplinas");
      }
    }

    getDisciplinas();
  }, [curso]);

  useEffect(() => {
    const getEnrollmentOportunity = async () => {
      try {
        const response = await api.get(`oportunidade/${id}`);
        if (response.status === 200) {
          setValue("nome", response.data.oportunidadeMatricula.nome);
          const aberta =
            response.data.oportunidadeMatricula.aberta === true
              ? "ABERTA"
              : "FECHADA";
          setValue("aberta", aberta);
          setValue("descricao", response.data.oportunidadeMatricula.descricao);
          setValue(
            "dataInicial",
            formatDateYearMonthDay(
              response.data.oportunidadeMatricula.dataInicial,
            ),
          );
          setValue(
            "dataFinal",
            formatDateYearMonthDay(
              response.data.oportunidadeMatricula.dataFinal,
            ),
          );

          if (response.data.disciplinaTurmas.length > 0) {
            response.data.disciplinaTurmas.map((subjectClasses) => {
              subjectClasses.turmas.map((subject) => {
                setValue(`turma${subject.id}`, true);
              });
            });
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados da oportunidade");
      }
    };

    if (isEditing) {
      getEnrollmentOportunity();
    }
  }, [isEditing, id, setValue, watch]);

  const turmasPorDisciplina = turmas.reduce((acc, turma) => {
    const { disciplina } = turma;
    if (!acc[disciplina.nome]) {
      acc[disciplina.nome] = [];
    }
    acc[disciplina.nome].push(turma);
    return acc;
  }, {});

  const parseDateToTimeStamp = (date) => {
    const globalTime = new Date(date);
    return `${globalTime.getFullYear()}-${String(
      globalTime.getMonth() + 1,
    ).padStart(2, "0")}-${String(globalTime.getDate()).padStart(
      2,
      "0",
    )} ${String(globalTime.getHours()).padStart(2, "0")}:${String(
      globalTime.getMinutes(),
    ).padStart(2, "0")}:${String(globalTime.getSeconds()).padStart(2, "0")}`;
  };

  const onSubmit = async (data) => {
    data.aberta === "ABERTA" ? (data.aberta = true) : (data.aberta = false);
    data.dataInicial = parseDateToTimeStamp(data.dataInicial);
    data.dataFinal = parseDateToTimeStamp(data.dataFinal);

    let disciplinaTurmas = [];
    let tmp = {};

    turmas.map((turma) => {
      if (data[`turma${turma.id}`]) {
        const { disciplina } = turma;
        if (!tmp[disciplina.id]) {
          tmp[disciplina.id] = [];
        }
        tmp[disciplina.id].push(turma.id);
      }
    });

    Object.keys(tmp).map((disciplinaId) => {
      disciplinaTurmas.push({
        disciplina: disciplinaId,
        turmas: tmp[disciplinaId],
      });
    });

    turmas.forEach((turma) => {
      delete data[`turma${turma.id}`];
    });

    data.disciplinaTurmas = disciplinaTurmas;
    data.coordenador = coordenador.id;

    console.log(data);

    if (isEditing) {
      try {
        const response = await api.put(`oportunidade/${id}`, data);
        if (response.status === 200) {
          toast.success("Oportunidade editada com sucesso!");
          navigate(`/oportunidades`);
        } else {
          toast.error(
            "Error ao editar oportunidade. Verifique se já não existe outra oportunidade em aberto para o mesmo curso.",
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Error ao editar Oportunidade. Verifique se já não existe outra oportunidade em aberto para o mesmo curso.",
        );
      }
    } else {
      try {
        const response = await api.post(`oportunidade/`, data);
        if (response.status === 201) {
          console.log(response.data);
          toast.success("Oportunidade cadastrada com sucesso!");
          navigate(`/oportunidades`);
        } else {
          toast.error(
            "Error ao cadastrar Oportunidade. Verifique se já não existe outra oportunidade em aberto para o mesmo curso.",
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(
          "Error ao cadastrar Oportunidade. Verifique se já não existe outra oportunidade em aberto para o mesmo curso.",
        );
      }
    }
  };

  return (
    <div className="w-full pl-64">
      <form onSubmit={handleSubmit(onSubmit)} className="z-10 m-6">
        <div className="bg-primary-100 shadow-lg rounded-lg flex flex-col p-5">
          <h1 className="text-xl text-gray-700 font-bold mb-6">
            {isEditing ? "Editar" : "Cadastrar"} Oportunidade de Matrícula
          </h1>
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputField
              {...register("nome")}
              label={"Nome"}
              type={"text"}
              placeholder={"Nome da Oportunidade"}
              error={errors.nome?.message}
            />
            <SelectField
              {...register("aberta")}
              label={"Status"}
              options={status}
              placeholder={"Selecione o status"}
              error={errors.professor?.message}
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <InputField
              {...register("dataInicial")}
              label={"Data Inicial"}
              type={"date"}
              placeholder={"Data de início"}
              error={errors.nome?.message}
            />
            <InputField
              {...register("dataFinal")}
              label={"Data Final"}
              type={"date"}
              placeholder={"Data de fim"}
              error={errors.nome?.message}
            />
          </div>

          <div className="grid md:grid-cols-1 md:gap-6">
            <TextField
              {...register("descricao")}
              label={"Descrição"}
              type={"text"}
              placeholder={"Descrição da oportunidade de matrícula..."}
              error={errors.ementa?.message}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6 p-5 bg-primary-100 mt-4 rounded-lg">
          <h2 className="text-lg font-bold text-center">Turmas</h2>
          <table className="w-full text-sm text-center  text-gray-700">
            <thead className="text-xs text-gray-900 uppercase bg-gray-5">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Disciplina
                </th>
                <th></th>
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
                      <td></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label
                          className="relative flex items-centerrounded-md cursor-pointer"
                          htmlFor={`checkbox${turma.id}`}
                          data-ripple-dark="true"
                        >
                          <input
                            type="checkbox"
                            name="classes"
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
        </div>
        <div>
          <Button className="mb-6 mt-6" type="submit">
            {isEditing ? "Editar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterEnrollmentOpportunity;
