const Responsible = require("../models/Responsible");

const getResponsibleById = async (id) => {
  const responsible = await Responsible.findByPk(id);  // Usamos `findByPk` para buscar por ID

  if (!responsible) {
    throw new Error("Responsable no encontrado");
  }

  return responsible;  // Devolvemos el responsable encontrado
};

module.exports = { getResponsibleById };
