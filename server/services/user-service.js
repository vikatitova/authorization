import UserModel from '../models/user-model';
import AuthModel from '../models/auth-model';

module.exports = class UserService {
    getUsers = async (customer) =>
        customer.manageUsers.reduce((acc, user) => {
            return [
                ...acc,
                {
                    id: user._id,
                    name: user.name,
                    age: user.age,
                },
            ];
        }, []);

    getUser = async (id) => {
        const user = await UserModel.findById(id);
        return {
            name: user.name,
            age: user.age,
            id: user._id,
        };
    };

    addUser = async ({ body, customer }) => {
        const user = await UserModel.create(body);
        customer.manageUsers.push(user);
        customer.save();
        return {
            id: user._id,
            name: user.name,
            age: user.age,
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
