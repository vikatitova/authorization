const UserService = require('../services/user-service');
const instanceUserService = new UserService();

module.exports = class UserController {
    getUsers = async (req, res) => {
        try {
            const { customerId } = req.customerTokenDetails;
            console.log(customerId);
            const data = await instanceUserService.getUsers(customerId);
            return res.status(200).send(data);
        } catch (err) {
            console.log('Error', err);
            return res.status(500).send({ message: err.message });
        }
    };

    getUser = async (req, res) => {
        const { id } = req.params;
        try {
            const data = await instanceUserService.getUser(id);
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    addUser = async (req, res) => {
        const {
            body,
            customerTokenDetails: { customerId },
        } = req;
        try {
            const data = await instanceUserService.addUser({
                body,
                customerId,
            });
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const data = await instanceUserService.deleteUser(id);
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };

    editUser = async (req, res) => {
        try {
            const { body } = req;
            const data = await instanceUserService.editUser(body);
            return res.status(200).send(data);
        } catch (err) {
            return res.status(500).send({ message: err.message });
        }
    };
};
