function SidebarItem({ icon, title, link }) {
  return (
    <li>
      <a
        href={link}
        className="flex items-center p-2 rounded-lg hover:text-gray-800 text-white hover:bg-primary-100 group"
      >
        {icon}
        <span className="ml-3 max-w-[182px] text-left">{title}</span>
      </a>
    </li>
  );
}

export default SidebarItem;
