import mongoose from "mongoose";

const residentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePhoto:{
        public_id:{
            type: String,
        },
        url: {
            type: String,
        }
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    emnum:{
        type:String,
        required:true
    },
    flatNo:{
        type:String,
        required:true
    },
    block:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['ADMIN', 'RESIDENT', 'GUARD'],
        default:'RESIDENT',
    },
    token:{
        type:String
    },
    passkey:{
        type:String,
        unique:true,
        required:true,
    }
},{timestamps:true});

const Resident = mongoose.model("resident",residentSchema);
export {Resident};