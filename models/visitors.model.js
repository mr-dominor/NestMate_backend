import mongoose, { Schema } from "mongoose";
const visitorSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    visitorFor:{
        type:String,
        required:true
    },
    resident:{
      type:Schema.Types.ObjectId,
      ref:'Resident'
    },
    residentPhone:{
      type:String,
      required:true
    },
    vehicleDetails:[{
        type: {
            type: String,
            enum: ['Car', 'Bike', 'Scooter', 'Truck', 'Other'],
        },
        model: {
          type: String,
        },
        color: {
          type: String
        },
        registrationNumber: {
          type: String,
        },
}]
},{timestamps:true})

const Visitors = mongoose.model("visitorsdata",visitorSchema);
export {Visitors};