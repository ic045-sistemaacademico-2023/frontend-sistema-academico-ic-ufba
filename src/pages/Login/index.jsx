import Botao from "../../componentes/Botao";
import { useState } from "react";
import InputField from "../../componentes/Forms/InputField";

function LoginPage() {
  const [abrirMenu, setAbrirMenu] = useState(false);
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [erro, setErro] = useState({
    exibir: false,
    mensagem: "",
  });

  const onSubmitLogin = (event) => {
    event.preventDefault();
    if (matricula === "") {
      setErro({
        exibir: true,
        mensagem:
          "Você não digitou sua matrícula. Para efetuar o login é necessário digitar a matrícula e a senha",
      });
    } else if (senha === "") {
      setErro({
        exibir: true,
        mensagem:
          'Você precisa digitar uma senha para efetuar o login. Se você esqueceu a senha, clique em ok e depois em "Esqueceu a senha?"',
      });
    }
  };

  const onClear = (event) => {
    event.preventDefault();
    setMatricula("");
    setSenha("");
  };

  const onSubmitRecuperar = (event) => {
    event.preventDefault();
    if (email === "") {
      setErro({
        exibir: true,
        mensagem:
          "Você não digitou seu e-mail. Para recuperar a senha é necessário digitar o e-mail",
      });
    } else if (!emailValido) {
      setErro({
        exibir: true,
        mensagem:
          "Você está tentando recuperar a senha com um e-mail inválido. Verifique se o e-mail que você digitou está correto e tente novamente. Caso não lembre do e-mail de recuperação, compareça ao colegiado",
      });
    }
  };

  return (
    <main>
      <div className="bg-primary-700 flex px-20">
        <div className="bg-primary-500 flex w-full h-full px-5">
          <div className="min-h-screen w-full h-full flex flex-col items-center justify-center bg-white">
            <h1 className="text-primary-800 text-2xl">Sistema Acadêmico</h1>
            <h2 className="text-primary-700 text-lg">Login</h2>

            {erro.exibir && (
              <div className="modal-bg">
                <div className="erro-conteudo w-1/3 rounded-lg bg-white p-5 border-2 border-primary-700 border-solid">
                  <h2>Atenção!</h2>
                  <p>{erro.mensagem}</p>
                  <Botao
                    onClick={() =>
                      setErro({
                        exibir: false,
                        mensagem: "",
                      })
                    }
                  >
                    Ok
                  </Botao>
                </div>
              </div>
            )}

            <form className="p-5">
              <div className="flex flex-col">
                <InputField
                  type="text"
                  id="matricula"
                  name="matricula"
                  required="required"
                  label="Matrícula"
                  placeholder="Digite sua matrícula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </div>

              <InputField
                type="password"
                id="password"
                name="password"
                required="required"
                placeholder="Digite sua senha"
                label="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <div className="flex justify-center gap-2">
                <Botao onClick={onSubmitLogin}>Login</Botao>
                <Botao onClick={onClear}>Limpar</Botao>
              </div>
            </form>

            <p
              className="cursor-pointer underline"
              onClick={() => setAbrirMenu(true)}
            >
              Esqueceu a senha?
            </p>
            <a className="cursor-pointer underline" href="/">
              Primeira página
            </a>

            {abrirMenu && (
              <div className="recuperarSenha">
                <form>
                  <div className="flex flex-col">
                    <InputField
                      type="email"
                      id="email"
                      name="email"
                      required="required"
                      placeholder="Digite seu e-mail"
                      label="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => {
                        const regex =
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        setEmailValido(regex.test(e.target.value));
                      }}
                    />
                    {!emailValido && (
                      <span className="erro">*E-mail inválido</span>
                    )}
                  </div>
                  <Botao onClick={onSubmitRecuperar}>Recuperar Senha</Botao>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
