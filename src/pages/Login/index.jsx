import { cpf as cpfValidator } from "cpf-cnpj-validator";

import Button from "../../componentes/Button";
import { useState } from "react";
import InputField from "../../componentes/Forms/InputField";
import Link from "../../componentes/Link";

function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const [cpfError, setCpfError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [success, setSuccess] = useState(false);

  const validateCpf = () => {
    if (cpf === "") {
      setCpfError("O CPF é obrigatório.");
    } else if (!cpfValidator.isValid(cpf)) {
      setCpfError("CPF inválido.");
    } else {
      setCpfError("");
    }
  };

  const validatePassword = () => {
    if (password === "") {
      setPasswordError("A senha é obrigatória.");
    } else if (password.length < 6) {
      setPasswordError("A senha deve conter pelo menos 6 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const onSubmitLogin = (event) => {
    event.preventDefault();

    validateCpf();
    validatePassword();

    if (cpfError === "" && passwordError === "") {
      setSuccess(true);
    }
  };

  return (
    <main>
      <div className="bg-primary-500 flex px-28">
        <div className="bg-primary-300 flex w-full h-full px-6">
          <div className="min-h-screen w-full h-full flex flex-col items-center justify-center bg-white">
            <h1 className="text-primary-800 text-2xl">Sistema Acadêmico</h1>
            <h2 className="text-primary-700 text-lg">Login</h2>

            <form className="p-5 w-96">
              <div className="flex flex-col">
                <InputField
                  label={"CPF"}
                  type={"text"}
                  placeholder={"000.000.000-00"}
                  mask={"999.999.999-99"}
                  required={true}
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  error={cpfError}
                />
              </div>
              <InputField
                label={"Senha"}
                type={"password"}
                placeholder={"Sua senha"}
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />
              <Button onClick={onSubmitLogin} type="submit">
                Login
              </Button>
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
