import { useLocation } from "react-router-dom";

function SidebarItem({ icon, title, link }) {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <li>
      <a
        href={link}
        className={`${
          isActive ? "bg-primary-100 text-gray-800" : ""
        } flex items-center p-2 rounded-lg hover:text-gray-800 text-white hover:bg-primary-100 group `}
      >
        {icon}
        <span className="ml-3 max-w-[182px] text-left">{title}</span>
      </a>
    </li>
  );
}

export default SidebarItem;
