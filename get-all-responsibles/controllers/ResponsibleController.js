const ResponsibleService = require("../services/ResponsibleService");

const getAllResponsibles = async (req, res) => {
  try {
   
    const responsibles = await ResponsibleService.getAllResponsibles();

    if (responsibles.length > 0) {
      return res.status(200).json({
        message: "Responsables encontrados.",
        responsibles,  
      });
    } else {
      return res.status(404).json({
        error: "No se encontraron responsables.",
      });  
    }
  } catch (error) {
    console.error(error);
    
    return res.status(error.status || 500).json({
      error: error.message || "Error interno del servidor",
    });
  }
};

module.exports = { getAllResponsibles };
