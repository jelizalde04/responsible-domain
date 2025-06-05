const express = require("express");
const router = express.Router();
const ResponsibleController = require("../controllers/ResponsibleController"); // Asegúrate de que la ruta sea correcta

const { validateResponsible } = require("../middlewares/validateResponsible");

/**
 * @swagger
 * /api/responsibles/{id}:
 *   put:
 *     summary: Actualiza un responsable
 *     description: Permite actualizar la información de un responsable en el sistema.
 *     tags: [Responsibles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del responsable a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
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
 *     responses:
 *       200:
 *         description: Responsable actualizado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: Responsable no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/:id", validateResponsible, ResponsibleController.updateResponsible);

module.exports = router;
