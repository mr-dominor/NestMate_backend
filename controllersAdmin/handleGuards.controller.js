import { GuardData } from "../models/guards.models.js";
import { Admin } from "../models/admin.models.js";

function generateRandom(){
    const arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@?_-';
    const len = arr.length;
    let res = '';
    for(let i = 0; i<10; i++){
        res += arr.charAt(Math.floor(Math.random() * len));
    }
    return res;
}

export const handleAddGuards = async(req,res)=>{
    try {
        //verifying ADMINLEVEL
        const {id} = req.user;
        const user = await Admin.findById(id);
        if(user.adminlevel !== 'SUPER ADMIN'){
            return res.status(400).json({
                success:false,
                message:"You not authorized to do this funcion",
            });
        }
        const {fullName,phone,shift,status} = req.body;
        if(!fullName ||!phone || !shift){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //check if input guard is new entry
        const guard = await GuardData.findOne({phone,fullName});
        if(guard){
            return res.status(400).json({
                success:false,
                message:"Guard already exists",
            });
        }
          
        //passkey generate
        const pass = generateRandom();

        //adding
        const here = await GuardData.create({
            fullName,
            guardKey:pass,
            phone,
            shift:shift,
            status:status
          });
        return res.status(200).json({success:true,message:"Guard employed successfully",message:{
            fullName,
            pass,
            phone,
            shift,
            status
        }});
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const handleUpdateGuards = async(req,res) => {
    try {
        const {id} = req.user;
        const user = await Admin.findById(id);
        if(user.adminlevel !== 'SUPER ADMIN'){
            return res.status(400).json({
                success:false,
                message:"You not authorized to do this funcion",
            });
        }

        const {guardKey} = req.body;
        if(!guardKey){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const result = await GuardData.findOne({guardKey});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Nothing found in records",
            });
        }
        await result.updateOne(req.body);
        await result.save();
        return res.status(200).json({
            success:true,
            message:"Guard Updated",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const handleDeleteGuards = async(req,res)=>{
    try {
        const {id} = req.user;
        const user = await Admin.findById(id);
        if(user.adminlevel !== 'SUPER ADMIN'){
            return res.status(400).json({
                success:false,
                message:"You not authorized to do this funcion",
            });
        }

        const {fullName,phone, guardKey} = req.body;
        if(!fullName || !phone || !guardKey){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const result = await GuardData.findOne({fullName,phone,guardKey});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Nothing found in records",
            });
        }
        await result.deleteOne();
        return res.status(200).json({
            success:true,
            message:"Owner deleted",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}