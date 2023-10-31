import Button from "../../componentes/Button";
import { useState } from "react";
import InputField from "../../componentes/Forms/InputField";
import Link from "../../componentes/Link";
import { toast } from "react-toastify";

function PasswordReset() {
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

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

  const onSubmitLogin = (event) => {
    event.preventDefault();

    validateEmail();

    if (emailError === "") {
      toast.success("Email enviado com sucesso!");
    }
  };

  return (
    <main>
      <div className="bg-primary-500 flex px-28">
        <div className="bg-primary-300 flex w-full h-full px-6">
          <div className="min-h-screen w-full h-full flex flex-col items-center justify-center bg-white">
            <h1 className="text-primary-800 text-2xl">Sistema Acadêmico</h1>
            <h2 className="text-primary-700 text-lg">Recuperar senha</h2>

            <form className="p-5 w-96">
              <div className="flex flex-col">
                <InputField
                  label={"E-mail"}
                  type={"email"}
                  placeholder={"name@example.com"}
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                />
              </div>
              <Button onClick={onSubmitLogin} type="submit">
                Recuperar
              </Button>
            </form>

            <Link href="/login">Login</Link>
            <Link href="/comprovante-matricula">Primeira página</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PasswordReset;
