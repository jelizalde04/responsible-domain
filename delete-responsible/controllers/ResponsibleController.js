const ResponsibleService = require("../services/ResponsibleService");

const deleteResponsible = async (req, res, next) => {
  try {
    const { id } = req.params;  // Obtenemos el ID del responsable desde los parámetros de la URL

    // Llamamos al servicio para obtener al responsable antes de eliminarlo
    const responsible = await ResponsibleService.deleteResponsible(id);

    if (responsible) {
      return res.status(200).json({
        message: "Responsable eliminado exitosamente.",
        avatar: responsible.avatar,  // Devolvemos la URL del avatar antes de eliminar al responsable
      });
    } else {
      return res.status(404).json({ message: "Responsable no encontrado." });
    }
  } catch (error) {
    console.error(error);
    return next(error);  // Pasamos el error al middleware de manejo de errores
  }
};

module.exports = { deleteResponsible };
