const express = require('express');
const router = new express.Router();
const avatarMiddleware = require('../middleware/avatar.middleware');
const AvatarController = require('../controllers/avatar-controller');
const instanceAvatarController = new AvatarController();
const auth = require('../middleware/auth');

router.use('/', [auth, avatarMiddleware], instanceAvatarController.saveAvatar);
module.exports = router;
