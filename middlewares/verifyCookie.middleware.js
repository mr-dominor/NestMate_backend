import {verifyToken} from "../services/auth.js";
import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";

export const verifier = async(req,res,next) => {
    const tokenHeader = req.headers["cookie"];
    if(!tokenHeader) {
        return res.status(400).json({
            success:false,
            message:"Login first",
        });
    }

    const token = tokenHeader.split('=')[1];   //this accounts that my cookie has a string with some name and a value separated by =, so split will separate the set of characters separated by = and [1] means element at index 1
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user = await verifyToken(token);
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Unauthenticated",
        });
    }
    req.user = user;
    next()
}
export const verifyAdmin = async(req,res,next)=>{
    const decoded = req.headers["cookie"].split('=')[1];
    const userId = jwt.verify(decoded,process.env.SECRET_KEY);
    const user = await Admin.findById(userId.id);
    if(user.role != 'ADMIN'){
        return res.status(400).json({success:false, message:"You are not authorised to go ahead"});
    }
    console.log(userId.id);
    next();
}