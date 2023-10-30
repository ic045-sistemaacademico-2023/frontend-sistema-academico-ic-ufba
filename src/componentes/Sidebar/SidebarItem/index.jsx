import { useLocation } from "react-router-dom";

function SidebarItem({ icon, title, link }) {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <li>
      <a
        href={link}
        className={`${
          isActive ? "bg-primary-100 text-primary-950" : "text-white"
        } flex items-center p-2 rounded-lg hover:text-gray-800  hover:bg-primary-100 group text-sm`}
      >
        {icon}
        <span className="ml-3 max-w-[182px] text-left">{title}</span>
      </a>
    </li>
  );
}

export default SidebarItem;
