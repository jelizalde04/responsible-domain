const { responsibleDb, petDb } = require("../config/db");
const Responsible = require("../models/Responsible");
const Pet = require("../models/Pet");
const axios = require("axios");

const deleteResponsible = async (id) => {

  const petTransaction = await petDb.transaction();
  const responsibleTransaction = await responsibleDb.transaction();

  try {
    
    await Pet.destroy({
      where: { responsibleId: id },
      transaction: petTransaction,
    });

    
    const responsible = await Responsible.findByPk(id, {
      transaction: responsibleTransaction,
    });

    if (!responsible) {
      throw new Error("Responsable no encontrado");
    }

    te
    if (responsible.avatar) {
      const avatarUrl = responsible.avatar;
      
      const fileName = avatarUrl.split('/').pop();

      const deleteUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

      try {
        const response = await axios.delete(deleteUrl);
        if (response.status !== 204) {
          throw new Error("Error al eliminar la imagen de S3");
        }
        console.log('Avatar eliminado correctamente de S3');
      } catch (error) {
        console.error('Error al eliminar la imagen de S3:', error);
        throw new Error('Error al eliminar la imagen de S3');
      }
    }

    
    await responsible.destroy({ transaction: responsibleTransaction });


    await petTransaction.commit();
    await responsibleTransaction.commit();

    return responsible;
  } catch (error) {
    
    await petTransaction.rollback();
    await responsibleTransaction.rollback();

    throw error;
  }
};

module.exports = { deleteResponsible };
