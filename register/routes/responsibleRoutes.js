const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController");
const { validateResponsible } = require("../middlewares/auth"); // Usamos la validación desde auth.js

/**
 * @swagger
 * /api/responsibles/register:
 *   post:
 *     summary: Registra un nuevo responsable
 *     description: Crea una nueva cuenta para un responsable en el sistema.
 *     tags: [Responsibles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del responsable
 *               email:
 *                 type: string
 *                 description: Correo electrónico del responsable
 *               password:
 *                 type: string
 *                 description: Contraseña del responsable
 *               contact:
 *                 type: string
 *                 description: Información de contacto del responsable
 *               avatar:
 *                 type: string
 *                 description: URL del avatar (opcional)
 *     responses:
 *       201:
 *         description: Responsable registrado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/register", validateResponsible, ResponsibleController.registerResponsible);

module.exports = router;
