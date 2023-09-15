import { User } from "@phosphor-icons/react";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside
      id="default-sidebar"
      className="sidebar fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-primary-900 flex flex-col place-content-between">
        <ul className="space-y-2 font-medium">
          <SidebarItem
            title={"Matrícula"}
            link={"/"}
            icon={<User size={18} />}
          />
          <SidebarItem
            title={"Disciplinas"}
            link={"/disciplinas"}
            icon={<User size={18} />}
          />
        </ul>
        <ul className="space-y-2 font-medium">
          <SidebarItem
            title={"Login"}
            link={"/login"}
            icon={<User size={18} />}
          />
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
