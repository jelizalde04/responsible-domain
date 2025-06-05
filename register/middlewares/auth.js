const { body, validationResult } = require("express-validator");
const Responsible = require("../models/Responsible");

// Middleware para validar el registro del responsable
const validateResponsible = [
  // Validar que el nombre no esté vacío y tenga un tamaño mínimo
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  // Validar el formato del email
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El formato del email no es válido")
    .normalizeEmail(), // Normaliza el email (convertirlo en minúsculas, etc.)

  // Validar la contraseña (mínimo de 6 caracteres, por ejemplo)
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  // Validar el campo de contacto (opcional, si se ingresa, debe ser un texto)
  body("contact")
    .optional()
    .isString()
    .withMessage("El contacto debe ser una cadena de texto"),

  // Comprobamos si hay errores y los respondemos
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Datos de entrada inválidos");
      error.status = 400;
      error.details = errors.array(); // Agregamos los detalles de los errores de validación
      return next(error); // Pasamos el error al middleware de manejo de errores
    }
    next();
  },
];

// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
  // Si no hay un código de estado, asignamos el 500 por defecto
  const statusCode = err.status || 500;
  const message = err.message || "Error interno del servidor";
  const details = err.details || null;

  // Responder con el código de estado y mensaje
  res.status(statusCode).json({
    error: message,
    details: details, // Incluimos los detalles de validación en caso de errores de entrada
  });
};

module.exports = { validateResponsible, errorHandler };
