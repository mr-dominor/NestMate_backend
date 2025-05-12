import { Visitors } from "../models/visitors.model.js"
import { Notices } from "../models/notices.models.js";
import { Complaints } from "../models/complaints.models.js";
import mongoose from "mongoose";

export const getVisitorInfo = async(req,res) =>{
    try {
        const id = req.user.id;
        if(!id){
        return res.status(400).json({
            success:false,
            message:"Login first",
            });
        }

        let visitors = await Visitors.find({resident:id});
        if(!visitors){
            return res.status(400).json({
                success:false,
                message:"Something went wrong"
            });
        }
        return res.status(200).json({success:true, visitorsData:visitors})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Error"
        });
    }
}

export const getNotices = async(req,res)=>{
    try {
        //the notices and events are sent together and will be seggregated on the frontend
        const notices = await Notices.find({});
        if(!notices){
           return res.status(400).json({
                success:false,
                message:"Something went wrong"
            }); 
        }
        return res.status(200).json({success:true, notice:notices});
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal error"
        });
    }
}

//complaint section logic for resident's side
export const createComplaint = async(req,res) =>{
    //the resolveStatus willbe updated on frontend like if the admin clicks the resolve button, it will record data of the admin and current time to be updated on complaint
    try {
        const {title,description} = req.body;
        if(!title || !description){
              return res.status(400).json({
                success:false,
                message:"Incomplete entries"
            }); 
        }
        const result = await Complaints.create({
            title,
            description
        });

        if(!result){
              return res.status(400).json({
                success:false,
                message:"Something went wrong"
            }); 
        }
        return res.status(200).json({
                success:true,
                message:"Complaint added"
            });
    } catch (error) {
        return res.status(500).json({
                success:false,
                message:"Internal server error"
            }); 
    }
}

export const getComplaint = async(req,res) =>{
    try {
        const complaints = await Complaints.find({});
        if(!complaints){
             return res.status(400).json({
                success:false,
                message:"No Complaints Found"
            }); 
        }
        return res.status(200).json({success:true,complaintsAll:complaints});
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        }); 
    }
}

export const upvote = async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id not found in the params"
            }); 
        }
        const result = await Complaints.findByIdAndUpdate(id,{$inc:{weight:1}},{new:true});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"id not found in the params"
            }); 
        }
        return res.status(200).json({
            success:true,
            message:"Upvoted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        }); 
    }
}