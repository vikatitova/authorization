import AuthModel from "../models/auth-model";
import jwt from "jsonwebtoken";
const {private_key } = require("../config");
const bcrypt = require("bcryptjs");

module.exports = class AuthService{
    signup = async (req, res) => {
        try{
        const { email, password } = req.body;
        const candidate = await AuthModel.findOne({ email });
        
        if(candidate){ 
            return res.status(400).send({
                message: "user already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);    //вынести в сервис
        const user = new AuthModel({ email, password: hashedPassword});
        await user.save();
    } catch (err){
        res.status(500).send({message: err.message});
    }
    }
    login = async (req, res) => {
        try{
            const { email, password } = req.body;
            const user = await AuthModel.findOne({ email });

            if(!user) {
                return res.status(400).send({ message: "user not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res
                .status(400)
                .send({ message: "wrong email or password, please try again"});
            }

            const token = jwt.sign(
                {userId: user._id},
                private_key,
                { expiresIn: "1h"}
            );
            
            return{
                token,
                userId: user._id,
            };
    }catch (err) {
        res.status(500).send({message:err.message})
    }
}
}