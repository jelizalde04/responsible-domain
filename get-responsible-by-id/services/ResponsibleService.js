const Responsible = require("../models/Responsible");

const getResponsibleById = async (id) => {
  const responsible = await Responsible.findByPk(id);  // Usamos `findByPk` para buscar por ID

  return responsible;  // Si no lo encuentra, devolverá null por defecto
};

module.exports = { getResponsibleById };
