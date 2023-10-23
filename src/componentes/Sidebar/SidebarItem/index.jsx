import { useLocation } from 'react-router-dom';

function SidebarItem({ icon, title, link }) {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <li>
      <a
        href={link}
        className={`flex items-center p-2 rounded-lg hover:text-gray-800 hover:bg-primary-100 group ${isActive ? 'bg-primary-100 text-gray-800' : 'text-white'}`}
      >
        {icon}
        <span className="ml-3 max-w-[182px] text-left">{title}</span>
      </a>
    </li>
  );
}

export default SidebarItem;
