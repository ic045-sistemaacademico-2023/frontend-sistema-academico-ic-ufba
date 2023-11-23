import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import SelectField from "../../componentes/Forms/SelectField";
import InputField from "../../componentes/Forms/InputField";
import MultiSelectField from "../../componentes/Forms/MultiSelectField";
import Button from "../../componentes/Button";
import api from "../../utils/api";

import { diasDeAula, formatDia, horarios, inverseFormatDia } from "./data";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  disciplina: yup.number().required("A disciplina é obrigatória"),
  semestre: yup.number().required("O semestre é obrigatório"),
  professor: yup.string().required("O nome do professor é obrigatório"),
  dias: yup
    .array()
    .min(1, "Selecione pelo menos um dia de aula")
    .required("Selecione pelo menos um dia de aula"),
  sala: yup.string().required("A sala é obrigatória"),
});

const initialValues = {
  disciplina: "",
  semestre: "",
  professor: "",
  dias: [],
  sala: "",
};

function RegisterClass() {
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

  const { id } = useParams();
  const isEditing = id !== undefined;

  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    async function getSalas() {
      try {
        const response = await api.get("/turma/salas");
        if (response.status === 200) {
          const salas = response.data.map((sala) => {
            return {
              id: sala,
              value: sala,
              name: sala,
            };
          });
          setSalas(salas);
        } else {
          toast.error("Erro ao carregar salas");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar salas");
      }
    }
    getSalas();
  }, []);

  useEffect(() => {
    async function getProfessores() {
      try {
        const response = await api.get("/professor/all");
        if (response.status === 200) {
          const professores = response.data.map((professor) => {
            return {
              id: professor.id,
              value: professor.id,
              name: professor.nome,
            };
          });

          setProfessores(professores);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar professores");
      }
    }
    getProfessores();
  }, []);

  useEffect(() => {
    async function getDisciplinas() {
      try {
        const response = await api.get("/disciplina/all");
        if (response.status === 200) {
          const disciplinas = response.data.map((disciplina) => {
            return {
              id: disciplina.id,
              value: disciplina.id,
              name: disciplina.nome,
            };
          });

          setDisciplinas(disciplinas);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar disciplinas");
      }
    }
    getDisciplinas();
  }, []);

  const validateHorarios = (horarios) => {
    const dias = watch("dias");

    for (const dia of dias) {
      const formattedDia = formatDia[dia];
      const inicio = horarios[`horarioInicio${formattedDia}`];
      const fim = horarios[`horarioFim${formattedDia}`];

      if (inicio && fim && inicio >= fim) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (isEditing) {
      const fetchTurmaData = async () => {
        try {
          const response = await api.get(`/turma/${id}`);
          if (response.status === 200) {
            const turmaData = response.data;

            const disciplina = disciplinas.find(
              (disciplina) => disciplina.id === turmaData.disciplina.id,
            );

            setValue("disciplina", disciplina?.id);
            setValue("semestre", turmaData.semestre);
            setValue("professor", turmaData.professor.id);

            const dias = turmaData.dias.split(",").map((dia) => {
              return inverseFormatDia[dia];
            });

            setValue("dias", dias);

            const horarios = turmaData.horario.split("/");

            dias.forEach((dia, index) => {
              const formattedDia = formatDia[dia];

              const [inicio, fim] = horarios[index].split("-");
              setValue(`horarioInicio${formattedDia}`, inicio);
              setValue(`horarioFim${formattedDia}`, fim);
            });
          } else {
            toast.error("Erro ao carregar dados da turma");
          }
        } catch (error) {
          console.error(error);
          toast.error("Erro ao carregar dados da turma");
        }
      };
      fetchTurmaData();
    }
  }, [isEditing, id, setValue, disciplinas]);

  const onSubmit = async (data) => {
    if (!validateHorarios(data)) {
      toast.error("Horário final deve ser maior que o horário de início");
      return;
    }

    const horarios = [];

    diasDeAula.map((dia) => {
      const inicio = data[`horarioInicio${dia.name}`];
      const fim = data[`horarioFim${dia.name}`];

      if (inicio && fim) {
        horarios.push(`${inicio}-${fim}`);
      }
    });

    diasDeAula.forEach((dia) => {
      delete data[`horarioInicio${dia.name}`];
      delete data[`horarioFim${dia.name}`];
      delete data[`dia${dia.name}`];
    });

    data.horario = horarios.join("/");

    if (isEditing) {
      try {
        const response = await api.put(`/turma/${id}`, data);
        if (response.status === 200) {
          toast.success("Turma atualizada com sucesso!");
        } else {
          toast.error("Erro ao atualizar turma");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao atualizar turma");
      }
    } else {
      try {
        const response = await api.post("/turma/", data);
        if (response.status === 201) {
          toast.success("Turma cadastrada com sucesso!");
        } else {
          toast.error("Erro ao cadastrar turma");
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro ao cadastrar turma");
      }
    }
  };

  const dias = watch("dias", []);

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    setIsOptionSelected(dias.length > 0);
  }, [dias]);

  return (
    <div className="w-full pl-64">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-100 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          {isEditing ? "Editar" : "Cadastrar"} Turma {isEditing && `#${id}`}
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectField
            {...register("disciplina")}
            label={"Disciplina"}
            options={disciplinas}
            placeholder={"Selecione a disciplina ou digite para filtrar"}
            error={errors.componenteCurricular?.message}
          />
          <InputField
            {...register("semestre")}
            placeholder="Digite o semestre"
            label="Semestre"
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectField
            {...register("professor")}
            label={"Professor"}
            options={professores}
            placeholder={"Selecione o professor"}
            error={errors.professor?.message}
          />
          <SelectField
            {...register("sala")}
            label={"Sala"}
            options={salas}
            placeholder={"Selecione a sala"}
            error={errors.sala?.message}
          />
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <MultiSelectField
            {...register("dias")}
            label={"Dias de aula"}
            options={diasDeAula}
            placeholder={"Selecione o dia"}
            error={errors.dias?.message}
          />
        </div>

        {isOptionSelected && (
          <div className="mt-2">
            <div className="grid md:grid-cols-3 md:gap-6">
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
                  Dia:
                </p>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
                  Horários de início e final da aula:
                </p>
              </div>
            </div>
            {diasDeAula.map(
              (dia) =>
                dias.includes(dia.value) && (
                  <div className="grid md:grid-cols-3 md:gap-6" key={dia.value}>
                    <div>
                      <InputField
                        {...register(`dia${dia.name}`)}
                        value={dia.label}
                        disabled={true}
                      />
                    </div>
                    <div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div>
                          <SelectField
                            {...register(`horarioInicio${dia.name}`)}
                            options={horarios}
                            placeholder="Início"
                            error={errors[`horarioInicio${dia.name}`]?.message}
                          />
                        </div>
                        <div>
                          <SelectField
                            {...register(`horarioFim${dia.name}`)}
                            options={horarios}
                            placeholder="Fim"
                            error={errors[`horarioFim${dia.name}`]?.message}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
        <div>
          <Button type="submit">{isEditing ? "Editar" : "Cadastrar"}</Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterClass;
