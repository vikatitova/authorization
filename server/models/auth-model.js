import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    manageUsers: [
        {
            type: Types.ObjectId,
            ref: "UserModel"
        }
    ]
});

export default model("AuthModel", userSchema);