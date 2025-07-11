import {Admin} from "../models/admin.models.js"
import { v2 as cloudinary } from "cloudinary";
import { createToken } from "../services/auth.js";
import bcrypt from "bcrypt"

// export const handleAdminSignup = async(req,res) => {
//     try {
//         const {fullName,email, password, phone,emnum,flatNo,block, role,passkey,adminlevel} = req.body;
//         //const {profilePhoto} = req.files;

//          //==========================verification section===================//
//          if(!fullName || !email || !password || !phone || !emnum || !passkey || !adminlevel){
//             return res.status(400).json({
//                 success:false,
//                 message:"All details are mandatory",
//             });
//         }
//         // if(!profilePhoto) {
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"All details are mandatory",
//         //     });
//         // }

//         //=====================checking for preuser===========================
//         const preUser = await Admin.findOne({phone:phone, });
//         if(preUser){
//             return res.status(400).json({
//                 success:false,
//                 message:"User already exists for current registry",
//             });
//         }

//         //validating a valid signup via Houses data of admin side
//         // const record = await Houses.findOne({flatNo});
//         //if(!record){
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"You are not found in our databases",
//         //     });
//         // }
        
//         // if((record.phone) !== phone || (passkey !== record.passkey) || (flatNo !== record.flatNo) || (block !== record.block) || (role !== record.role)){
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"Re-verify your entered details",
//         //     });
//         // }

//         //================image mimetype verify========================
//         // const allowedMimeType = ['image/png','image/jpeg', 'webp'];
    
//         // if(!allowedMimeType.includes(profilePhoto.mimetype.toLowerCase())){
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"Upload image of the given format only",
//         //     });
//         // }
    
//         //==========================image uppload to cloudinary===================//
    
//         // const cloudinaryRes = await cloudinary.uploader.upload(profilePhoto.tempFilePath)
//         // if(!cloudinaryRes.secure_url) {
//         //     return res.status(400).json({
//         //         success:false,
//         //         message:"Failed to upload image, try again",
//         //     });
//         // }
//         // console.log(cloudinaryRes);

//         //========================user created====================================//
    
//         const hashedPassword = await bcrypt.hash(password,10);
//         const response = await Admin.create({
//             fullName,
//             email, 
//             password:hashedPassword,
//             phone,
//             adminlevel,
//             emnum,
//             flatNo,
//             block,
//             role,
//             passkey,
//             // profilePhoto:{
//             //     public_id: cloudinaryRes.public_id,
//             //     url:cloudinaryRes.url,
//             // }
//         });

//         await response.save();
//         console.log("User Created");
//         try {
//             const token = await createToken(response._id);
//             res.cookie("jwt-token",token,{
//                 httpOnly:true,
//                 secure:process.env.NODE_ENV === 'production',
//                 sameSite:'strict',
//                 maxAge:7 * 24 * 60 * 60 * 1000,
//             });
//             console.log("cookie set up")
//             return res.status(200).json({success:true, 
//                 message:"user Successfully created",
//                 user:{
//                     fullName:fullName,
//                     email:email, 
//                     adminlevel,
//                     phone:phone,
//                     emnum:emnum,
//                     flatNo:flatNo,
//                     block:block,
//                     role:role,
//                     passkey:passkey,
//                     //profilePhoto:profilePhoto
//                 }
//             })
//         } catch (error) {
//             return res.status(400).json({msg:"error in tokenization"})
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Seems to be a server issue",
//             error:error
//         });
//     }
// }

export const handleAdminLogin = async(req,res) => {
    try {
        const {password, phone,role} = req.body;
        if(!password || !phone || !role){
            return res.status(400).json({
                success:false,
                message:"All details are mandatory",
            });
        }

        const user = await Admin.findOne({phone});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist, Signup or check your number again",
            });
        }
        const comparedResult = await bcrypt.compare(password,user.password)
        if(!comparedResult){
            return res.status(400).json({
                success:false,
                message:"Password is wrong",
            });
        }
        if((role != user.role)){
            return res.status(400).json({
                success:false,
                message:"Either passkey or role is wrong",
            });
        }
        try {
            const token = await createToken(user._id);
            res.cookie("jwt-token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite:'strict',
                maxAge:7 * 24 * 60 * 60 * 1000,
            });
            console.log("cookie set up in login")
            return res.status(200).json({success:true, 
                message:"user Successfully logged in",
                user:{
                    id:user._id,
                    fullName:user.fullName,
                    email:user.email, 
                    phone:user.phone,
                    adminlevel:user.adminlevel,
                    emnum:user.emnum,
                    role:user.role,
                    passkey:user.passkey,
                    //profilePhoto:user.profilePhoto
                }
            })
        } catch (error) {
            return res.status(400).json({msg:"error in tokenization"})
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const handleAdminLogout = async(req,res) => {
    try {
        res.clearCookie('jwt-token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
        });
        return res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        return res.status(500).json({success:"false",message:"Logout again"})
    }
}