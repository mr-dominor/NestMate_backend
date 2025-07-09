import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:true
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendors'
    },
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'services'
    },
    residentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resident',
    },
    price:{
        type:Number,
        required:true
    },
    units:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['ACTIVE','DEPRICATED'],
        default:'ACTIVE',
    }
});

const Billables = mongoose.model('billables',billSchema);
export {Billables};