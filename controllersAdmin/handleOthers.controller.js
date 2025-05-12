import { Notices } from "../models/notices.models";
import { Complaints } from "../models/complaints.models";

/////////////////////////////////////////////////////HANDLING NOTICES & EVENTS///////////////////////////////////////////////////////////////
export const handleNoticesCreate = async(req,res) =>{
    try {
        const {id} = req.user;
        const user = await Admin.findById(id);
        if(user.adminlevel !== 'SUPER ADMIN' || user.adminlevel != 'ADMIN'){
            return res.status(400).json({
                success:false,
                message:"You not authorized to do this function",
            });
        }
        const {contentType,contentCategory, contentExp} = req.body;
        if(!contentType || !contentCategory || !contentExp){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const result = await Notices.create({
            content:contentType,
            category:contentCategory,
            expiry:contentExp
        });
        if(!result){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        return res.status(200).json({success:true,message:"Notice created"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}
export const handleNoticesDelete = async(req,res) =>{
    try {
      const { id } = req.params;
      await Notices.findByIdAndDelete(id);
      res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete notice' });
    }
}
export const getAllNotices = async(req,res) =>{
    try {
      const result = await Notices.find({});
      if(!result){
        return res.status(400).json({
            success:false,
            message:"No notices found",
        });
      }
      return res.status(200).json({ message: 'Got Notices' ,result});
    } catch (err) {
      res.status(500).json({ error: 'Internal Error' });
    }
}

/////////////////////////////////////////////////////HANDLING COMPLAINTS////////////////////////////////////////////////////////////////////
export const getAllComplaints = async(req,res) =>{
    try {
      const result = await Complaints.find({});
      if(!result){
        return res.status(400).json({
            success:false,
            message:"No Complaints found",
        });
      }
      return res.status(200).json({ message: 'Got Complaints' ,result});
    } catch (err) {
      res.status(500).json({ message:"Internal error",error: err });
    }
}

export const resolveComplaints = async(req,res) =>{
    try {
        //explicitly send this section from front end
        const {complaintId, resolver} = req.body
        if(!complaintId || !resolver){
            return res.status(400).json({
            success:false,
            message:"Incomplete request",
            });
        }
        const result = await Complaints.findByIdAndUpdate(complaintId,{resolvedBy:resolver,status:"RESOLVED",resolvedAt:new Date()},{new:true});
        if(!result){
            return res.status(400).json({
            success:false,
            message:"Failed to update reolve status, try again!",
            });
        }
        return res.status(200).json({success:true, message: 'Resolved successfullyy' ,result});
    } catch (error) {
        res.status(500).json({ message:"Internal error",err: error });
    }
}