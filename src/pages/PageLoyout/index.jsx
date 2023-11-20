import { Outlet } from "react-router-dom";

export default function PageLoyout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
