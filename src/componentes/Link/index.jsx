import { Link as RouterLink } from "react-router-dom";

function Link({ children, href, className }) {
  return (
    <div className={className}>
      <RouterLink
        className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
        to={href}
      >
        {children}
      </RouterLink>
    </div>
  );
}

export default Link;
