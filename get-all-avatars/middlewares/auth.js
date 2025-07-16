const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const bearerToken = token.split(' ')[1]; 

  try {
    const decoded = jwt.decode(bearerToken);  

    if (!decoded || !decoded.userId) {  
      return res.status(401).json({ message: 'Token no válido o mal formado' });
    }

    req.user = {
      id: decoded.userId 
    };

    next();
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    res.status(401).json({ message: 'Token no válido o mal formado' });
  }
};

module.exports = authenticateToken;
