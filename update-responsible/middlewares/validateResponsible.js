const { body, validationResult } = require("express-validator");

const validateResponsible = [
 
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),


  body("email")
    .optional()
    .isEmail()
    .withMessage("El formato del email no es válido")
    .normalizeEmail(),


  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  
  body("contact")
    .optional()
    .isString()
    .withMessage("El contacto debe ser una cadena de texto"),


  body("avatar")
    .optional()
    .isString()
    .withMessage("El avatar debe ser una cadena de texto (URL)"),

 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Datos de entrada inválidos",
        details: errors.array(),
      });
    }
    next();
  },
];

module.exports = { validateResponsible };
