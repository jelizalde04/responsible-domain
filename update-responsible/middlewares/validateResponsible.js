const { body, validationResult } = require("express-validator");

const validateResponsible = [
  // Validar que el nombre no esté vacío y tenga un tamaño mínimo
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  // Validar el formato del email (solo si el email se proporciona)
  body("email")
    .optional() // Cambiado a optional
    .isEmail()
    .withMessage("El formato del email no es válido")
    .normalizeEmail(), // Normaliza el email (convertirlo en minúsculas, etc.)

  // Validar la contraseña (solo si se proporciona)
  body("password")
    .optional() // Cambiado a optional
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  // Validar el campo de contacto (opcional, si se ingresa, debe ser un texto)
  body("contact")
    .optional()
    .isString()
    .withMessage("El contacto debe ser una cadena de texto"),

  // Validar el campo avatar (opcional, pero debe ser una cadena si se envía)
  body("avatar")
    .optional()  // Avatar es un campo opcional
    .isString()
    .withMessage("El avatar debe ser una cadena de texto (URL)"),

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

module.exports = { validateResponsible };
