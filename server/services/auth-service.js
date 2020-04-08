import AuthModel from '../models/auth-model';
import jwt from 'jsonwebtoken';
const { private_key } = require('../config');
const bcrypt = require('bcryptjs');

module.exports = class AuthService {
    signup = async ({ email, password }) => {
        const customer = await AuthModel.findOne({ email });

        if (customer) {
            throw new Error('Customer already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newCustomer = new AuthModel({
            email,
            password: hashedPassword,
        });
        await newCustomer.save();
    };
    login = async ({ email, password }) => {
        const customer = await AuthModel.findOne({ email });

        if (!customer) {
            throw new Error('Customer not found');
        }

        const isMatch = await bcrypt.compare(password, customer.password);

        if (!isMatch) {
            throw new Error('wrong email or password, please try again');
        }

        const token = jwt.sign({ customerId: customer._id }, private_key, {
            expiresIn: '1h',
        });

        return token;
    };
};
