import Botao from "../../componentes/Botao";
import CampoCpf from "../../componentes/CampoCpf";
import CampoSenha from "../../componentes/CampoSenha";
import CampoEmail from "../../componentes/CampoEmail";
import "./styles.css";
import { useState } from "react";

function LoginPage() {
  const [abrirMenu, setAbrirMenu] = useState(false);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [cpfValido, setCpfValido] = useState(true); // true ou false
  const [emailValido, setEmailValido] = useState(true); // true ou false
  const [exibirErroCpf, setExibirErroCpf] = useState(false);
  const [exibirErroSenha, setExibirErroSenha] = useState(false);
  const [exibirErroCpfVazio, setExibirErroCpfVazio] = useState(false);
  const [exibirErroEmail, setExibirErroEmail] = useState(false);
  const [exibirErroEmailVazio, setExibirErroEmailVazio] = useState(false);

  const onSubmitLogin = (evento) => {
    evento.preventDefault();
    if (cpf === "") {
      console.log("CPF não preenchido");
      setExibirErroCpfVazio(true);
    } else if (senha === "") {
      console.log("Senha não preenchida");
      setExibirErroSenha(true);
    } else if (cpfValido) {
      console.log("Formulario submetido");
      console.log(cpf);
      console.log(senha);
    } else {
      console.log("CPF inválido");
      setExibirErroCpf(true);
    }
  };

  const onClear = (evento) => {
    evento.preventDefault();
    console.log("Formulário limpo");
    setCpf("");
    setSenha("");
  };

  const onSubmitRecuperar = (evento) => {
    evento.preventDefault();
    if (email === "") {
      console.log("E-mail não preenchido");
      setExibirErroEmailVazio(true);
    } else if (emailValido) {
      console.log("Formulario submetido");
      console.log(email);
    } else {
      console.log("E-mail inválido");
      setExibirErroEmail(true);
    }
  };

  const esquecido = (evento) => {
    evento.preventDefault();
    console.log("Esqueceu a senha?");
    setAbrirMenu(true);
  };

  return (
    <main>
      <div className="div-externa">
        <div className="div-interna">
          <div className="div-login">
            <h1>Sistema Acadêmico</h1>
            <h2>Login</h2>
            {exibirErroCpf && (
              <div className="tela-erro">
                <div className="erro-conteudo">
                  <h2>Atenção!</h2>
                  <p>Você está tentando fazer o login com um CPF inválido</p>
                  <p>
                    Verifique se o CPF que você digitou está correto e tente
                    novamente.
                  </p>
                  <Botao onClick={() => setExibirErroCpf(false)}>Ok</Botao>
                </div>
              </div>
            )}
            {exibirErroSenha && (
              <div className="tela-erro">
                <div className="erro-conteudo">
                  <h2>Atenção!</h2>
                  <p>Você precisa digitar uma senha para efetuar o login</p>
                  <p>
                    Se você esqueceu a senha, clique em ok e depois em "Esqueceu
                    a senha?"
                  </p>
                  <Botao onClick={() => setExibirErroSenha(false)}>Ok</Botao>
                </div>
              </div>
            )}
            {exibirErroCpfVazio && (
              <div className="tela-erro">
                <div className="erro-conteudo">
                  <h2>Atenção!</h2>
                  <p>
                    Você não digitou seu CPF, para efetuar o login é necessário
                    digitar o CPF e a senha
                  </p>
                  <p>Tente novamente</p>
                  <Botao onClick={() => setExibirErroCpfVazio(false)}>Ok</Botao>
                </div>
              </div>
            )}
            {exibirErroEmail && (
              <div className="tela-erro">
                <div className="erro-conteudo">
                  <h2>Atenção!</h2>
                  <p>
                    Você está tentando recuperar a senha com um e-mail inválido
                  </p>
                  <p>
                    Verifique se o e-mail que você digitou está correto e tente
                    novamente.
                  </p>
                  <p>
                    Caso não lembre do e-mail de recuperação, compareça ao
                    colegiado
                  </p>
                  <Botao onClick={() => setExibirErroEmail(false)}>Ok</Botao>
                </div>
              </div>
            )}
            {exibirErroEmailVazio && (
              <div className="tela-erro">
                <div className="erro-conteudo">
                  <h2>Atenção!</h2>
                  <p>
                    Você não digitou seu e-mail, para recuperar a senha é
                    necessário digitar o e-mail
                  </p>
                  <p>Tente novamente</p>
                  <Botao onClick={() => setExibirErroEmailVazio(false)}>
                    Ok
                  </Botao>
                </div>
              </div>
            )}

            <form>
              <CampoCpf
                cpf={cpf}
                aoAlterar={(valor) => setCpf(valor)}
                cpfValido={cpfValido}
                validarCampo={(valor) => setCpfValido(valor)}
              />
              <CampoSenha
                senha={senha}
                aoAlterar={(valor) => setSenha(valor)}
              />
              <Botao onClick={onSubmitLogin}>Login</Botao>
              <Botao onClick={onClear}>Limpar</Botao>
            </form>
            <p className="esquecer-senha" onClick={esquecido}>
              Esqueceu a senha?
            </p>
            <a className="esquecer-senha" href="/">
              Primeira página
            </a>
            {abrirMenu && (
              <div className="recuperarSenha">
                <form>
                  <CampoEmail
                    email={email}
                    aoAlterar={(valor) => setEmail(valor)}
                    emailValido={emailValido}
                    validarCampo={(valor) => setEmailValido(valor)}
                  />
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
