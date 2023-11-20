import { Link as RouterLink } from "react-router-dom";

function Link({ children, href }) {
  return (
    <RouterLink
      className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
      href={href}
    >
      {children}
    </RouterLink>
  );
}

export default Link;
