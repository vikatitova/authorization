const express = require('express');
const UserController = require('../controllers/user-controller');
const instanceUserController = new UserController();
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, instanceUserController.getUsers);
router.get('/:id', auth, instanceUserController.getUser);
router.post('/', auth, instanceUserController.addUser);
router.delete('/:id', auth, instanceUserController.deleteUser);
router.put('/', auth, instanceUserController.editUser);

module.exports = router;
