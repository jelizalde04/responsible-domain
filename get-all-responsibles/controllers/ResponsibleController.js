const ResponsibleService = require("../services/ResponsibleService");

const getAllResponsibles = async (req, res, next) => {
  try {
    // Llamamos al servicio para obtener todos los responsables
    const responsibles = await ResponsibleService.getAllResponsibles();

    if (responsibles.length > 0) {
      return res.status(200).json({
        message: "Responsables encontrados.",
        responsibles,  // Devolvemos los responsables encontrados, incluyendo el avatar
      });
    } else {
      return res.status(404).json({ message: "No se encontraron responsables." });  // Si no hay responsables
    }
  } catch (error) {
    console.error(error);
    return next(error);  // Pasamos el error al middleware de manejo de errores
  }
};

module.exports = { getAllResponsibles };
