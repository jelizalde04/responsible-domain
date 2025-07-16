const axios = require('axios');
const { Responsible } = require('../models/Responsible'); 


const uploadAvatarToS3 = async (file, userId) => {
  
  const fileName = `avatars/${userId}_avatar.jpg`; 

  const uploadUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

  try {
    
    const response = await axios.put(uploadUrl, file.buffer, {
      headers: {
        'Content-Type': file.mimetype,  
      },
    });

    if (response.status === 200) {
      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
      return imageUrl;  
    } else {
      throw new Error('Error al subir la imagen a S3');
    }
  } catch (error) {
    console.error('Error al subir la imagen a S3:', error);
    throw new Error('Error al subir la imagen a S3');
  }
};


const deleteAvatarFromS3 = async (avatarUrl) => {
  try {
   
    const fileName = avatarUrl.split('/').pop();

    const deleteUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/avatars/${fileName}`;

    
    const response = await axios.delete(deleteUrl);

    if (response.status === 204) {
      console.log('Avatar eliminado correctamente de S3');
    } else {
      throw new Error('Error al eliminar la imagen de S3');
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de S3:', error);
    throw new Error('Error al eliminar la imagen de S3');
  }
};


const updateAvatarInDatabase = async (userId, imageUrl) => {
  try {
   
    await Responsible.update({ avatar: imageUrl }, { where: { id: userId } });
  } catch (error) {
    console.error('Error al actualizar el avatar en la base de datos:', error);
    throw new Error('Error al actualizar el avatar');
  }
};

module.exports = { uploadAvatarToS3, updateAvatarInDatabase, deleteAvatarFromS3 };
