const Responsible = require("../models/Responsible");

const deleteResponsible = async (id) => {
  const responsible = await Responsible.findByPk(id);

  if (!responsible) {
    throw new Error("Responsable no encontrado");
  }

  // Eliminar el responsable de la base de datos
  await responsible.destroy();
  return true;  // Indica que la eliminación fue exitosa
};

module.exports = { deleteResponsible };
