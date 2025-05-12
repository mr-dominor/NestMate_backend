import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:['NOTICE','EVENT'],
        required:true
    },
    expiry:{
        type:String,
        required:true
    }
},{timestamps:true});

noticeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Notices = mongoose.model("notices",noticeSchema);
export {Notices};