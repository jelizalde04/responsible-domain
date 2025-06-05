const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController");

/**
 * @swagger
 * /api/responsibles:
 *   get:
 *     summary: Obtener todos los responsables
 *     description: Permite obtener una lista de todos los responsables.
 *     tags: [Responsibles]
 *     responses:
 *       200:
 *         description: Responsables encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 responsibles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       contact:
 *                         type: string
 *       404:
 *         description: No se encontraron responsables.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", ResponsibleController.getAllResponsibles);  // Ruta para obtener todos los responsables

module.exports = router;
