import { users } from "./data.js";
import UserTable from "../../componentes/UsersTable/index.jsx";
import Sidebar from "../../componentes/Sidebar/index.jsx";
import Button from "../../componentes/Button/index.jsx";

function UsersPage() {
  return (
    <div className="w-full pl-64 pt-10">
      <Sidebar />
      <h1 className="text-xl text-gray-700 font-bold">Usuários</h1>
      <UserTable users={users} />
      <Button>
        <a href="/gerenciar-usuarios">Gerenciar novos usuários</a>
      </Button>
    </div>
  );
}

export default UsersPage;
