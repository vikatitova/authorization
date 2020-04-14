module.exports = class UserService {
    saveAvatar = async (filename, customer) => {
        customer.avatar_img = filename;
        customer.save();
    };
};
