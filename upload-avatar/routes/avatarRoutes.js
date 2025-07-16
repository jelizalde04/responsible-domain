const express = require('express');
const multer = require('multer');
const { uploadAvatar } = require('../controllers/AvatarController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();

// Configurar Multer para cargar archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('avatar');  // 'avatar' es el nombre del campo en el formulario

/** 
 * @swagger 
 * /avatars/upload:
 *   post:
 *     summary: Subir una imagen de avatar para el usuario
 *     description: Permite a un usuario subir una imagen de perfil usando un token temporal
 *     tags: [Avatars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar subido correctamente
 *       403:
 *         description: Token no proporcionado
 *       500:
 *         description: Error al subir el avatar
 */

// Ruta POST para subir el avatar
router.post('/upload', authenticateToken, upload, uploadAvatar);

module.exports = router;
