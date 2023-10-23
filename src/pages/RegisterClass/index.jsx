import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../../componentes/Sidebar";
import SelectField from "../../componentes/Forms/SelectField";
import InputField from "../../componentes/Forms/InputField";
import MultiSelectField from "../../componentes/Forms/MultiSelectField";
import SearchableSelectField from "../../componentes/Forms/SearchableSelectField";
import Button from "../../componentes/Button";
import api from "../../utils/api";

import { disciplinas, professores, diasDeAula, horarios } from "./data";

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
  horarioInicio1: "",
  horarioFim1: "",
  local1: "",
  horarioInicio2: "",
  horarioFim2: "",
  local2: "",
  horarioInicio3: "",
  horarioFim3: "",
  local3: "",
  horarioInicio4: "",
  horarioFim4: "",
  local4: "",
  horarioInicio5: "",
  horarioFim5: "",
  local5: "",
  horarioInicio6: "",
  horarioFim6: "",
  local6: "",
  horarioInicio7: "",
  horarioFim7: "",
  local7: "",
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

  function refatorarDados(data) {
    const horariosString = [];
    for (let i = 0; i < data.horarios.length; i += 2) {
      const inicio = data.horarios[i];
      const fim = data.horarios[i + 1];
      horariosString.push(`${inicio}-${fim}`);
    }
    const horariosFinal = horariosString.join("/");

    const locaisString = data.locais.join("/");

    return {
      ...data,
      horario: horariosFinal,
      local: locaisString,
    };
  }

  const onSubmit = async (data) => {
    const horarios = [
      data.horarioInicio1,
      data.horarioFim1,
      data.horarioInicio2,
      data.horarioFim2,
      data.horarioInicio3,
      data.horarioFim3,
      data.horarioInicio4,
      data.horarioFim4,
      data.horarioInicio5,
      data.horarioFim5,
      data.horarioInicio6,
      data.horarioFim6,
      data.horarioInicio7,
      data.horarioFim7,
    ];

    const locais = [
      data.local1,
      data.local2,
      data.local3,
      data.local4,
      data.local5,
      data.local6,
      data.local7,
    ];

    const horariosFiltrados = horarios.filter(
      (horario) => horario !== "" && horario !== "0",
    );
    const locaisFiltrados = locais.filter(
      (local) => local !== "" && local !== "0",
    );

    data.horarios = horariosFiltrados;
    data.locais = locaisFiltrados;

    for (let i = 1; i <= 7; i++) {
      delete data["horarioInicio" + i];
      delete data["horarioFim" + i];
      delete data["dia" + i];
    }
    for (let i = 1; i <= 7; i++) {
      delete data["local" + i];
    }

    try {
      const response = await api.post("/turma/", refatorarDados(data));
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
    const isAnyWeekdaySelected =
      dias && dias.some((dias) => dias !== "combinar");
    setIsOptionSelected(isAnyWeekdaySelected);
  }, [dias]);

  const [isSegSelected, setIsSegSelected] = useState(false);
  const [isTerSelected, setIsTerSelected] = useState(false);
  const [isQuaSelected, setIsQuaSelected] = useState(false);
  const [isQuiSelected, setIsQuiSelected] = useState(false);
  const [isSexSelected, setIsSexSelected] = useState(false);
  const [isSabSelected, setIsSabSelected] = useState(false);
  const [isDomSelected, setIsDomSelected] = useState(false);

  useEffect(() => {
    setIsSegSelected(dias.includes("SEGUNDA"));
    setIsTerSelected(dias.includes("TERCA"));
    setIsQuaSelected(dias.includes("QUARTA"));
    setIsQuiSelected(dias.includes("QUINTA"));
    setIsSexSelected(dias.includes("SEXTA"));
    setIsSabSelected(dias.includes("SABADO"));
    setIsDomSelected(dias.includes("DOMINGO"));
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
            currentValue={watch("professor")}
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
            <div>
              {isSegSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia1")}
                      label={""}
                      value={"Segunda"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio1")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio1")}
                          placeholder={"Início"}
                          error={errors.horarioInicio1?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim1")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim1")}
                          placeholder={"Fim"}
                          error={errors.horarioFim1?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local1")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local1?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isTerSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia2")}
                      label={""}
                      value={"Terça"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio2")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio2")}
                          placeholder={"Início"}
                          error={errors.horarioInicio2?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim2")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim2")}
                          placeholder={"Fim"}
                          error={errors.horarioFim2?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local2")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local2?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isQuaSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia3")}
                      label={""}
                      value={"Quarta"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio3")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio3")}
                          placeholder={"Início"}
                          error={errors.horarioInicio3?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim3")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim3")}
                          placeholder={"Fim"}
                          error={errors.horarioFim3?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local3")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local3?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isQuiSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia4")}
                      label={""}
                      value={"Quinta"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio4")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio4")}
                          placeholder={"Início"}
                          error={errors.horarioInicio4?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim4")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim4")}
                          placeholder={"Fim"}
                          error={errors.horarioFim4?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local4")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local4?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isSexSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia5")}
                      label={""}
                      value={"Sexta"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio5")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio5")}
                          placeholder={"Início"}
                          error={errors.horarioInicio5?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim5")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim5")}
                          placeholder={"Fim"}
                          error={errors.horarioFim5?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local5")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local5?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isSabSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia6")}
                      label={""}
                      value={"Sábado"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio6")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio6")}
                          placeholder={"Início"}
                          error={errors.horarioInicio6?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim6")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim6")}
                          placeholder={"Fim"}
                          error={errors.horarioFim6?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local6")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local6?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
              {isDomSelected && (
                <div className="grid md:grid-cols-3 md:gap-6">
                  <div>
                    <InputField
                      {...register("dia7")}
                      label={""}
                      value={"Domingo"}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div>
                        <SelectField
                          {...register("horarioInicio7")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioInicio7")}
                          placeholder={"Início"}
                          error={errors.horarioInicio7?.message}
                        />
                      </div>
                      <div>
                        <SelectField
                          {...register("horarioFim7")}
                          label={""}
                          options={horarios}
                          currentValue={watch("horarioFim7")}
                          placeholder={"Fim"}
                          error={errors.horarioFim7?.message}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <InputField
                        {...register("local7")}
                        placeholder={"Código da sala de aula"}
                        error={errors.local7?.message}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        <div>
          <Button type="submit">Cadastrar</Button>
          <ToastContainer position="bottom-right" />
        </div>
      </form>
    </div>
  );
}

export default RegisterClass;
