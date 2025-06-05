const { param } = require("express-validator");

const validateId = [
  param("id")
    .isUUID()
    .withMessage("El ID debe ser un UUID válido"),
];

module.exports = { validateId };
