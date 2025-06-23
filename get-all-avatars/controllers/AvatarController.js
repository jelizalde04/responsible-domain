const { getAllAvatarsFromS3, getAvatarAssignedFromDatabase } = require('../services/AvatarService');  


const getAvatars = async (req, res) => {
  const token = req.headers['authorization'];  

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const userId = req.user.id;  

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

  
    const avatarAssigned = await getAvatarAssignedFromDatabase(userId);

   
    const allAvatars = await getAllAvatarsFromS3();

   
    if (allAvatars.length === 0) {
      return res.status(200).json({
        message: 'No hay avatares disponibles en la carpeta de S3',
        avatarAssigned: avatarAssigned || null,
        allAvatars: []
      });
    }

    const avatarFound = allAvatars.find(avatar => avatar === avatarAssigned);

   
    if (avatarFound) {
      res.status(200).json({
        message: `Este es tu avatar asignado:`,
        avatarAssigned: avatarAssigned,
        allAvatars: allAvatars
      });
    } else {
      res.status(200).json({
        message: 'No tienes avatar asignado',
        allAvatars: allAvatars
      });
    }

  } catch (error) {
    console.error('Error al obtener los avatares:', error);
    res.status(500).json({ message: 'Error al obtener los avatares' });
  }
};

module.exports = { getAvatars };
