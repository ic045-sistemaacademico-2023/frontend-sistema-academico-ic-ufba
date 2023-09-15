const Button = ({ children, onClick }) => {
  return (
    <button
      className="text-white bg-gradient-to-r from-primary-300 to-primary-400 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
