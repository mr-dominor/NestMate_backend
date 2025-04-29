import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
    flatNo:{
        type:String,
        required:true
    },
    block:{
        type:String,
        required:true
    },
    ownerStatus:{
        type:String,
        enum:['SOLD','RENTED','VACCANT'],
        default:'VACCANT',
        required:true,
    },
    passkey:{
        type:String,
        default:NaN,
        required:true,
    },
    fullName:{
        type:String,
        default:NaN,
        required:true,
    },
    registry:{
        type:String,
        default:NaN,
        required:true
    },
    phone:{
        type:String,
        default:NaN,
        required:true,
    },
    email:{
        type:String,
        default:NaN,
        required:true
    },
    tenure:{
        type:String,
        default:NaN
    },
    nominee:{
        type:String,
        default:NaN
    },
    dateOfDeal:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true});

const Houses = mongoose.model("houses",houseSchema)
export {Houses};