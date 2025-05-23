import express from "express";
import { handleAllotHouse,handleUpdateHouse,handleAddHouse,handleDeleteOwner } from "../controllersAdmin/handleHouses.controller.js";
import {handleAddGuards,handleDeleteGuards, handleUpdateGuards} from "../controllersAdmin/handleGuards.controller.js"
import { verifier } from "../middlewares/verifyCookie.middleware.js";
import { handleNoticesCreate,handleNoticesDelete,getAllNotices,getAllComplaints,resolveComplaints } from "../controllersAdmin/handleOthers.controller.js";

const superAdminRoutes = express.Router();

//handling Houses
superAdminRoutes.post('/houses/allot',verifier,handleAllotHouse);
superAdminRoutes.post('/houses/add',verifier,handleAddHouse);
superAdminRoutes.post('/houses/update',verifier,handleUpdateHouse);
superAdminRoutes.post('/houses/delete',verifier,handleDeleteOwner);

//hnadling Guards
superAdminRoutes.post('/guards/add',verifier,handleAddGuards);
superAdminRoutes.post('/guards/update',verifier,handleUpdateGuards);
superAdminRoutes.post('/guards/delete',verifier,handleDeleteGuards);

//handling notices
superAdminRoutes.post('/notices/create',verifier,handleNoticesCreate);
superAdminRoutes.post('/notices/delete/:id',verifier,handleNoticesDelete);
superAdminRoutes.get('/notices/show',verifier,getAllNotices);

//hanadling complaints
superAdminRoutes.get('/complaints/get',verifier,getAllComplaints);
superAdminRoutes.post('/complaints/resolve',verifier,resolveComplaints);

export {superAdminRoutes}