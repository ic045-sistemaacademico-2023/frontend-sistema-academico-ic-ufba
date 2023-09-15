function Link({ children, href }) {
  return (
    <a
      className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
      href={href}
    >
      {children}
    </a>
  );
}

export default Link;
