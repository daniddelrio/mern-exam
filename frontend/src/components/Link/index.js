import { Link } from "react-router-dom";

const NewLink = ({ children, ...props }) => (
  <Link {...props} style={{ color: "inherit", textDecoration: "none" }}>
    {children}
  </Link>
);

export default NewLink;
