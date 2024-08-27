import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuItems } from "../../config/MenuItems";

const Layout = ({ children, userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 1024;
      setIsTabletOrMobile(isSmall);
      // Mantener el sidebar cerrado por defecto en todos los tamaños de pantalla
      setIsSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        menuItems={menuItems}
        userRole={userRole}
        isOpen={isSidebarOpen}
        isTabletOrMobile={isTabletOrMobile}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          userRole={userRole}
          toggleSidebar={toggleSidebar}
          isTabletOrMobile={isTabletOrMobile}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  userRole: PropTypes.string.isRequired,
};

export default Layout;
