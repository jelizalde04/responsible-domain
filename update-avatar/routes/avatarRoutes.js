const express = require('express');
const multer = require('multer');
const { editAvatar } = require('../controllers/AvatarController');
const authenticateToken = require('../middlewares/auth');
const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('avatar');  

/** 
 * @swagger 
 * /avatars/update:
 *   put:
 *     summary: Editar una imagen de avatar para el usuario
 *     description: Permite a un usuario actualizar su imagen de perfil reemplazando la anterior
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
 *         description: Avatar actualizado correctamente
 *       403:
 *         description: Token no proporcionado
 *       500:
 *         description: Error al editar el avatar
 */


router.put('/update', authenticateToken, upload, editAvatar);

module.exports = router;
