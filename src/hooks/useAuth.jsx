import { useContext } from "react";
import { AuthContext } from "../providers/authProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
