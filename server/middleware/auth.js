const jwt = require('jsonwebtoken');
const { private_key } = require('../config');
import AuthModel from '../models/auth-model';

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Wrong token on client');
        }

        const decoded = jwt.verify(token, private_key);

        const customerAuth = await AuthModel.findById(decoded.customerId);
        if (!customerAuth) {
            throw new Error('Customer does not exist in db');
        }
        req.customerTokenDetails = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: `no authorization with err: ${err}` });
    }
};
