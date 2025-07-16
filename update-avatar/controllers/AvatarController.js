const { uploadAvatarToS3, updateAvatarInDatabase, deleteAvatarFromS3 } = require('../services/AvatarService');  


const editAvatar = async (req, res) => {
  const token = req.headers['authorization'];  

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    
    const currentAvatarUrl = req.user.avatar;  

    if (currentAvatarUrl) {
      
      await deleteAvatarFromS3(currentAvatarUrl);
    }

    const imageUrl = await uploadAvatarToS3(req.file, userId);

  
    await updateAvatarInDatabase(userId, imageUrl);

    
    res.status(200).json({ message: 'Avatar actualizado correctamente', imageUrl });

  } catch (error) {
    console.error('Error al actualizar el avatar:', error);
    res.status(500).json({ message: 'Error al actualizar el avatar' });
  }
};

module.exports = { editAvatar };
