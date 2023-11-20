import { useEffect, useState } from "react";
import Sidebar from "../../componentes/Sidebar";
import useAuth from "../../hooks/useAuth";
import api from "../../utils/api";

function WelcomePage() {
  const { token } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/user/me");

        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.log("Erro ao obter usuário");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="w-full pl-64">
      <h1 className="mt-4 text-2xl font-bold text-primary-900">
        {`Seja bem-vindo ${user?.nome}!`}
      </h1>
    </div>
  );
}

export default WelcomePage;
