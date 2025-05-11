import { Visitors } from "../models/visitors.model.js"
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