import express from "express";
import { adminlevelVerify } from "../middlewares/adminLevel.middleware.js";
import { handleAllotHouse,handleUpdateHouse,handleAddHouse,handleDeleteOwner } from "../adminControllers/handleHouses.controller.js";
import {handleAddGuards,handleDeleteGuards, handleUpdateGuards} from "../adminControllers/handleGuards.controller.js"

const superAdminRoutes = express.Router();

//handling Houses
superAdminRoutes.post('/houses/allot',adminlevelVerify,handleAllotHouse);
superAdminRoutes.post('/houses/add',adminlevelVerify,handleAddHouse);
superAdminRoutes.post('/houses/update',adminlevelVerify,handleUpdateHouse);
superAdminRoutes.post('/houses/delete',adminlevelVerify,handleDeleteOwner);

//hnadling Guards
superAdminRoutes.post('/guards/add',adminlevelVerify,handleAddGuards);
superAdminRoutes.post('/guards/update',adminlevelVerify,handleUpdateGuards);
superAdminRoutes.post('/guards/delete',adminlevelVerify,handleDeleteGuards);

export {superAdminRoutes}