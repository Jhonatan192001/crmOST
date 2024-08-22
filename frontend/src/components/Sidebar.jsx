import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LogOut, X } from "lucide-react";
import { cn } from "../lib/utils";
import Button from "./ui/Button";
import Logo from "../assets/logo.webp";
import LogoP from "../assets/logoP.webp";

// Componente para mostrar el popover de submenús cuando la barra lateral está cerrada
const SubMenuPopover = ({ isOpen, subItems, parentPath, top }) => {
  if (!isOpen || !subItems) return null;

  return (
    <div
      className="fixed left-20 bg-[#043F61] rounded-r-md shadow-lg z-[60] min-w-[200px]"
      style={{ top: `${top}px` }}
    >
      {subItems.map((subItem) => (
        <Link key={subItem.path} to={`${parentPath}/${subItem.path}`}>
          <Button className="w-full justify-end shadow-none">
            {subItem.name}
          </Button>
        </Link>
      ))}
    </div>
  );
};

// Componente para renderizar cada ítem del menú
const MenuItem = ({ item, isActive, isOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [popoverTop, setPopoverTop] = useState(0);

  // Efecto para cerrar el submenú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejo de clic para ítems con submenús
  const handleItemClick = (event) => {
    if (item.subItems) {
      event.preventDefault();
      setIsSubMenuOpen(!isSubMenuOpen);
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        setPopoverTop(rect.top);
      }
    }
  };

  // Clases condicionales para los botones del menú
  const buttonClasses = cn(
    "w-full transition-all duration-300 px-4 py-2",
    isOpen ? "justify-start" : "justify-center",
    (isActive || isSubMenuOpen) && "bg-[#083344]"
  );

  const iconClasses = cn("transition-all duration-300", isOpen ? "mr-3" : "");

  const contentClasses = cn(
    "flex items-center",
    isOpen ? "justify-start w-full" : "justify-center"
  );

  // Renderizado condicional para ítems con submenús
  if (item.subItems) {
    return (
      <div ref={menuRef} className="relative">
        <Button
          className={cn(buttonClasses, isOpen && "justify-between")}
          icon={isOpen ? ChevronDown : null}
          iconPosition="right"
          onClick={handleItemClick}
        >
          <span className={contentClasses}>
            <item.icon size={20} className={iconClasses} />
            {isOpen && <span>{item.name}</span>}
          </span>
        </Button>
        {isOpen ? (
          // Submenú desplegable para barra lateral abierta
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isSubMenuOpen ? "max-h-96 my-3" : "max-h-0"
            )}
          >
            {item.subItems.map((subItem) => (
              <Link key={subItem.path} to={`${item.path}/${subItem.path}`}>
                <Button
                  className={cn(
                    "ml-9 justify-end border-l-2 border-white w-full",
                    isActive == "bg-[#083344]"
                  )}
                >
                  {subItem.name}
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          // Popover para barra lateral cerrada
          <SubMenuPopover
            isOpen={isSubMenuOpen}
            subItems={item.subItems}
            parentPath={item.path}
            top={popoverTop}
          />
        )}
      </div>
    );
  }

  // Renderizado para ítems sin submenús
  return (
    <Link to={item.path}>
      <Button className={buttonClasses}>
        <span className={contentClasses}>
          <item.icon size={20} className={iconClasses} />
          {isOpen && <span>{item.name}</span>}
        </span>
      </Button>
    </Link>
  );
};

// Componente principal Sidebar
const Sidebar = ({
  menuItems,
  userRole,
  isOpen,
  isTabletOrMobile,
  toggleSidebar,
}) => {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "bg-[#043F61] h-screen flex flex-col transition-all duration-300 ease-in-out",
        isTabletOrMobile ? "fixed z-50" : "relative",
        isOpen ? "w-64" : isTabletOrMobile ? "w-0" : "w-20"
      )}
    >
      {/* Encabezado del Sidebar con logo */}
      <div
        className={cn(
          "p-4 flex items-center",
          isOpen ? "justify-between" : "justify-center"
        )}
      >
        {isOpen ? (
          <>
            <img src={Logo} alt="OST Logo" className="w-32" />
            {isTabletOrMobile && (
              <button onClick={toggleSidebar} className="text-white">
                <X size={24} />
              </button>
            )}
          </>
        ) : (
          !isTabletOrMobile && (
            <img src={LogoP} alt="OST Logo" className="w-7" />
          )
        )}
      </div>
      {/* Navegación principal */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems
          .filter((item) => item.roles.includes(userRole))
          .map((item) => (
            <MenuItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.path}
              isOpen={isOpen}
            />
          ))}
      </nav>
      {/* Botón de Cerrar Sesión */}
      <div className="py-4">
        <Button
          className={cn(
            "w-full px-4 py-2",
            isOpen ? "justify-start" : "justify-center"
          )}
        >
          <span
            className={cn(
              "flex items-center",
              isOpen ? "justify-start w-full" : "justify-center"
            )}
          >
            <LogOut size={20} className={cn(isOpen ? "mr-3" : "")} />
            {isOpen && <span>Cerrar Sesión</span>}
          </span>
        </Button>
      </div>
    </aside>
  );
};

// Definición de PropTypes para validación de props
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
  isOpen: PropTypes.bool.isRequired,
  isTabletOrMobile: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
