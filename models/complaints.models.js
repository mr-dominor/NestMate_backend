import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    weight:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:0
    },
    resolvedBy:{
        type:String,
    },
    resolvedAt:{
        type:Date,
    }
},{timestamps:true});

const Complaints = mongoose.model("notices",complaintSchema);
export {Complaints};