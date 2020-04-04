const express = require('express');
const router = new express.Router();
const validationCustomerMiddleware = require('../validation/validation-customer.middleware');
const validationCustomerSchema = require('../validation/validation-customer.model');
const AuthController = require('../controllers/auth-controller');
const instanceAuthController = new AuthController();

router.post(
    '/signup',
    validationCustomerMiddleware(validationCustomerSchema),
    instanceAuthController.signup
);

router.post(
    '/login',
    validationCustomerMiddleware(validationCustomerSchema),
    instanceAuthController.login
);
module.exports = router;
