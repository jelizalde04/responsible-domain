const express = require('express');
const router = express.Router();
const ResponsibleController = require('../controllers/ResponsibleController');
/**
 * @swagger
 * /responsibles/getAll:
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
 *                         description: ID del responsable
 *                       name:
 *                         type: string
 *                         description: Nombre del responsable
 *                       email:
 *                         type: string
 *                         description: Correo electrónico del responsable
 *                       contact:
 *                         type: string
 *                         description: Número de contacto del responsable
 *                       avatar:
 *                         type: string
 *                         description: URL del avatar del responsable
 *       404:
 *         description: No se encontraron responsables.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/getAll", ResponsibleController.getAllResponsibles);  

module.exports = router;
