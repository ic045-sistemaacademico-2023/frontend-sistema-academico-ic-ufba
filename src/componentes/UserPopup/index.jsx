import { useState } from "react";
import { formatRoles } from "../../pages/RegisterUser/roles";
import { useNavigate } from "react-router-dom";

export default function UserPopup({ user, icon }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <li className="relative">
      <button
        onClick={() => setOpen(!open)}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`flex items-center w-full p-2 z-0 rounded-lg hover:text-gray-800 hover:bg-primary-100 group cursor-pointer ${
          open ? "bg-primary-100 text-gray-800" : "text-white"
        }`}
        type="button"
      >
        {icon}
        <span className="ml-3 max-w-[182px] text-left">{user?.nome}</span>
      </button>

      {open && (
        <div
          id="dropdown"
          className="absolute left-6 bottom-12 z-10 bg-white rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <span className="block px-4 py-2">{formatRoles(user?.role)}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}
