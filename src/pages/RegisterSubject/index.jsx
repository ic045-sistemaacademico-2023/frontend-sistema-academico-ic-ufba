import Sidebar from "../../componentes/Sidebar";

import { useEffect, useState } from "react";
import InputField from "../../componentes/Forms/InputField";
import TextField from "../../componentes/Forms/TextField";
import Button from "../../componentes/Button";

import { useForm } from "react-hook-form";
import api from "../../utils/api";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { areas } from "./data";
import SelectField from "../../componentes/Forms/SelectField";

const schema = yup.object().shape({
  nome: yup.string().required("O nome da disciplina é obrigatório"),
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
  bibliografia: yup.string(),
  observacao: yup.string(),
  area: yup.string(),
  preRequisitos: yup.string(),
});

const initialValues = {
  nome: "",
  chTotal: "",
  chPratica: "",
  chTeorica: "",
  ementa: "",
  bibliografia: "",
  observacao: "",
  area: "",
  preRequisitos: "",
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

  const [courses, setCourses] = useState([]);
  const { id } = useParams();
  const isEditing = id !== undefined;

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await api.get(`curso/all`);
        if (response.status === 200) {
          const courses = response.data.map((course) => {
            return {
              id: course.id,
              value: course.id,
              name: course.nome,
            };
          });

          setCourses(courses);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados dos cursos");
      }
    };

    const getSubject = async () => {
      try {
        const response = await api.get(`disciplina/${id}`);
        if (response.status === 200) {
          const subject = response.data;
          setValue("nome", subject.nome);
          setValue("chTotal", subject.chTotal);
          setValue("chPratica", subject.chPratica);
          setValue("chTeorica", subject.chTeorica);
          setValue("ementa", subject.ementa);
          setValue("bibliografia", subject.bibliografia);
          setValue("observacao", subject.observacao);
          setValue("area", subject.area);
          setValue("preRequisitos", subject.preRequisitos);
          setTimeout(() => {
            setValue("curso", subject.curso.id);
          }, 10);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados da disciplina");
      }
    };

    getCourses();
    if (isEditing) {
      getSubject();
    }
  }, [isEditing, id, setValue, watch]);

  var chTeorica = watch("chTeorica");
  var chPratica = watch("chPratica");

  const navigate = useNavigate();

  useEffect(() => {
    setValue("chTotal", parseInt(chTeorica || 0) + parseInt(chPratica || 0));
  }, [watch, setValue, chTeorica, chPratica]);

  const onSubmit = async (data) => {
    console.log(data);
    if (isEditing) {
      try {
        const response = await api.put(`disciplina/${id}`, data);
        if (response.status === 200) {
          toast.success("Disciplina editada com sucesso!");
          navigate(`/curso/${data.curso}`);
        } else {
          toast.error("Error ao editar disciplina");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao editar disciplina");
      }
    } else {
      try {
        const response = await api.post(`disciplina/`, data);
        if (response.status === 201) {
          toast.success("Disciplina cadastrada com sucesso!");
          navigate(`/curso/${data.curso}`);
        } else {
          toast.error("Error ao cadastrar disciplina");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao cadastrar disciplina");
      }
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
          {isEditing ? "Editar" : "Cadastrar"} Disciplina
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("nome")}
            label={"Nome"}
            type={"text"}
            placeholder={"Nome da disciplina"}
            error={errors.nome?.message}
          />
          <SelectField
            {...register("area")}
            label={"Área"}
            options={areas}
            placeholder={"Área da disciplina..."}
            error={errors.area?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectField
            {...register("curso")}
            label={"Curso"}
            options={courses}
            currentValue={watch("curso")}
            placeholder={"Selecione o curso ou digite para filtrar"}
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
            {...register("preRequisitos")}
            label={"Pré-requisitos"}
            type={"text"}
            placeholder={"Pré-requisitos da disciplina..."}
            error={errors.preRequisitos?.message}
          />
          <TextField
            {...register("ementa")}
            label={"Ementa"}
            type={"text"}
            placeholder={"Ementa da disciplina..."}
            error={errors.ementa?.message}
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
          <Button type="submit">{isEditing ? "Editar" : "Cadastrar"}</Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterSubject;
