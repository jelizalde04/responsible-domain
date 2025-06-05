const ResponsibleService = require("../services/ResponsibleService");

const registerResponsible = async (req, res, next) => {
  try {
    const { name, email, password, contact } = req.body;
    const responsible = await ResponsibleService.createResponsible({
      name,
      email,
      password,
      contact,
    });
    return res.status(201).json({
      message: "Usuario creado exitosamente.",
      responsible,
    });
  } catch (error) {
    console.error(error);
    return next(error); // Pasamos el error al middleware de manejo de errores
  }
};

module.exports = { registerResponsible };
