import { useContext } from "react";
import Sidebar from "../../componentes/Sidebar";
import { UserContext } from "../../contexts/userContext";

function WelcomePage() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full pl-64">
      <Sidebar />
      <h1 className="mt-4 text-2xl font-bold text-primary-900">
        {`Seja bem-vindo ${user?.nome}!`}
      </h1>
    </div>
  );
}

export default WelcomePage;
