const ResponsibleService = require("../services/ResponsibleService");

const registerResponsible = async (req, res, next) => {
  try {
    const { name, email, password, contact, avatar } = req.body; // Incluimos 'avatar' aquí
    const responsible = await ResponsibleService.createResponsible({
      name,
      email,
      password,
      contact,
      avatar, 
    });
    return res.status(201).json({
      message: "Usuario creado exitosamente.",
      responsible,
    });
  } catch (error) {
    console.error(error);
    return next(error); 
  }
};

module.exports = { registerResponsible };
