const { deleteResponsible } = require("../services/ResponsibleService");

const handleDeleteResponsible = async (req, res) => {
  try {
    const authenticatedUserId = req.user?.id;  

   
    if (authenticatedUserId !== req.user?.id) {
      return res.status(403).json({
        error: "No tienes permiso para eliminar este responsable.",
      });
    }

    const responsible = await deleteResponsible(authenticatedUserId);  

    return res.status(200).json({
      message: "Responsable y sus mascotas eliminados exitosamente.",
      avatar: responsible.avatar,
    });
  } catch (error) {
    console.error(error);
    if (error.message === "Responsable no encontrado") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
};

module.exports = { handleDeleteResponsible };
