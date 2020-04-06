const express = require('express');
const UserController = require('../controllers/user-controller');
const instanceUserController = new UserController();
const router = new express.Router();
const auth = require('../middleware/auth');
const validationMiddleware = require('../validation/validation.middleware');
const validationUserSchema = require('../validation/model/validation-user.model');

router.get('/', auth, instanceUserController.getUsers);
router.get('/:id', auth, instanceUserController.getUser);
router.post(
    '/',
    [auth, validationMiddleware(validationUserSchema)],
    instanceUserController.addUser
);
router.delete('/:id', auth, instanceUserController.deleteUser);
router.put(
    '/',
    [auth, validationMiddleware(validationUserSchema)],
    instanceUserController.editUser
);

module.exports = router;
