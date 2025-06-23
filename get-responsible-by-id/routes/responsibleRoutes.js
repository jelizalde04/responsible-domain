const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController");
const authenticateToken = require("../middlewares/auth");  // Middleware que decodifica el token

/**
 * @swagger
 * /responsibles:
 *   get:
 *     summary: Obtener el responsable autenticado
 *     description: Retorna la información del responsable autenticado mediante el token.
 *     tags: [Responsibles]
 *     security:
 *       - bearerAuth: []
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
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     contact:
 *                       type: string
 *                     avatar:
 *                       type: string
 *       401:
 *         description: Token no proporcionado.
 *       403:
 *         description: Token inválido o expirado.
 *       404:
 *         description: Responsable no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", authenticateToken, ResponsibleController.getResponsibleById);

module.exports = router;
