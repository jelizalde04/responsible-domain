const { validationResult } = require("express-validator");
const ResponsibleService = require("../services/ResponsibleService");

const updateResponsible = async (req, res) => {
  try {
  
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Datos de entrada inválidos",
        details: errors.array(),
      });
    }

    
    const authenticatedUserId = req.user?.id;

    const { name, email, password, contact, avatar } = req.body;

 
    const updatedResponsible = await ResponsibleService.updateResponsible(authenticatedUserId, {
      name,
      email,
      password,
      contact,
      avatar,
    });

    if (updatedResponsible) {
      return res.status(200).json({
        message: "Responsable actualizado exitosamente.",
        responsible: updatedResponsible,
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

module.exports = { updateResponsible };
