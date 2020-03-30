import AuthModel from "../models/auth-model";
import jwt from 'jsonwebtoken';
const { check, validationResult } = require('express-validator');
const { private_key } = require("../config");
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");

router.post(
    "/signup",
    [
        check("email", "Wrong email").isEmail(),
        check("password" , "Minimum length of password - 6 digits").isLength({
            min: 6
        })
    ],
    async (req,res) => {
        try{
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                return res.status(400).send({
                    errors: errors.array(),
                    message: "Wrong registration info"
                });
            }
            
            const { email, password } = req.body;
            const candidate = await AuthModel.findOne({ email });
            
            if(candidate){
                return res.status(400).send({
                    message: "user already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new AuthModel({ email, password: hashedPassword});
            await user.save();
            res.status(201).send({ message: "user was created"});
        }
        catch(err) {
            res.status(500).send({ message: err.message});
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Type the correct email")
        .normalizeEmail()
        .isEmail(),
        check("password" , "Type your password").exists()
    ],
    async (req,res) => {
        try{
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "wrong logining info"
                });
            }

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
            
            res.send({
                token,
                userId: user._id,
                message: "your successfully logged in"
            })
        } catch{
            res.status(500).send({ message: err.message});
        }
    }
);
module.exports = router;