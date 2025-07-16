const ResponsibleService = require("../services/ResponsibleService");

const registerResponsible = async (req, res) => {
  try {
    const { name, email, password, contact, avatar } = req.body;

    await ResponsibleService.createResponsible({
      name,
      email,
      password,
      contact,
      avatar,
    });

    return res.status(201).json({
      message: "Successfully registered.",
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      error: error.message || "Internal server error.",
    });
  }
};

module.exports = { registerResponsible };
