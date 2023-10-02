import { users } from "./data.js";
import UserTable from "../../componentes/UsersTable/index.jsx";
import Sidebar from "../../componentes/Sidebar/index.jsx";

function ManageUsersPage() {
  return (
    <div className="w-full pl-64 pt-10">
      <Sidebar />
      <h1 className="text-xl text-gray-700 font-bold">Gerenciar novos usuários</h1>
      <UserTable users={users} isManager/>
    </div>
  );
}

export default ManageUsersPage;
