import UserTable from "../../componentes/UsersTable/index.jsx";
import Sidebar from "../../componentes/Sidebar/index.jsx";

import api from "../../utils/api.js";
import { useEffect, useState } from "react";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/user/all").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="w-full pl-64 pt-10">
      <Sidebar />
      <h1 className="text-xl text-gray-700 font-bold">Usuários</h1>
      <UserTable users={users} />
    </div>
  );
}

export default UsersPage;
