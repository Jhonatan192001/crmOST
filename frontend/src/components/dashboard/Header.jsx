import PropTypes from "prop-types";
import { Bell, Menu } from "lucide-react";

const Header = ({ userRole, toggleSidebar, isTabletOrMobile }) => {
  return (
    <header className="bg-white h-16 flex items-center justify-between px-4 shadow-md">
      <div className="flex-1 flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-800 mr-4"
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="flex items-center space-x-4 mr-6">
        <div className="flex items-center space-x-2">
          <img
            src="/path-to-user-avatar.jpg"
            alt="User avatar"
            className="w-8 h-8 rounded-full"
          />
          {/* <span className="text-gray-700 font-medium hidden sm:inline">{userRole}</span> */}
        </div>
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={24} />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            2
          </span>
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  userRole: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  isTabletOrMobile: PropTypes.bool.isRequired,
};

export default Header;