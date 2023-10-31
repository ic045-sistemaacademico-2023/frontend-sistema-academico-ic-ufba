import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import Sidebar from "../../componentes/Sidebar";
import SelectField from "../../componentes/Forms/SelectField";
import InputField from "../../componentes/Forms/InputField";
import MultiSelectField from "../../componentes/Forms/MultiSelectField";
import SearchableSelectField from "../../componentes/Forms/SearchableSelectField";
import Button from "../../componentes/Button";
import api from "../../utils/api";

import { diasDeAula, horarios } from "./data";

const schema = yup.object().shape({
  disciplina: yup.number().required("O nome da disciplina é obrigatório"),
  semestre: yup.number().required("O semestre é obrigatório"),
  professor: yup.string().required("O nome do professor é obrigatório"),
  dias: yup
    .array()
    .min(1, "Selecione pelo menos um dia de aula")
    .required("Selecione pelo menos um dia de aula"),
});

const initialValues = {
  disciplina: "",
  semestre: "",
  professor: "",
  dias: [],
};

function RegisterClass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [professores, setProfessores] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);

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
    for (const dia of diasDeAula) {
      const inicio = horarios[`horarioInicio${dia.name}`];
      const fim = horarios[`horarioFim${dia.name}`];

      if (inicio && fim && inicio >= fim) {
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (data) => {
    if (!validateHorarios(data)) {
      toast.error("Horário final deve ser maior que o horário de início");
      return;
    }

    const horarios = [];
    const locais = [];

    diasDeAula.map((dia) => {
      const inicio = data[`horarioInicio${dia.name}`];
      const fim = data[`horarioFim${dia.name}`];
      const local = data[`local${dia.name}`];

      if (inicio && fim && local) {
        horarios.push(`${inicio}-${fim}`);
        locais.push(local);
      }
    });

    diasDeAula.forEach((dia) => {
      delete data[`horarioInicio${dia.name}`];
      delete data[`horarioFim${dia.name}`];
      delete data[`dia${dia.name}`];
      delete data[`local${dia.name}`];
    });

    data.horario = horarios.join("/");
    data.local = locais.join("/");

    try {
      const response = await api.post("/turma/", data);
      if (response.status === 201) {
        toast.success("Turma cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar turma");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar turma");
    }
  };

  const dias = watch("dias", []);

  const [isOptionSelected, setIsOptionSelected] = useState(false);

  useEffect(() => {
    setIsOptionSelected(dias.length > 0);
  }, [dias]);

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-100 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Cadastrar Turma
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SearchableSelectField
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
          <div></div>
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
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
                  Local de aula:
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
                            label=""
                            options={horarios}
                            placeholder="Início"
                            error={errors[`horarioInicio${dia.name}`]?.message}
                          />
                        </div>
                        <div>
                          <SelectField
                            {...register(`horarioFim${dia.name}`)}
                            label=""
                            options={horarios}
                            placeholder="Fim"
                            error={errors[`horarioFim${dia.name}`]?.message}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <InputField
                          {...register(`local${dia.name}`)}
                          placeholder="Código da sala de aula"
                          error={errors[`local${dia.name}`]?.message}
                        />
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
        )}
        <div>
          <Button type="submit">Cadastrar</Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterClass;
