import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { menuItems } from "../config/MenuItems";

const Layout = ({ children, userRole }) => {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar menuItems={menuItems} userRole={userRole} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header userRole={userRole} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
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
