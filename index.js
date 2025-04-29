import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes.js";
import { superAdminRoutes } from "./routes/superAdmin.route.js";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();

//constants
const app = express();
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

//connection
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>console.log("connected to mngodb")).catch((err)=>console.log("MongoDb Error::",err));

  //middlewares
  app.use(express.json())
  app.use(cookieParser());
  app.use(express.urlencoded({extended:true}));
  app.use(fileUpload({
    useTempFiles: true,        // <-- this tells it to create tempFilePaths
    tempFileDir: '/tmp/',      // (optional) where to store temp files (default is system temp)
  }));

  //routes
app.use('/user',userRoutes);
app.use('/superadmin',superAdminRoutes);    //signup of superadmin is not handled here and this route is only visible on admin dashboard if the user is superAdmin

//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SEC // Click 'View API Keys' above to copy your API secret
});

//server connection
const server = http.createServer(app);
server.listen(port,()=>{
    console.log(`Listening on ${port}`);
})

