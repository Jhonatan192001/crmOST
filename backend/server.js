// Importaciones de módulos
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const pool = require('./config/db');
const { authenticateToken, authorizeRole } = require('./middlewares/auth');

// Carga las variables de entorno
require('dotenv').config();

// Inicializa la aplicación Express
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Ruta de login
app.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Buscar el usuario en la base de datos
    const [users] = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = users[0];

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Obtener el rol del usuario
    const [roles] = await pool.query('SELECT role FROM rol WHERE id_rol = ?', [user.id_rol]);
    const userRole = roles[0].role;

    // Genera el token JWT
    const token = jwt.sign(
      { id: user.id, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: userRole });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Rutas protegidas
app.get('/admin-dashboard', authenticateToken, authorizeRole(['Administrador']), (req, res) => {
  res.json({ message: 'Bienvenido al dashboard de administrador' });
});

app.get('/user-dashboard', authenticateToken, authorizeRole(['asesor']), (req, res) => {
  res.json({ message: 'Bienvenido al dashboard de asesor' });
});

app.get('/verify-token', authenticateToken, (req, res) => {
  // Si llegamos aquí, el token es válido
  res.json({ valid: true, user: req.user });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


// funcion para actualizar contraseñas
// async function updatePassword() {
//   const newPassword = '56789'; // La nueva contraseña que quieres usar
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
  
//   try {
//     await pool.query('UPDATE usuario SET password = ? WHERE username = ?', [hashedPassword, 'asesor@gmail.com']);
//     console.log('Contraseña actualizada exitosamente');
//   } catch (error) {
//     console.error('Error al actualizar la contraseña:', error);
//   }
// }

// updatePassword();