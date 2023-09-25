import Sidebar from "../../componentes/Sidebar";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import { coordenadores, turnos } from "./data";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  coordenadorDoCurso: yup
    .string()
    .required("O coordenador do curso é obrigatório"),
  turno: yup.string().required("O turno é obrigatório"),
});

const initialValues = {
  nome: "",
  coordenadorDoCurso: "",
  turno: "",
};

function RegisterCourse() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Curso cadastrado com sucesso!");
  };

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary-50 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col"
      >
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Cadastrar Curso
        </h1>
        <div className="grid">
          <InputField
            {...register("nome")}
            label={"Nome"}
            type={"text"}
            placeholder={"Nome do Curso"}
            error={errors.nome?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <SelectField
            {...register("coordenadorDoCurso")}
            label={"Coordenador do Curso"}
            options={coordenadores}
            currentValue={watch("coordenadorDoCurso")}
            placeholder={"Selecione o coordenador do curso"}
            error={errors.coordenadorDoCurso?.message}
          />
          <SelectField
            {...register("turno")}
            label={"Turno"}
            options={turnos}
            currentValue={watch("turno")}
            placeholder={"Selecione o turno"}
            error={errors.turno?.message}
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

export default RegisterCourse;
