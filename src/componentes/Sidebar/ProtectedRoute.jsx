import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

export default function ProtectedRoute({
  roles = [],
  redirectPath = "/",
  children,
}) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (roles.length > 0 && user) {
    const isAllowed = roles.includes(user.role);
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children ? children : <Outlet />;
}
