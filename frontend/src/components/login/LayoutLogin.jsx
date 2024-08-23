import PropTypes from "prop-types";

const LayoutLogin = ({ children }) => {
    return (
      <div className="min-h-screen overflow-hidden flex items-center justify-center">
        <div
          className="fixed inset-0 z-[-1] bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/fondo.webp')" }}
        ></div>
        <main className="w-full max-w-sm mx-auto p-6">
          {children}
        </main>
      </div>
    );
  };

  LayoutLogin.propTypes = {
    children: PropTypes.node,
  }
  
  export default LayoutLogin;