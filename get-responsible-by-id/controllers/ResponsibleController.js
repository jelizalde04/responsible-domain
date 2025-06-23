const ResponsibleService = require("../services/ResponsibleService");

const getResponsibleById = async (req, res) => {
  try {
    const authenticatedUserId = req.user?.id; 

    const responsible = await ResponsibleService.getResponsibleById(authenticatedUserId);

    if (responsible) {
      return res.status(200).json({
        message: "Responsable encontrado.",
        responsible,
      });
    } else {
      return res.status(404).json({
        error: "Responsable no encontrado.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};

module.exports = { getResponsibleById };
