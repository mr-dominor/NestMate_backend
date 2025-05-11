import express from "express";
import {handleLogin,handleLogout,handleSignup} from "../controllersResident/resident.controller.js"
import {handleGuardLogin,handleGuardLogout,handleGuardSignup} from "../controllersGuard/guard.controller.js"
import {handleAdminLogin,handleAdminSignup,handleAdminLogout} from "../controllersAdmin/admin.controller.js"


const userRoutes = express.Router();

userRoutes.post('/resident/signup',handleSignup);
userRoutes.post('/resident/login',handleLogin);
userRoutes.post('/resident/logout',handleLogout);
    
userRoutes.post('/admin/signup',handleAdminSignup);
userRoutes.post('/admin/login',handleAdminLogin);
userRoutes.post('/admin/logout',handleAdminLogout);

userRoutes.post('/guard/signup',handleGuardSignup);
userRoutes.post('/guard/login',handleGuardLogin)
userRoutes.post('/guard/logout',handleGuardLogout);

export {userRoutes}