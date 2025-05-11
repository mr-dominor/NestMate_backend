import express from "express";
import { verifier } from "../middlewares/verifyCookie.middleware.js";
import { getVisitorInfo } from "../controllersResident/residentpanel.controller.js";
const residentRoute = express.Router();

residentRoute.get("/getVisitor",verifier,getVisitorInfo);

export {residentRoute};