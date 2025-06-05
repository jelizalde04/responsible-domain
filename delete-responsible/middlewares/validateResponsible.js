const { param, validationResult } = require("express-validator");

const validateId = [
  param("id")
    .isUUID()
    .withMessage("El ID debe ser un UUID válido"),

  // Comprobamos si hay errores y los respondemos
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Datos de entrada inválidos");
      error.status = 400;
      error.details = errors.array(); // Agregamos los detalles de los errores de validación
      return next(error);  // Pasamos el error al middleware de manejo de errores
    }
    next();
  },
];

module.exports = { validateId };
