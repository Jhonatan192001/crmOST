import PropTypes from "prop-types";

const Header = ({ userRole }) => {
  return (
    <header className="header">
      <h1>{userRole === "admin" ? "Admin Portal" : "User Portal"}</h1>
      {/* Aquí puedes añadir más contenido del header dependiendo del rol */}
    </header>
  );
};

Header.propTypes = {
  userRole: PropTypes.string,
};

export default Header;
