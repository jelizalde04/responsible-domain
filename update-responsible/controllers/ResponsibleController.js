const { validationResult } = require("express-validator");
const ResponsibleService = require("../services/ResponsibleService");

const updateResponsible = async (req, res, next) => {
  try {
    // Validar los errores de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Datos de entrada inválidos");
      error.status = 400;
      error.details = errors.array(); 
      return next(error); 
    }

    const { id } = req.params;
    const { name, email, password, contact } = req.body;

    // Llamar al servicio para actualizar el responsable
    const updatedResponsible = await ResponsibleService.updateResponsible(id, {
      name,
      email,
      password,
      contact,
    });

    if (updatedResponsible) {
      return res.status(200).json({
        message: "Responsable actualizado exitosamente.",
        responsible: updatedResponsible,
      });
    } else {
      return res.status(404).json({ message: "Responsable no encontrado." });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = { updateResponsible };
