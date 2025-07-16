const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const bearerToken = token.split(' ')[1]; // Si el token viene con 'Bearer '

  try {
    const decoded = jwt.decode(bearerToken);  // Decodificamos el token sin verificar la expiración

    if (!decoded || !decoded.userId) {  // Verificamos que `userId` exista en el payload
      return res.status(401).json({ message: 'Token no válido o mal formado' });
    }

    // Aseguramos que userId es un UUID y lo guardamos en la solicitud
    req.user = {
      id: decoded.userId // UUID del usuario
    };

    next();
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    res.status(401).json({ message: 'Token no válido o mal formado' });
  }
};

module.exports = authenticateToken;
