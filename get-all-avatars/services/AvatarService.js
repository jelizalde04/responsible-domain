const axios = require('axios');
const { Responsible } = require('../models/Responsible'); 


const getAvatarAssignedFromDatabase = async (userId) => {
  try {
    const user = await Responsible.findByPk(userId);

    if (user && user.avatar) {
      return user.avatar; 
    }
    return null;  
  } catch (error) {
    console.error('Error al obtener el avatar de la base de datos:', error);
    throw new Error('Error al obtener el avatar de la base de datos');
  }
};


const getAllAvatarsFromS3 = async () => {
  try {
    const s3BucketUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/avatars/`;

    
    const response = await axios.get(s3BucketUrl); 


    if (response.status === 200 && response.data && response.data.length > 0) {
      return response.data;  
    } else {
      return [];  
    }
  } catch (error) {
    console.error('Error al obtener los avatares de S3:', error);
    return [];  
  }
};

module.exports = { getAllAvatarsFromS3, getAvatarAssignedFromDatabase };
