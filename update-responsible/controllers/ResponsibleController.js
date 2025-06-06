const { validationResult } = require("express-validator"); // Asegúrate de que esté importado
const ResponsibleService = require("../services/ResponsibleService");

const updateResponsible = async (req, res, next) => {
  try {
    // Validar los errores de entrada
    const errors = validationResult(req); // Verifica si hay errores en los datos de entrada
    if (!errors.isEmpty()) {
      const error = new Error("Datos de entrada inválidos");
      error.status = 400;
      error.details = errors.array(); 
      return next(error); // Si hay errores, pasamos al manejador de errores
    }

    const { id } = req.params;
    const { name, email, password, contact, avatar } = req.body;

    // Llamar al servicio para actualizar el responsable
    const updatedResponsible = await ResponsibleService.updateResponsible(id, {
      name,
      email,
      password,
      contact,
      avatar, // Incluye el avatar
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
