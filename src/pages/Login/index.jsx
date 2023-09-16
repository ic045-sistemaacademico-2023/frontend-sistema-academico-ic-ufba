import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { useForm } from "react-hook-form";

import Button from "../../componentes/Button";
import { useEffect, useState } from "react";
import InputField from "../../componentes/Forms/InputField";
import Link from "../../componentes/Link";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .test("isValidCPF", "CPF inválido", (value) => {
      return cpfValidator.isValid(value);
    }),
  password: yup.string().required("Senha obrigatória"),
});

const initialValues = {
  cpf: "",
  password: "",
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setSuccess(true);
  };

  return (
    <main>
      <div className="bg-primary-500 flex px-28">
        <div className="bg-primary-300 flex w-full h-full px-6">
          <div className="min-h-screen w-full h-full flex flex-col items-center justify-center bg-white">
            <h1 className="text-primary-700 text-3xl">Sistema Acadêmico</h1>
            <h2 className="text-primary-500 text-xl mt-5">Login</h2>

            <form className="p-5 w-96" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <InputField
                  {...register("cpf")}
                  name={"cpf"}
                  label={"CPF"}
                  type={"text"}
                  placeholder={"000.000.000-00"}
                  mask={"999.999.999-99"}
                  error={errors.cpf?.message}
                />
              </div>
              <InputField
                {...register("password")}
                name={"password"}
                label={"Senha"}
                type={"password"}
                placeholder={"Sua senha"}
                error={errors.password?.message}
              />
              <Button type="submit">Login</Button>
              {success && (
                <p className="mt-5 text-sm text-center ml-1 text-green-500">
                  <span className="font-medium">
                    Usuário logado com sucesso!
                  </span>
                </p>
              )}
            </form>

            <Link href="/password-reset">Recuperar senha</Link>
            <Link href="/">Primeira página</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
