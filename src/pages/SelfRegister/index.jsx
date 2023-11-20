import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { useForm } from "react-hook-form";

import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import Link from "../../componentes/Link";

import { toast } from "react-toastify";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import SelectField from "../../componentes/Forms/SelectField";
import { useEffect, useState } from "react";

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
  course: yup.string().required("O curso é obrigatório"),
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
  role: "ALUNO",
  course: "",
  password: "",
  confirmPassword: "",
};

export default function SelfRegister() {
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

  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/curso/all");

        if (response.status === 200) {
          setCourses(
            response.data.map((course) => ({
              id: course.id,
              value: course.id,
              name: course.nome,
            })),
          );
        } else {
          toast.error("Erro ao carregar dados dos cursos");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar dados dos cursos");
      }
    };

    fetchCourses();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/user/", {
        nome: data.name,
        cpf: data.cpf,
        email: data.email,
        senha: data.password,
        role: data.role,
      });
      if (response.status === 201) {
        const userId = response.data.id;
        const response2 = await api.post("/aluno/", {
          usuario: userId,
          curso: data.course,
          nome: response.data.nome,
        });

        if (response2.status === 201) {
          toast.success(
            "Solicitação de cadastro feita com sucesso!\n Aguarde a aprovação do administrador",
          );
          navigate("/login");
        } else {
          toast.error("Erro ao cadastrar usuário");
        }
      } else {
        toast.error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar usuário");
    }
  };

  return (
    <main>
      <div className="bg-primary-500 flex px-28">
        <div className="bg-primary-300 flex w-full h-full px-6">
          <div className="min-h-screen w-full h-full bg-white">
            <h1 className="text-primary-700 text-3xl mt-20">
              Sistema Acadêmico
            </h1>
            <h2 className="text-primary-500 text-xl mt-5 mb-10">Cadastro</h2>

            <form className="px-44" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("course")}
                  label={"Curso"}
                  options={courses}
                  currentValue={watch("course")}
                  placeholder={"Selecione um curso"}
                  error={errors.course?.message}
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
              <Button type="submit" className="mt-5">
                Cadastrar
              </Button>
            </form>

            <Link href="/login" className="mt-6">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
