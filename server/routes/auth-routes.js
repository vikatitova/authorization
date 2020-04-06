const express = require('express');
const router = new express.Router();
const validationMiddleware = require('../validation/validation.middleware');
const validationAuthSchema = require('../validation/model/validation-auth.model');
const AuthController = require('../controllers/auth-controller');
const instanceAuthController = new AuthController();

router.post(
    '/signup',
    validationMiddleware(validationAuthSchema),
    instanceAuthController.signup
);

router.post(
    '/login',
    validationMiddleware(validationAuthSchema),
    instanceAuthController.login
);
module.exports = router;
