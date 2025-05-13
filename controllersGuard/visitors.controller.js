import {Visitors} from "../models/visitors.model.js";
import { Resident } from "../models/residents.models.js";
import {Guard} from "../models/guardSignup.models.js"

export const handleVisitorAdd = async(req,res) =>{
    try {
        const {id} = req.user;
        const user = await Guard.findById(id);
        if(!user){
            return res.status(400).json({success:"false",message:"you are not found in our guards data base"})
        }
        //ROLE VERIFY
        if(user.role !== 'GUARD'){
            return res.status(400).json({
                success:false,
                message:"You not authorized to do this funcion",
            });
        }
        
        const {fullName, phone, visitorFor, vehicleDetails,flatNo,block} = req.body;
        //const {photo} = req.files;
        console.log(fullName,phone,visitorFor);
        if(!fullName || !phone || !visitorFor || !flatNo || !block){
            return res.status(400).json({
                success:false,
                message:"All details are mandatory",
            });
        };
        // if(!profilePhoto) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"All details are mandatory",
        //     });
        // }
            //================image mimetype verify========================
        // const allowedMimeType = ['image/png','image/jpeg', 'webp'];
    
        // if(!allowedMimeType.includes(profilePhoto.mimetype.toLowerCase())){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Upload image of the given format only",
        //     });
        // }
    
        //==========================image uppload to cloudinary===================//
    
        // const cloudinaryRes = await cloudinary.uploader.upload(profilePhoto.tempFilePath)
        // if(!cloudinaryRes.secure_url) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"Failed to upload image, try again",
        //     });
        // }
        // console.log(cloudinaryRes);

        /////////////////////////////////////////////check if resident exists//////////////////////////////////////////////////////////////////////
        const user2 = await Resident.findOne({flatNo:flatNo,block:block, visitorFor:visitorFor});
        console.log(user2);
        if(!user2){
             return res.status(400).json({
                success:false,
                message:"Resident doesn't exist",
            });
        }
        const residentId = user2._id;
        //=============================================SOCKET EVENT EMIT HERE UPCOMING*==========================================================//

        //UPDATE THE DATA BASE
        const consent = 'ALLOWED'  //this will be the dynamic response by the triggered resident after socket logic implementation*

        //saving the data
        const result = await Visitors.create({
            fullName,
            phone,
            //save cloudinary url
            visitorFor,
            vehicleDetails,
            flatNo,
            block,
            consent: 'ALLOWED' ,
            resident:residentId
        });
        if(!result) return res.status(400).json({
            success:false,
            message:"Something went wrong, try again",
        });

        return res.status(200).json({success:true, message:"visitor saved successfully"});
    } catch (error) {
        return res.status(500).json({success:"false",message:"Internal Server Error",err:error});
    }
}