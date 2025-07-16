const express = require('express');
const { getAvatars } = require('../controllers/AvatarController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

/** 
 * @swagger 
 * /avatars/get:
 *   get:
 *     summary: Obtener el avatar asignado y todos los avatares en S3
 *     description: Permite a un usuario obtener su avatar asignado y los demás avatares disponibles en la carpeta S3
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Avatar asignado y todos los avatares obtenidos correctamente
 *       403:
 *         description: Token no proporcionado
 *       500:
 *         description: Error al obtener los avatares
 */

router.get('/get', authenticateToken, getAvatars);

module.exports = router;
