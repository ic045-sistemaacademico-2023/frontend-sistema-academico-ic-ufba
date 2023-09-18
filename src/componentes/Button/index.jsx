const Button = ({ children, onClick, href, type, secondary }) => {
  return secondary ? (
    <a
      href={href}
      className="text-primary-400 hover:text-white border border-primary-400 hover:bg-gradient-to-r hover:from-primary-300 hover:to-primary-400 hover:border-0 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </a>
  ) : (
    <button
      href={href}
      type={type}
      className="text-white bg-gradient-to-r from-primary-300 to-primary-400 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
