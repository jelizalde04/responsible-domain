const ResponsibleService = require("../services/ResponsibleService");

const getResponsibleById = async (req, res, next) => {
  try {
    const { id } = req.params;  // Obtenemos el ID del responsable desde los parámetros de la URL

    // Llamamos al servicio para obtener al responsable
    const responsible = await ResponsibleService.getResponsibleById(id);

    // Si el responsable existe, retornamos su información
    if (responsible) {
      return res.status(200).json({
        message: "Responsable encontrado.",
        responsible,  // Devolvemos los datos del responsable
      });
    } else {
      return res.status(404).json({ message: "Responsable no encontrado." });  // Error si no existe
    }
  } catch (error) {
    console.error(error);
    return next(error);  // Pasamos el error al middleware de manejo de errores
  }
};

module.exports = { getResponsibleById };
