const { uploadAvatarToS3, updateAvatarInDatabase } = require('../services/AvatarService');  // Importar las funciones necesarias

// Función para manejar la subida de un nuevo avatar (POST)
const uploadAvatar = async (req, res) => {
  const token = req.headers['authorization'];  // Token enviado en el encabezado

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const userId = req.user.id;  // Obtener el ID del usuario desde el token decodificado

    if (!userId) {
      return res.status(400).json({ message: 'ID de usuario no válido' });
    }

    // Subir el archivo a S3 y obtener la URL pública
    const imageUrl = await uploadAvatarToS3(req.file, userId);

    // Actualizar la URL del avatar en la base de datos
    await updateAvatarInDatabase(userId, imageUrl);

    // Devolver la respuesta con la URL de la imagen subida
    res.status(200).json({ message: 'Avatar actualizado correctamente', imageUrl });

  } catch (error) {
    console.error('Error al subir el avatar:', error);
    res.status(500).json({ message: 'Error al subir el avatar' });
  }
};

module.exports = { uploadAvatar };
