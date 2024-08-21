import PropTypes from "prop-types";
import api from "../services/api"
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const verifyToken = async () => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("userRole");
        if (token && userRole) {
          try {
            await api.get('/verify-token');
            setUser({ token, role: userRole });
          } catch (error) {
            console.error('Error al verificar el token:', error);
            if (error.response && error.response.status === 404) {
              console.error('El endpoint /verify-token no existe en el servidor');
            }
            logout();
          }
        }
        setLoading(false);
      };
  
      verifyToken();
    }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
    setUser({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);