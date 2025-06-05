const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController");
const { validateId } = require("../middlewares/validateResponsible");  // Middleware para validar el ID

/**
 * @swagger
 * /api/responsibles/{id}:
 *   delete:
 *     summary: Eliminar un responsable
 *     description: Permite eliminar un responsable por su ID.
 *     tags: [Responsibles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del responsable a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Responsable eliminado exitosamente.
 *       404:
 *         description: Responsable no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id", validateId, ResponsibleController.deleteResponsible);  // Ruta para eliminar un responsable

module.exports = router;
