import { Link } from "react-router-dom";

const Button = ({ children, onClick, href, type, secondary, className }) => {
  return secondary ? (
    <Link
      to={href}
      className={`text-primary-400 hover:text-white border border-primary-400 hover:bg-gradient-to-r hover:from-primary-300 hover:to-primary-400 hover:border-1 hover:border-white focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <button
      href={href}
      type={type}
      className={`text-white bg-gradient-to-r from-primary-300 to-primary-400 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
