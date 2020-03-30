import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required:true
    },
    age:{
        type: Number,
        required: true,
        trim: true
    }
});

export default model('UserModel',userSchema);
