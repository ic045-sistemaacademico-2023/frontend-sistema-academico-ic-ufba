import { cpf as cpfValidator } from "cpf-cnpj-validator";

import { useState } from "react";
import Button from "../../componentes/Button";
import InputField from "../../componentes/Forms/InputField";
import SelectField from "../../componentes/Forms/SelectField";
import Sidebar from "../../componentes/Sidebar";
import { roles } from "./roles";

function RegisterUser() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [success, setSuccess] = useState(false);

  const validateName = () => {
    if (name === "") {
      setNameError("O nome é obrigatório.");
    } else {
      setNameError("");
    }
  };

  const validateCpf = () => {
    if (cpf === "") {
      setCpfError("O CPF é obrigatório.");
    } else if (!cpfValidator.isValid(cpf)) {
      setCpfError("CPF inválido.");
    } else {
      setCpfError("");
    }
  };

  const validateEmail = () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === "") {
      setEmailError("O email é obrigatório.");
    } else if (!regex.test(email)) {
      setEmailError("Email inválido.");
    } else {
      setEmailError("");
    }
  };

  const validateRole = () => {
    if (role === "") {
      setRoleError("O cargo é obrigatório.");
    } else {
      setRoleError("");
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

  const validateConfirmPassword = () => {
    if (confirmPassword === "") {
      setConfirmPasswordError("A confirmação de senha é obrigatória.");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("As senhas não coincidem.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isValid = () => {
    validateName();
    validateCpf();
    validateEmail();
    validateRole();
    validatePassword();
    validateConfirmPassword();

    return (
      nameError === "" &&
      cpfError === "" &&
      emailError === "" &&
      roleError === "" &&
      passwordError === "" &&
      confirmPasswordError === ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      setSuccess(true);
      console.log(
        name,
        cpf.replace(/[.-]/g, ""), // Remove os pontos e o traço do CPF
        email,
        role,
        password,
        confirmPassword,
      );
    }
  };

  return (
    <div className="w-full pl-64">
      <Sidebar />

      <form className="bg-primary-50 p-5 z-10 shadow-lg rounded-lg m-10 flex flex-col">
        <h1 className="text-xl text-gray-700 font-bold mb-6">
          Cadastrar Usuário
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label={"Nome"}
            type={"text"}
            placeholder={"Seu nome"}
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
            error={nameError}
          />
          <InputField
            label={"CPF"}
            type={"text"}
            placeholder={"000.000.000-00"}
            mask={"999.999.999-99"}
            required={true}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onBlur={validateCpf}
            error={cpfError}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label={"Email"}
            type={"email"}
            placeholder={"name@example.com"}
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
            error={emailError}
          />
          <SelectField
            label={"Cargo"}
            required={true}
            options={roles}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onBlur={validateRole}
            error={roleError}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <InputField
            label={"Senha"}
            type={"password"}
            placeholder={"Sua senha"}
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            error={passwordError}
          />
          <InputField
            label={"Confirmar Senha"}
            type={"password"}
            placeholder={"Confirme sua senha"}
            required={true}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validateConfirmPassword}
            error={confirmPasswordError}
          />
        </div>
        <div>
          <Button onClick={handleSubmit} type="submit">
            Cadastrar
          </Button>
          {success && (
            <p className="mt-5 text-sm text-center ml-1 text-green-500">
              <span className="font-medium">
                Usuário cadastrado com sucesso!
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterUser;
