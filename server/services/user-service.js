
import UserModel from "../models/user-model";
import AuthModel from "../models/auth-model";


module.exports = class UserService {

    getUsers = async (req) =>{ 
        let users = [];
        const userAuth = await AuthModel.findById(req.user.userId);
        const userArrId = userAuth.manageUsers;

        for (let userId of usersArrId) {
            const user = await UserModel.findById(userId);
            users.push(user);
        }

        return users.reduce((acc,user) =>{
            return [ ...acc,
            {
                id: user._id,
                name: user.name,
                age:user.age
            }
        ];
        }, []);
    };

    getUser = async (req) => {
        const user = await UserModel.findById(req.params.id) ;
       return {
           name: user.name,
           age: user.age,
           id: user._id
       };
    };

    addUser = async (req) =>{
        const userAuth = await AuthModel.findById(req.user.userId);
        const user = await UserModel.create(req.body);
        userAuth.manageUsers.push(user);
        userAuth.save();
        return {
            name:user.name,
            age:user.age,
            id: user._id
        };
    };

    deleteUser = async (req) => {
        await AuthModel.findOneAndUpdate(
            {},
            { $pull: { manageUsers:req.params.id }},
            { useFindAndModify: false }
            );
            await UserModel.deleteOne({ _id: req.params.id });
            return req;
    };
    

    editUser = async (req) =>{
        await UserModel.findByIdAndUpdate(
            { _id: req.body.id },
            {
                name:req.body.name,
                age: req.body.age
            },
            {
                useFindAndModify: false
            }
        );
        return req.body;
    };

}