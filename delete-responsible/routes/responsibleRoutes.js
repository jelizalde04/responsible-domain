const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController");  
const authenticateToken = require("../middlewares/auth");  

/**
 * @swagger
 * /responsibles:
 *   delete:
 *     summary: Eliminar un responsable autenticado
 *     description: Permite eliminar el responsable autenticado (basado en token).
 *     tags: [Responsibles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Responsable eliminado exitosamente.
 *       404:
 *         description: Responsable no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.delete("/", authenticateToken, ResponsibleController.handleDeleteResponsible);  

module.exports = router;
