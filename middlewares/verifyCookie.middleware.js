import {verifyToken} from "../services/auth.js"

export const verifier = async(req,res,next) => {
    const tokenHeader = req.headers["cookie"];
    if(!tokenHeader) {
        return res.status(400).json({
            success:false,
            message:"Login first",
        });
    }

    const token = tokenHeader.split('=')[1];   //this accounts that my cookie has a string with some name and a value separated by =, so split will separate the set of characters separated by = and [1] means element at index 1
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