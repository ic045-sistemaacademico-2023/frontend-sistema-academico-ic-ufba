import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({
  user,
  roles = [],
  redirectPath = "/",
  children,
}) {
  const { token } = useAuth();

  if (!token) {
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
