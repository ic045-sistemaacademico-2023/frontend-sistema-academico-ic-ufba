import Sidebar from "../../componentes/Sidebar";

import { useEffect } from "react";
import InputField from "../../componentes/Forms/InputField";
import TextField from "../../componentes/Forms/TextField";
import Button from "../../componentes/Button";

import { useForm } from "react-hook-form";
import api from "../../utils/api";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  nome: yup.string().required("O nome da disciplina é obrigatório"),
  codigo: yup.string().required("O código da disciplina é obrigatório"),
  curso: yup.number().required("O curso da disciplina é obrigatório"),
  chTotal: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .min(1, "A carga horária da disciplina é obrigatória")
    .required("A carga horária da disciplina é obrigatória"),
  chTeorica: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .required("A carga horária teórica da disciplina é obrigatória"),
  chPratica: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? 0 : value))
    .required("A carga horária prática da disciplina é obrigatória"),
  ementa: yup.string(),
  objetivos: yup.string(),
  conteudo: yup.string(),
  bibliografia: yup.string(),
  observacao: yup.string(),
  semestre: yup.number().required("O semestre da disciplina é obrigatório"),
});

const initialValues = {
  codigo: "",
  nome: "",
  chTotal: "",
  chPratica: "",
  chTeorica: "",
  curso: "",
  ementa: "",
  objetivos: "",
  conteudo: "",
  bibliografia: "",
  observacao: "",
  area: "EDUCACAO",
  semestre: "",
};

function RegisterSubject() {
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
    setValue(
      "chTotal",
      parseInt(watch("chTeorica") || 0) + parseInt(watch("chPratica") || 0),
    );
  }, [watch("chTeorica"), watch("chPratica")]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post(`disciplina/`, data);
      console.log("response", response);
      toast.success("Disciplina cadastrada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Error ao carregar dados das disciplinas");
    }
  };

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-100 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Cadastrar Disciplina
        </h1>
        <div className="grid md:grid-cols-3 md:gap-6">
          <InputField
            {...register("nome")}
            label={"Nome"}
            type={"text"}
            placeholder={"Nome da disciplina"}
            error={errors.nome?.message}
          />
          <InputField
            {...register("codigo")}
            label={"Código da Disciplina"}
            type={"text"}
            placeholder={"Código da disciplina, ex: MAT123"}
            error={errors.codigo?.message}
          />
          <InputField
            {...register("semestre")}
            label={"Semestre da Disciplina"}
            type={"number"}
            placeholder={"Semestre da disciplina, ex: 1"}
            error={errors.semestre?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("curso")}
            label={"Curso"}
            type={"text"}
            placeholder={"Curso da disciplina"}
            error={errors.curso?.message}
          />
          <div>
            <p className="block mb-2 text-sm font-medium text-gray-900 ml-2 text-left">
              Carga Horária: Teórica + Prática = Total
            </p>
            <div className="flex items-center">
              <div className="w-1/3">
                <InputField
                  {...register("chTeorica")}
                  type={"number"}
                  placeholder={"CH teórica"}
                />
              </div>
              <div className="h-12 mx-2">+</div>
              <div className="w-1/3">
                <InputField
                  {...register("chPratica")}
                  type={"number"}
                  placeholder={"CH prática"}
                />
              </div>
              <div className="h-12 mx-2">=</div>
              <div className="w-1/3">
                <InputField
                  {...register("chTotal")}
                  disabled={true}
                  type={"number"}
                  placeholder={"CH total"}
                  readOnly
                />
              </div>
            </div>
            <div className="flex items-center">
              {(errors.ch || errors.chPratica || errors.chTeorica) && (
                <p className="mt-[-15px] text-sm text-left ml-1 text-red-600 dark:text-red-500">
                  <span className="font-medium">{errors.ch?.message}</span>
                  <span className="font-medium">
                    {errors.chPratica?.message}
                  </span>
                  <span className="font-medium">
                    {errors.chTeorica?.message}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <TextField
            {...register("ementa")}
            label={"Ementa"}
            type={"text"}
            placeholder={"Ementa da disciplina..."}
            error={errors.ementa?.message}
          />
          <TextField
            {...register("objetivos")}
            label={"Objetivos"}
            type={"text"}
            placeholder={"Objetivos da disciplina..."}
            error={errors.objetivos?.message}
          />
          <TextField
            {...register("conteudo")}
            label={"Conteúdo"}
            type={"text"}
            placeholder={"Conteúdo da disciplina..."}
            error={errors.conteudo?.message}
          />
          <TextField
            {...register("bibliografia")}
            label={"Bibliografia"}
            type={"text"}
            placeholder={"Bibliografia da disciplina..."}
            error={errors.bibliografia?.message}
          />
          <TextField
            {...register("observacao")}
            label={"Observação"}
            type={"text"}
            placeholder={"Algum ponto importante a ser observado..."}
            error={errors.observacao?.message}
          />
        </div>
        <div>
          <Button type="submit">Cadastrar</Button>
          <ToastContainer position="bottom-right" />
        </div>
      </form>
    </div>
  );
}

export default RegisterSubject;
