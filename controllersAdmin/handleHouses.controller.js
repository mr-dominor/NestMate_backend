import { Houses } from "../models/houses.models.js";
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

export const handleAddHouse = async(req,res)=>{
    try {

        const result = await Houses.findOne({flatNo,block});
        if(result){
            return res.status(400).json({
                success:false,
                message:"House already exists in dataBase",
                details:result
            });
        }
        const house = await Houses.create({
            flatNo,
            block
        });
        return res.status(200).json({
            success:true,
            message:"House added",
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

export const handleAllotHouse = async(req,res)=>{
    try {
 
        const {flatNo,block,ownerStatus,fullName,registry,phone,email,nominee,tenure} = req.body;
        if(!flatNo || !block || !ownerStatus || !fullName || !registry  || !phone || !email || !nominee){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //check if input house is vaccant
        const house = await Houses.findOne({flatNo,block});
        if(!house){
            return res.status(400).json({
                success:false,
                message:"No house with these details in our records",
            });
        }
        if(house.ownerStatus !== 'VACCANT'){
            return res.status(400).json({
                success:false,
                message:"This house is not for sale or rented",
            });
        }
        //contact and email validation
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Invalid phone number"
            });
          }
          
          if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
          }
        //checking the ownership
        if(ownerStatus === 'RENTED' && (!tenure)){
            return res.status(400).json({
                success: false,
                message: "Rented house is required to have a tenure"
            });
        }
          
        //passkey generate
        const pass = generateRandom();

        //adding
        await house.updateOne({
            ownerStatus: 'OCCUPIED',
            fullName,
            registry,
            phone,
            email,
            nominee,
            passkey: pass
          });
        return res.status(200).json({success:true,message:"House allotted successfully",message:{
            flatNo,block,ownerStatus,fullName,registry,phone,email,nominee,tenure
        }})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const handleUpdateHouse = async(req,res)=>{
    try {
        
        const {flatNo, block} =  req.body;
        const pass = generateRandom();
        const updated = await Houses.findOneAndUpdate({flatNo,block}, req.body,pass,{new:true})
        if(!updated){
            return res.status(400).json({
                success:false,
                message:"Update failed, try again",
            });
        }     
        return res.status(200).json({success:true,message:"update successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Seems to be a server issue",
            error:error
        });
    }
}

export const handleDeleteOwner = async(req,res)=>{
    try {
        const {block,flatNo} = req.body;
        if(!block || !flatNo){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        const result = await Houses.findOne({flatNo,block});
        if(!result){
            return res.status(400).json({
                success:false,
                message:"Nothing found in records",
            });
        }
        await result.updateOne({
            ownerStatus:'VACCANT',
            passkey:NaN,
            fullName:NaN,
            registry:NaN,
            phone:NaN,
            email:NaN,
            tenure:NaN,
            nominee:NaN
        });
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