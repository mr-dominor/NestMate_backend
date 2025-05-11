import express from "express";
import { handleVisitorAdd } from "../controllersGuard/visitors.controller.js";
import { verifier } from "../middlewares/verifyCookie.middleware.js";

const guardRoutes = express.Router();

guardRoutes.post("/visitor/add",verifier,handleVisitorAdd);

export {guardRoutes}