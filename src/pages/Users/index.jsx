import UserTable from "../../componentes/UsersTable/index.jsx";
import Sidebar from "../../componentes/Sidebar/index.jsx";

import api from "../../utils/api.js";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/user/all");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error ao carregar usuários");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="w-full pl-64 pt-10">
      <Sidebar />
      <h1 className="text-xl text-gray-700 font-bold">Usuários</h1>
      <UserTable users={users} />
      <ToastContainer />
    </div>
  );
}

export default UsersPage;
