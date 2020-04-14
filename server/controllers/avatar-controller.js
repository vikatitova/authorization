const AvatarService = require('../services/avatar-service');
const instanceAvatarService = new AvatarService();

class AvatarController {
    saveAvatar = async (req, res) => {
        try {
            await instanceAvatarService.saveAvatar(
                req.file.filename,
                req.customer
            );
            res.status(201).send({ message: 'Avatar was saved' });
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    };
}

module.exports = AvatarController;
