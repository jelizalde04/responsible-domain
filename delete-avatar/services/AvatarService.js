const axios = require('axios');
const { Responsible } = require('../models/Responsible');


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


const deleteAvatarFromDatabase = async (userId) => {
  try {

    const user = await Responsible.findByPk(userId);

    if (!user || !user.avatar) {
      throw new Error('El usuario no tiene avatar para eliminar');
    }

    await Responsible.update({ avatar: null }, { where: { id: userId } });

    console.log('Avatar eliminado correctamente de la base de datos');
  } catch (error) {
    console.error('Error al eliminar el avatar del usuario:', error);
    throw new Error('Error al eliminar el avatar del usuario');
  }
};

module.exports = { deleteAvatarFromS3, deleteAvatarFromDatabase };
