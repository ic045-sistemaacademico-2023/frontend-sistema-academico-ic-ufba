import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import api from "../../utils/api";

export default function ProtectedRoute({
  roles = [],
  redirectPath = "/",
  children,
}) {
  const { user, setUser } = useContext(UserContext);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const response = await api.get("/user/me");

    if (response.status === 200) {
      setUser(response.data);
      return response.data;
    } else {
      return null;
    }
  };

  if (!user) {
    if (!fetchUser()) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  if (roles.length > 0 && user) {
    const isAllowed = roles.includes(user.role);
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
}
