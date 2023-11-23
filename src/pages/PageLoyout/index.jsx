import { Outlet } from "react-router-dom";
import Sidebar from "../../componentes/Sidebar";

export default function PageLoyout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
