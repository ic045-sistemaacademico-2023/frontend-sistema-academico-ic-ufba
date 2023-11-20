import { useEffect, useState } from "react";
import UserTable from "../../componentes/UsersTable/index.jsx";
import api from "../../utils/api.js";

import { toast } from "react-toastify";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/user/waitlist");

      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.error("Erro ao carregar usuários!");
      }
    } catch (error) {
      toast.error("Erro ao carregar usuários!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full pl-64 pt-10">
      <h1 className="text-xl text-gray-700 font-bold">
        Gerenciar novos usuários
      </h1>
      <UserTable users={users} isManager fetchUsers={fetchUsers} />
    </div>
  );
}

export default ManageUsersPage;
