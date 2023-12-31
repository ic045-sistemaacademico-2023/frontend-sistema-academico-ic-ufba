import {
  Article,
  CirclesThreePlus,
  DiamondsFour,
  IdentificationBadge,
  ArrowFatLineDown,
  ListDashes,
  ListPlus,
  Plus,
  PlusCircle,
  SquaresFour,
  User,
  UserPlus,
  ListChecks,
  Users,
} from "@phosphor-icons/react";
import SidebarItem from "./SidebarItem";
import UserPopup from "../UserPopup";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function Sidebar({ setToken }) {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        }
      }
    };

    fetchUser();
  }, [token]);

  const USER_ROLE = user?.role;

  return (
    <aside
      id="sidebar"
      className="sidebar fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary-900 flex flex-col place-content-between">
        <ul className="space-y-2 font-medium">
          {USER_ROLE == "ALUNO" && (
            <>
              <p className="text-white text-base bg-primary-700">Acadêmico</p>

              <SidebarItem
                title={"Comprovante de Matrícula"}
                link={"/comprovante-matricula"}
                icon={<IdentificationBadge size={20} />}
              />

              {/* <SidebarItem
                title={"Histórico"}
                link={"/historico"}
                icon={<ListChecks size={20} />}
              /> */}

              <SidebarItem
                title={"Disciplinas"}
                link={"/curso/1"}
                icon={<SquaresFour size={20} />}
              />
              <SidebarItem
                title={"Resultados"}
                link={"/resultados"}
                icon={<ListChecks size={20} />}
              />
              {/* <SidebarItem
                title={"Turmas"}
                link={"/turmas"}
                icon={<DiamondsFour size={20} />}
              /> */}
              <SidebarItem
                title={"Solicitar Matrícula"}
                link={"/solicitacao-de-matricula"}
                icon={<DiamondsFour size={20} />}
              />
              <SidebarItem
                title={"Compr. Solicitação de Matrícula"}
                link={"/compr-solicitacao-matricula"}
                icon={<IdentificationBadge size={20} />}
              />
            </>
          )}
          {["ADMIN"].includes(USER_ROLE) && (
            <>
              <p className="text-white text-base bg-primary-700">
                Administração
              </p>

              <SidebarItem
                title={"Cadastrar Usuário"}
                link={"/cadastrar/usuario"}
                icon={<UserPlus size={20} />}
              />

              <SidebarItem
                title={"Cadastrar Curso"}
                link={"/cadastrar/curso"}
                icon={<Plus size={20} />}
              />

              <SidebarItem
                title={"Cadastrar Disciplina"}
                link={"/cadastrar/disciplina"}
                icon={<CirclesThreePlus size={20} />}
              />

              <SidebarItem
                title={"Cadastrar Turma"}
                link={"/cadastrar/turma"}
                icon={<PlusCircle size={20} />}
              />

              <SidebarItem
                title={"Usuarios"}
                link={"/usuarios"}
                icon={<Users size={20} />}
              />

              <SidebarItem
                title={"Gerenciar Usuários"}
                link={"/gerenciar/usuarios"}
                icon={<UserPlus size={20} />}
              />

              <SidebarItem
                title={"Cursos"}
                link={"/cursos"}
                icon={<ListDashes size={20} />}
              />
              <SidebarItem
                title={"Disciplinas"}
                link={"/curso/1"}
                icon={<SquaresFour size={20} />}
              />
              <SidebarItem
                title={"Salas"}
                link={"/salas"}
                icon={<ListDashes size={20} />}
              />
            </>
          )}

          {["COORDENADOR_DE_CURSO"].includes(USER_ROLE) && (
            <>
              <p className="text-white text-base bg-primary-700">
                Administração
              </p>

              <SidebarItem
                title={"Cadastrar Disciplina"}
                link={"/cadastrar/disciplina"}
                icon={<PlusCircle size={20} />}
              />

              <SidebarItem
                title={"Cadastrar Turma"}
                link={"/cadastrar/turma"}
                icon={<PlusCircle size={20} />}
              />

              <SidebarItem
                title={"Cadastrar Oportunidade"}
                link={"/cadastrar/oportunidade"}
                icon={<ListPlus size={20} />}
              />

              <SidebarItem
                title={"Oportunidades Matrícula"}
                link={"/oportunidades"}
                icon={<Article size={21} />}
              />

              <SidebarItem
                title={"Solicitações"}
                link={"/solicitacoes"}
                icon={<ArrowFatLineDown size={20} />}
              />

              <SidebarItem
                title={"Cursos"}
                link={"/cursos"}
                icon={<ListDashes size={20} />}
              />
              <SidebarItem
                title={"Disciplinas"}
                link={"/curso/1"}
                icon={<SquaresFour size={20} />}
              />
              <SidebarItem
                title={"Salas"}
                link={"/salas"}
                icon={<ListDashes size={20} />}
              />
            </>
          )}

          {["PROFESSOR"].includes(USER_ROLE) && (
            <>
              {USER_ROLE == "PROFESSOR" && (
                <p className="text-white text-base bg-primary-700">
                  Administração
                </p>
              )}

              <SidebarItem
                title={"Cadastrar Turma"}
                link={"/cadastrar/turma"}
                icon={<PlusCircle size={20} />}
              />

              <SidebarItem
                title={"Minhas turmas"}
                link={"/professor/turmas"}
                icon={<Users size={20} />}
              />
              <SidebarItem
                title={"Salas"}
                link={"/salas"}
                icon={<ListDashes size={20} />}
              />
            </>
          )}
        </ul>

        <ul className="space-y-2 font-medium">
          <UserPopup user={user} setToken={setToken} icon={<User />} />
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
