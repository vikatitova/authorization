const AvatarService = require('../services/avatar-service');
const instanceAvatarService = new AvatarService();

class AvatarController {
    saveAvatar = async (req, res) => {
        try {
            const { path } = req.file;
            await instanceAvatarService.saveAvatar(
                req.file.filename,
                req.customer
            );
            res.status(201).send({
                message: 'Avatar was saved',
                path: path.substr(7),
            });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
}

module.exports = AvatarController;
