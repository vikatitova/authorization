const UserService = require('../services/user-service');
const instanceUserService = new UserService();

module.exports = class UserController {
  
    getUsers = async (req, res) => {
        try {
            const data = await instanceUserService.getUsers(req);
            return res.status(200).send( data );
        } catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    getUser = async (req, res) => {
        try {
            const data = await instanceUserService.getUser(req);
            return res.status(200).send( data );
        } catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    addUser = async (req, res) => {
        try {
            const data = await instanceUserService.addUser(req);
            return res.status(200).send( data );
        } catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    deleteUser = async (req, res) => {
        try {
            const data = await instanceUserService.deleteUser(req);
            return res.status(200).send( data );
        } catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }

    editUser = async (req, res) => {
        try {
            const data = await instanceUserService.editUser(req);
            return res.status(200).send( data );
        } catch(err) {
            return res.status(500).send({ message: err.message });
        }
    }
}