import Sidebar from "../../componentes/Sidebar/index.jsx";
import Button from "../../componentes/Button/index.jsx";

import api from "../../utils/api.js";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import UserTable from "../../componentes/UsersTable/index.jsx";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/user/all");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Error ao carregar usuários");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full pl-64 pt-10 mb-6">
      <h1 className="text-xl text-gray-700 font-bold">Usuários</h1>
      <UserTable users={users} fetchUsers={fetchUsers} />
      <Button secondary href={"/gerenciar-usuarios"}>
        Gerenciar Usuários
      </Button>
    </div>
  );
}

export default UsersPage;
