const jwt = require('jsonwebtoken');
const { private_key } = require('../config');
import AuthModel from '../models/auth-model';
import UserModel from '../models/user-model';
import { hostname, port } from '../config';

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.redirect(`http://${hostname}:${port}`);
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Wrong token on client');
        }

        const decoded = jwt.verify(token, private_key);
        const customer = await AuthModel.findById(decoded.customerId);

        if (!customer) {
            throw new Error('Customer does not exist in db');
        }

        customer.manageUsers = await UserModel.find({
            _id: { $in: customer.manageUsers },
        });

        req.customer = customer;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: `no authorization with err: ${err}` });
    }
};
