const Responsible = require("../models/Responsible");

const getAllResponsibles = async () => {
  // Usamos findAll para obtener todos los responsables de la base de datos
  const responsibles = await Responsible.findAll();  // Obtenemos todos los responsables

  return responsibles;  // Retorna todos los responsables, incluido el avatar
};

module.exports = { getAllResponsibles };  // Asegúrate de exportar correctamente
