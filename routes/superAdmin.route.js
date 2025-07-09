import express from "express";
import { handleAllotHouse,handleUpdateHouse,handleAddHouse,handleDeleteOwner } from "../controllersAdmin/handleHouses.controller.js";
import {handleAddGuards,handleDeleteGuards, handleUpdateGuards} from "../controllersAdmin/handleGuards.controller.js"
import { verifier ,verifyAdmin} from "../middlewares/verifyCookie.middleware.js";
import { handleNoticesCreate,handleNoticesDelete,getAllNotices,getAllComplaints,resolveComplaints } from "../controllersAdmin/handleOthers.controller.js";

const superAdminRoutes = express.Router();

//handling Houses
superAdminRoutes.post('/houses/allot',verifier,verifyAdmin,handleAllotHouse);
superAdminRoutes.post('/houses/add',verifier,verifyAdmin,handleAddHouse);
superAdminRoutes.post('/houses/update',verifier,verifyAdmin,handleUpdateHouse);
superAdminRoutes.post('/houses/delete',verifier,verifyAdmin,handleDeleteOwner);

//hnadling Guards
superAdminRoutes.post('/guards/add',verifier,verifyAdmin,handleAddGuards);
superAdminRoutes.post('/guards/update',verifier,verifyAdmin,handleUpdateGuards);
superAdminRoutes.post('/guards/delete',verifier,verifyAdmin,handleDeleteGuards);

//handling notices
superAdminRoutes.post('/notices/create',verifier,verifyAdmin,handleNoticesCreate);
superAdminRoutes.post('/notices/delete/:id',verifier,verifyAdmin,handleNoticesDelete);
superAdminRoutes.get('/notices/show',verifier,verifyAdmin,getAllNotices);

//hanadling complaints
superAdminRoutes.get('/complaints/get',verifier,getAllComplaints);
superAdminRoutes.post('/complaints/resolve',verifier,verifyAdmin,resolveComplaints);

export {superAdminRoutes}