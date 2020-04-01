const express = require("express");
const router = new express.Router();
const validateMiddleware = require('../middleware/validation-middleware');
const createUserSchema = require('../models/validation-model');
const AuthController = require('../controllers/auth-controller');
const instanceAuthController = new AuthController();

router.post(
    "/signup",
    validateMiddleware(createUserSchema),
    instanceAuthController.signup
);

router.post(
    "/login", 
    validateMiddleware(createUserSchema),
    instanceAuthController.login
);
module.exports = router;