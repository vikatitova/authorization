const AuthService = require('../services/auth-service');
const instanceAuthService = new AuthService();

class AuthController {
    signup = async (req, res) => {
        try {
            const { email, password } = req.body;
            await instanceAuthService.signup({ email, password });
            res.status(201).send({ message: 'user was created' });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const data = await instanceAuthService.login({ email, password });
            res.status(201).send({
                ...data,
                message: 'successfully logged in',
            });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
}

module.exports = AuthController;
