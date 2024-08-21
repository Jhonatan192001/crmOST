const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Obtiene el encabezado de autorización
  const authHeader = req.headers['authorization'];
  // Extrae el token del encabezado (formato: "Bearer TOKEN")
  const token = authHeader && authHeader.split(' ')[1];

  // Si no hay token, devuelve un error 401 (No autorizado)
  if (!token) {
    return res.status(401).json({ message: "Se requiere autenticación" });
  }

  // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Si el token no es válido, devuelve un error 403 (Prohibido)
      return res.status(403).json({ message: "Token inválido o expirado" });
    }
    // Si el token es válido, guarda la información del usuario en el objeto req
    req.user = user;
    next();
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    // Verifica si el rol del usuario está incluido en los roles permitidos
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };