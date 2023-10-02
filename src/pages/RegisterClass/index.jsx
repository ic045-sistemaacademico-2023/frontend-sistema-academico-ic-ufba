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
import CourseClasses from "../../componentes/CourseClasses";

import { disciplinas, professores, dias, horarios } from "./data";
import { subjectClasses } from "./subjectClasses";

const schema = yup.object().shape({
  componenteCurricular: yup
    .string()
    .required("O nome da disciplina é obrigatório"),
  professor: yup
    .string()
    .required("O nome do professor é obrigatório"),
  diasDeAula: yup
    .array()
    .min(1, "Selecione pelo menos um dia de aula")
    .required("Selecione pelo menos um dia de aula"),
  // horarioInicio1: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim1: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local1: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
  // horarioInicio2: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim2: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local2: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
  // horarioInicio3: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim3: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local3: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
  // horarioInicio4: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim4: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local4: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
  // horarioInicio5: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim5: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local5: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
  // horarioInicio6: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim6: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local6: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
  // horarioInicio7: yup
  //   .string()
  //   .required("O horário de início da aula é obrigatório"),
  // horarioFim7: yup
  //   .string()
  //   .required("O horário de fim da aula é obrigatório"),
  // local7: yup
  //   .string()
  //   .required("O local da aula é obrigatório"),
});

const initialValues = {
  codigoTurma: "",
  componenteCurricular: "",
  professor: "",
  diasDeAula: [],
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
    setValue,
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Cria um array com todos os horários de início e fim
    const horarios = [
      data.horarioInicio1, data.horarioFim1,
      data.horarioInicio2, data.horarioFim2,
      data.horarioInicio3, data.horarioFim3,
      data.horarioInicio4, data.horarioFim4,
      data.horarioInicio5, data.horarioFim5,
      data.horarioInicio6, data.horarioFim6,
      data.horarioInicio7, data.horarioFim7
    ];
    // Cria um array com todos os locais
    const locais = [
      data.local1, data.local2, data.local3, data.local4, data.local5, data.local6, data.local7
    ]
    // Filtra o os arrays para remover os horários e locais vazios
    const horariosFiltrados = horarios.filter(horario => horario !== "" && horario !== "0");
    const locaisFiltrados = locais.filter(local => local !== "" && local !== "0");

    // Substitui os arrays de horários e locais pelos arrays filtrados
    data.horarios = horariosFiltrados;
    data.locais = locaisFiltrados;

    // Remove as propriedades de horário e local do objeto
    for (let i = 1; i <= 7; i++) {
      delete data['horarioInicio' + i];
      delete data['horarioFim' + i];
      delete data['dia' + i];
    }
    for (let i = 1; i <= 7; i++) {
      delete data['local' + i];
    }

    console.log(data);
    toast.success("Turma cadastrada com sucesso!");
    
    // Limpa formulário
    // setValue("codigoTurma", "");
    // setValue("componenteCurricular", "");
    // setValue("professor", "");
    // setValue("diasDeAula", []);
    // setValue("horarioInicio1", "");
    // setValue("horarioFim1", "");
    // setValue("local1", "");
    // setValue("horarioInicio2", "");
    // setValue("horarioFim2", "");
    // setValue("local2", "");
    // setValue("horarioInicio3", "");
    // setValue("horarioFim3", "");
    // setValue("local3", "");
    // setValue("horarioInicio4", "");
    // setValue("horarioFim4", "");
    // setValue("local4", "");
    // setValue("horarioInicio5", "");
    // setValue("horarioFim5", "");
    // setValue("local5", "");
    // setValue("horarioInicio6", "");
    // setValue("horarioFim6", "");
    // setValue("local6", "");
    // setValue("horarioInicio7", "");
    // setValue("horarioFim7", "");
    // setValue("local7", "");
  };

  const diasDeAula = watch("diasDeAula", []);
  const componenteCurricular = watch("componenteCurricular", []);

  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isComponentSelected, setIsComponentSelected] = useState(false);

  useEffect(() => {
    const isAnyWeekdaySelected = diasDeAula && diasDeAula.some(diasDeAula => diasDeAula !== "combinar");
    setIsOptionSelected(isAnyWeekdaySelected);
  }, [diasDeAula]);

  useEffect(() => {
    setIsComponentSelected(componenteCurricular !== "");
  }, [componenteCurricular]);

  const [isSegSelected, setIsSegSelected] = useState(false);
  const [isTerSelected, setIsTerSelected] = useState(false);
  const [isQuaSelected, setIsQuaSelected] = useState(false);
  const [isQuiSelected, setIsQuiSelected] = useState(false);
  const [isSexSelected, setIsSexSelected] = useState(false);
  const [isSabSelected, setIsSabSelected] = useState(false);
  const [isDomSelected, setIsDomSelected] = useState(false);

  useEffect(() => {
    setIsSegSelected(diasDeAula.includes('SEG'));
    setIsTerSelected(diasDeAula.includes('TER'));
    setIsQuaSelected(diasDeAula.includes('QUA'));
    setIsQuiSelected(diasDeAula.includes('QUI'));
    setIsSexSelected(diasDeAula.includes('SEX'));
    setIsSabSelected(diasDeAula.includes('SAB'));
    setIsDomSelected(diasDeAula.includes('DOM'));
  }, [diasDeAula]);

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
            {...register("componenteCurricular")}
            label={"Disciplina"}
            options={disciplinas}
            currentValue={watch("componenteCurricular")}
            placeholder={"Selecione a disciplina ou digite para filtrar"}
            error={errors.componenteCurricular?.message}
          />
          <InputField
            {...register("codigoTurma")}
            label={"Código da turma"}
            value={isComponentSelected && String(subjectClasses.length + 1).padStart(3, '0') || ""}
            placeholder={"Preenchido automaticamente"}
            disabled={true}
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
            {...register("diasDeAula")}
            label={"Dias de aula"}
            options={dias}
            placeholder={"Selecione o dia"}
            error={errors.diasDeAula?.message}
          />
        </div>

        {isComponentSelected && (setValue('codigoTurma', String(subjectClasses.length + 1).padStart(3, '0')),
          <div className="mb-1">
            <CourseClasses courseClasses={subjectClasses} />
          </div>
        )}

        {isOptionSelected && (
          <div className="mt-2">
            {/* Cabeçalho da tabela */}
            <div className="grid md:grid-cols-3 md:gap-6">
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
                  Dia:</p>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
                  Horários de início e final da aula:</p>
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
                  Local de aula:</p>
              </div>
            </div>
            {/* Linhas da tabela */}
            <div>
              {isSegSelected &&
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
              }
              {isTerSelected &&
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
              }
              {isQuaSelected &&
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
              }
              {isQuiSelected &&
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
              }
              {isSexSelected &&
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
              }
              {isSabSelected &&
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
              }
              {isDomSelected &&
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
              }
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
