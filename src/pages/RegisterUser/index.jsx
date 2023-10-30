import { cpf as cpfValidator } from "cpf-cnpj-validator";

import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import Sidebar from "../../componentes/Sidebar";
import { roles } from "./roles";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../utils/api";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .test("isValidCPF", "CPF inválido", (value) => {
      return cpfValidator.isValid(value);
    }),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  role: yup.string().required("O cargo é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória"),
});

const initialValues = {
  name: "",
  cpf: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

function RegisterUser() {
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

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/user/", {
        nome: data.name,
        cpf: data.cpf,
        email: data.email,
        senha: data.password,
        role: data.role,
      });
      if (response.status === 201) {
        toast.success("Usuário cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar usuário");
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
          Cadastrar Usuário
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("name")}
            label={"Nome"}
            type={"text"}
            placeholder={"Seu nome"}
            error={errors.name?.message}
          />
          <InputField
            {...register("cpf")}
            label={"CPF"}
            type={"text"}
            placeholder={"000.000.000-00"}
            mask={"999.999.999-99"}
            error={errors.cpf?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("email")}
            label={"Email"}
            type={"email"}
            placeholder={"name@example.com"}
            error={errors.email?.message}
          />
          <SelectField
            {...register("role")}
            label={"Cargo"}
            options={roles}
            currentValue={watch("role")}
            placeholder={"Selecione um cargo"}
            error={errors.role?.message}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            {...register("password")}
            label={"Senha"}
            type={"password"}
            placeholder={"Sua senha"}
            error={errors.password?.message}
          />
          <InputField
            {...register("confirmPassword")}
            label={"Confirmar Senha"}
            type={"password"}
            placeholder={"Confirme sua senha"}
            error={errors.confirmPassword?.message}
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

export default RegisterUser;
