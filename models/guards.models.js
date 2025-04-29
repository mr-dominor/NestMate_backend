import mongoose from "mongoose";

const guardSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['ADMIN', 'RESIDENT', 'GUARD'],
        default:'GUARD',
    },
    phone:{
        type:String,
        required:true
    },
    guardKey:{
        type:String,
        unique:true,
        required:true,
    },
    shift:{
        type:String,
        enum:['DAY','NIGHT'],
        required:true
    },
    status:{
        type:String,
        enum:['ACTIVE','SUSPENDED','DEPRECATED','ON LEAVE'],
        default:'ACTIVE',
        required:true
    }
},{timestamps:true});

const GuardData = mongoose.model("guardData",guardSchema);
export {GuardData};