const { body, validationResult } = require("express-validator");
const Responsible = require("../models/Responsible");

const validateResponsible = [
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .normalizeEmail()
    .custom(async (email) => {
      const existingResponsible = await Responsible.findOne({
        where: { email },
      });
      if (existingResponsible) {
        throw new Error("This email is already registered.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),

  body("contact")
    .optional()
    .isString()
    .withMessage("Contact must be a string."),

  // Validation error handler inline
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Invalid input data.",
        details: errors.array(),
      });
    }
    next();
  },
];

module.exports = { validateResponsible };
