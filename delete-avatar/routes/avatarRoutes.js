const express = require('express');
const { deleteAvatar } = require('../controllers/AvatarController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

/** 
 * @swagger 
 * /avatars/delete:
 *   delete:
 *     summary: Eliminar el avatar de un usuario
 *     description: Permite a un usuario eliminar su avatar de perfil
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Avatar eliminado correctamente
 *       403:
 *         description: Token no proporcionado
 *       500:
 *         description: Error al eliminar el avatar
 */


router.delete('/delete', authenticateToken, deleteAvatar);

module.exports = router;
