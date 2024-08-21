import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from 'lucide-react';
import { cn } from "../lib/utils"
import Button from "./ui/Button";
import Logo from "../../public/logo.webp"

// Componente MenuItem: representa un único elemento de menú o un submenú.
const MenuItem = ({ item, isOpen, isActive }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
    // Si el elemento tiene subelementos, renderice un submenú.
    if (item.subItems) {
      return (
        <div>
          <Button
            className={cn(
              "w-full justify-between text-left shadow-none bg-[#083344]",
              isOpen ? "px-4" : "px-2",
              (isActive || isSubMenuOpen) && "bg-[#083344]"
            )}
            icon={item.icon}
            icon={ChevronDown}
            iconPosition="right"
            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
          >
            {isOpen ? item.name : <item.icon size={20} />}
          </Button>
          <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", 
            isSubMenuOpen && isOpen ? "max-h-96" : "max-h-0")}>
            {item.subItems.map((subItem) => (
              <Link key={subItem.path} to={subItem.path}>
                <Button className="w-full text-left px-6 py-2 shadow-none bg-[#083344]">{subItem.name}</Button>
              </Link>
            ))}
          </div>
        </div>
      );
    }
  
    // Si el elemento no tiene subelementos, renderice un solo elemento de menú
    return (
      <Link to={item.path}>
        <Button
          className={cn("w-full justify-start shadow-none", 
            isOpen ? "px-4" : "px-2",
            isActive && "bg-[#083344]"
          )}
          icon={item.icon}
        >
          {isOpen && item.name}
        </Button>
      </Link>
    );
  };
  
// Componente de barra lateral: representa toda la barra lateral
const Sidebar = ({ menuItems, userRole }) => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation(); // Obtener la ubicación actual
  
    return (
      <aside
        className={cn(
          "bg-[#083344] text-white h-screen transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-16"
        )}
      >
        <div className="flex justify-between items-center p-4">
          {isOpen && <img src={Logo} alt="OST Logo" className="w-32" />}
          <Button
            className="p-2 bg-[#083344] shadow-none"
            icon={Menu}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <nav>
          {menuItems.filter(item => item.roles.includes(userRole)).map((item) => (
            <MenuItem 
              key={item.name} 
              item={item} 
              isOpen={isOpen} 
              isActive={location.pathname === item.path} 
            />
          ))}
        </nav>
      </aside>
    );
  };
  
// PropTypes para verificación de tipos
Sidebar.propTypes = {
    menuItems: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string,
        icon: PropTypes.elementType.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
        subItems: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired,
          })
        ),
      })
    ).isRequired,
    userRole: PropTypes.string.isRequired,
  };
  
export default Sidebar;