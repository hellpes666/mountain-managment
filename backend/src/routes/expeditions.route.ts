import express, { Router } from "express";
import { createExpedtion, getExpeditions } from "../controllers/expeditions";

export const expeditionRouter: Router = express.Router();

expeditionRouter.get("", getExpeditions);
expeditionRouter.post("", createExpedtion);
// Statistics
