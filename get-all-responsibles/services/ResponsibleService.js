const Responsible = require("../models/Responsible"); 

const getAllResponsibles = async () => {
  try {
   
    const responsibles = await Responsible.findAll();

    if (!responsibles || responsibles.length === 0) {
     
      const error = new Error("No se encontraron responsables.");
      error.status = 404;
      throw error; 
    }

    return responsibles; 
  } catch (error) {
    console.error("Error al obtener los responsables:", error.message);
   
    throw new Error("Error al obtener los responsables.");
  }
};

module.exports = { getAllResponsibles };
