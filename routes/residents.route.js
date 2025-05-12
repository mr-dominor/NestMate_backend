import express from "express";
import { verifier } from "../middlewares/verifyCookie.middleware.js";
import { getVisitorInfo } from "../controllersResident/residentpanel.controller.js";
import { getNotices,createComplaint,getComplaint,upvote } from "../controllersResident/residentpanel.controller.js";
const residentRoute = express.Router();

residentRoute.get("/getVisitor",verifier,getVisitorInfo);
residentRoute.get("/getNotices",verifier,getNotices);
residentRoute.post('/createComplaint',verifier,createComplaint);
residentRoute.get('/getComplaint',verifier,getComplaint);
residentRoute.post('/upvoteComplaint/:id',verifier,upvote);

export {residentRoute};