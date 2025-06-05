const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController");

/**
 * @swagger
 * /api/responsibles/{id}:
 *   get:
 *     summary: Obtener un responsable por ID
 *     description: Permite obtener la información de un responsable por su ID.
 *     tags: [Responsibles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único del responsable.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Responsable encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 responsible:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del responsable
 *                     name:
 *                       type: string
 *                       description: Nombre del responsable
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del responsable
 *                     contact:
 *                       type: string
 *                       description: Número de contacto del responsable
 *       404:
 *         description: Responsable no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:id", ResponsibleController.getResponsibleById);  // Solo se mantendrá esta ruta

module.exports = router;
