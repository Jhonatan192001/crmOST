import axios from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir el token de autenticación a todas las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Función de login
export const login = async (username, password) => {
  const response = await api.post('/', { username, password });
  return response.data;
};

// Función para obtener datos del dashboard de administrador
export const getAdminDashboard = async () => {
  const response = await api.get('/admin-dashboard');
  return response.data;
};

// Función para obtener datos del dashboard de usuario
export const getUserDashboard = async () => {
  const response = await api.get('/user-dashboard');
  return response.data;
};

export default api;