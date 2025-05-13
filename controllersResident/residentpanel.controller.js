import { Visitors } from "../models/visitors.model.js"
import { Notices } from "../models/notices.models.js";
import { Complaints } from "../models/complaints.models.js";
import { Billables } from "../models/billable.models.js";
import { Services } from "../models/services.models.js";
import mongoose from "mongoose";

//visitor info
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

//notices and events
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
        const {title,description,nature} = req.body;
        if(!title || !description || !nature){
              return res.status(400).json({
                success:false,
                message:"Incomplete entries"
            }); 
        }
        const result = await Complaints.create({
            title,
            description
        });
        const creator = req.user;
        if(nature === 'PRIVATE'){
            result.residentId = creator;
        }
        await result.save();

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

//upvote
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

//services logic from service store to billable db
export const getService = async(Request,res) =>{
    try {
        const serviceData  = await Services.aggregate([
            {
              $lookup: {
                from: 'vendors',
                localField: 'vendorId',
                foreignField: '_id',
                as: 'vendor'
              }
            },
            {
              $unwind: '$vendor'
            }
        ]);

        if(!serviceData){
            return res.status(400).json({
            success:false,
            message:"No vendors found",
            });
        }
        return res.status(200).json({success:true,services:serviceData});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const addToBill = async(req,res) =>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id not found in the params"
            }); 
        }
        const service = Services.findById(id);
        if(!service){
            return res.status(400).json({
                success:false,
                message:"no such service exist"
            }); 
        }
        const result = await Billables.create({
            serviceName: service.serviceName,
            vendorId : service.vendorId,
            price:service.price,
            units:req.body,
            residentId:req.body.residentId
        });
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Service not added to your bill, please try again"
            }); 
        }
        return res.status(200).json({success:true,message:"Service added to your bill"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const deleteFromBill = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id not found in the params"
            }); 
        }
        const result = await Billables.findByIdAndDelete(id);
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Service not deleted from your bill, please try again"
            }); 
        }
        return res.status(200).json({success:true,message:"Service deleted from your bill"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const updateInBill = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id not found in the params"
            }); 
        }
        const result = await Billables.findByIdAndUpdate(id,req.body,{new:true});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Service not updated in your bill, please try again"
            }); 
        }
        return res.status(200).json({success:true,message:"Service updated in your bill"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const rateVendor = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"id not found in the params"
            }); 
        }
        const serviceMen = await Services.findById(id);
        let rating = serviceMen.reputation;
        let rated = serviceMen.peopleRated;

        let newRating = (rated === 0)?(req.body):(rating+req.body)/rated;
        let oneSigFig = Number(newRating.toPrecision(1));

        const result = await Services.findByIdAndUpdate(id,{
            $set:{reputation:oneSigFig},
            $inc:{peopleRated:1}
        },{new:true});

        if(!result){
            return res.status(400).json({
                success:false,
                message:"Rating not recorded, arte again"
            }); 
        }
        return res.status(200).json({success:true,message:"Rating successful"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

//put verifier middleware here
export const seeBillables = async(req,res)=>{
    try {
        const userId = req.user;
        const servicesTaken = await Billables.aggregate([
            {
                $match:{residentId:userId},

            },
            {
                $lookup:{
                    from: "services",           // Step 2: join with 'services' collection
                    localField: "serviceId",    // local field in 'Billables'
                    foreignField: "_id",        // target field in 'services'
                    as: "serviceInfo"  
                }
            },
            {
                $unwind:"$serviceInfo"
            }
        ]);
        if(!servicesTaken){
            return res.status(400).json({
                success:false,
                message:"Sorry u haven't taken any "
            }); 
        }
        return res.status(200).json({success:true,service:servicesTaken}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}