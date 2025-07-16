const express = require('express');
const router = express.Router();
const ResponsibleController = require('../controllers/ResponsibleController');
const { validateResponsible } = require('../middlewares/validateResponsible');
const authenticateToken = require('../middlewares/auth');

/**
 @swagger
 * /responsibles/update:
 *   put:
 *     summary: Actualiza un responsable autenticado
 *     description: Permite al responsable autenticado actualizar su propia información.
 *     tags: [Responsibles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               contact:
 *                 type: string
 *               avatar:  
 *                 type: string
 *     responses:
 *       200:
 *         description: Responsable actualizado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       401:
 *         description: Token no proporcionado.
 *       403:
 *         description: Token inválido o expirado.
 *       404:
 *         description: Responsable no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/update", authenticateToken, validateResponsible, ResponsibleController.updateResponsible);

module.exports = router;
