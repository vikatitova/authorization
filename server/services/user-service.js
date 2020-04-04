import UserModel from '../models/user-model';
import AuthModel from '../models/auth-model';

module.exports = class UserService {
    getUsers = async (customerId) => {
        let users = [];
        const userAuth = await AuthModel.findById(customerId);
        const usersArrId = userAuth.manageUsers;

        for (let userId of usersArrId) {
            const user = await UserModel.findById(userId);
            users.push(user);
        }

        return users.reduce((acc, user) => {
            return [
                ...acc,
                {
                    id: user._id,
                    name: user.name,
                    age: user.age,
                },
            ];
        }, []);
    };

    getUser = async (id) => {
        const user = await UserModel.findById(id);
        return {
            name: user.name,
            age: user.age,
            id: user._id,
        };
    };

    addUser = async ({ body, customerId }) => {
        const userAuth = await AuthModel.findById(customerId);
        console.log(userAuth);
        const user = await UserModel.create(body);
        userAuth.manageUsers.push(user);
        userAuth.save();
        return {
            name: user.name,
            age: user.age,
            id: user._id,
        };
    };

    deleteUser = async (id) => {
        await AuthModel.findOneAndUpdate(
            {},
            { $pull: { manageUsers: id } },
            { useFindAndModify: false }
        );
        await UserModel.deleteOne({ _id: id });
        return req;
    };

    editUser = async (body) => {
        await UserModel.findByIdAndUpdate(
            { _id: body.id },
            {
                name: body.name,
                age: body.age,
            },
            {
                useFindAndModify: false,
            }
        );
        return body;
    };
};
