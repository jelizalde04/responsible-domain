const { body, validationResult } = require("express-validator");
const Responsible = require("../models/Responsible");

// Middleware to validate responsible registration
const validateResponsible = [
  // Validate that the name is not empty and has a minimum length
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),

  // Validate the email format
  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El formato del email no es válido")
    .normalizeEmail(), // Normalize the email (convert to lowercase, etc.)

  // Validate the password (minimum 6 characters, for example)
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  // Validate the contact field (optional, if provided, must be a string)
  body("contact")
    .optional()
    .isString()
    .withMessage("El contacto debe ser una cadena de texto"),

  // Check for errors and respond if any
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Datos de entrada inválidos");
      error.status = 400;
      error.details = errors.array(); // Add validation error details
      return next(error); // Pass the error to the error handling middleware
    }
    next();
  },
];

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  // If there is no status code, assign 500 by default
  const statusCode = err.status || 500;
  const message = err.message || "Internal server error";
  const details = err.details || null;

  // Respond with the status code and message
  res.status(statusCode).json({
    error: message,
    details: details, // Include validation details in case of input errors
  });
};

module.exports = { validateResponsible, errorHandler };