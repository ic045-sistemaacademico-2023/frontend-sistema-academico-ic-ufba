import {
  CirclesThreePlus,
  IdentificationBadge,
  ListChecks,
  ListDashes,
  Plus,
  PlusCircle,
  SquaresFour,
  User,
  UserPlus,
  Users,
} from "@phosphor-icons/react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  // ALUNO ADMIN PROFESSOR COORDENADOR_DE_CURSO
  const USER_ROLE = "ALUNO";

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
              <SidebarItem
                title={"Histórico"}
                link={"/historico"}
                icon={<ListChecks size={20} />}
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
            </>
          )}
          {["ADMIN", "COORDENADOR_DE_CURSO"].includes(USER_ROLE) && (
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
                title={"Usuarios"}
                link={"/usuarios"}
                icon={<Users size={20} />}
              />
            </>
          )}

          {["ADMIN", "COORDENADOR_DE_CURSO", "PROFESSOR"].includes(
            USER_ROLE,
          ) && (
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
                link={"/professor/1/turmas"}
                icon={<Users size={20} />}
              />
            </>
          )}
        </ul>

        <ul className="space-y-2 font-medium">
          <SidebarItem
            title={"Login"}
            link={"/login"}
            icon={<User size={20} />}
          />
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
