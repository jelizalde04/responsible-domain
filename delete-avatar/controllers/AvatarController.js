const { deleteAvatarFromS3, deleteAvatarFromDatabase } = require('../services/AvatarService');  
const { Responsible } = require('../models/Responsible'); 


const deleteAvatar = async (req, res) => {
  const token = req.headers['authorization'];  

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const userId = req.user.id;  

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    
    const user = await Responsible.findByPk(userId);

    if (!user || !user.avatar) {
      return res.status(404).json({ message: 'No hay avatar para eliminar' });
    }

    const currentAvatarUrl = user.avatar;

   
    await deleteAvatarFromS3(currentAvatarUrl);

   
    await deleteAvatarFromDatabase(userId);

    
    res.status(200).json({ message: 'Avatar eliminado correctamente' });

  } catch (error) {
    console.error('Error al eliminar el avatar:', error);
    res.status(500).json({ message: 'Error al eliminar el avatar' });
  }
};

module.exports = { deleteAvatar };
