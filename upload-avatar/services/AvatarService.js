const axios = require('axios');
const { Responsible } = require('../models/Responsible');  // Asegúrate de que esté correctamente importado

// Función para subir el avatar a S3 y devolver la URL pública
const uploadAvatarToS3 = async (file, userId) => {
  const fileName = `${userId}_avatar.jpg`;  // Nombre del archivo con el ID del usuario

  const uploadUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/avatars/${fileName}`;

  try {
    // Usamos Axios para hacer el PUT request a S3
    const response = await axios.put(uploadUrl, file.buffer, {
      headers: {
        'Content-Type': file.mimetype,  // El tipo de archivo (ej. image/jpeg)
      },
    });

    if (response.status === 200) {
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/avatars/${fileName}`;
      return imageUrl;  // Devuelve la URL pública del avatar subido
    } else {
      throw new Error('Error al subir la imagen a S3');
    }
  } catch (error) {
    console.error('Error al subir la imagen a S3:', error);
    throw new Error('Error al subir la imagen a S3');
  }
};

// Función para actualizar la URL del avatar en la base de datos utilizando el userId directamente
const updateAvatarInDatabase = async (userId, imageUrl) => {
  try {
    // Usamos `Responsible.update` para actualizar el avatar sin hacer una búsqueda previa
    await Responsible.update({ avatar: imageUrl }, { where: { id: userId } });
  } catch (error) {
    console.error('Error al actualizar el avatar en la base de datos:', error);
    throw new Error('Error al actualizar el avatar');
  }
};

module.exports = { uploadAvatarToS3, updateAvatarInDatabase };
