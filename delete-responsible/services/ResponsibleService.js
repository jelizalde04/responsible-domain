const Responsible = require("../models/Responsible");
const fs = require('fs');
const path = require('path');

const deleteResponsible = async (id) => {
  // Obtenemos el responsable con el avatar
  const responsible = await Responsible.findByPk(id);

  if (!responsible) {
    throw new Error("Responsable no encontrado");
  }

  // Si existe el avatar, podemos eliminar el archivo si es necesario
  if (responsible.avatar) {
    const avatarPath = path.join(__dirname, '..', 'uploads', responsible.avatar);  // Cambia esta ruta dependiendo de tu estructura de carpetas

    // Eliminar el archivo del sistema (si existe)
    if (fs.existsSync(avatarPath)) {
      fs.unlinkSync(avatarPath);  // Elimina el archivo de la carpeta de uploads
    }
  }

  // Eliminar el responsable de la base de datos
  await responsible.destroy();
  return responsible;  // Retornamos el responsable eliminado para usarlo en el controlador si se necesita el avatar
};

module.exports = { deleteResponsible };
