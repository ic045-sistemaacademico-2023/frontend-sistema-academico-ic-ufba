import api from "../../utils/api.js";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import UserTable from "../../componentes/UsersTable/index.jsx";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/user/approved");
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
      <UserTable users={users} fetchUsers={fetchUsers} pageTitle="Usuários" />
    </div>
  );
}

export default UsersPage;
