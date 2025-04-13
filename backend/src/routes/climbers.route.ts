import express, { Router } from "express";

export const climbersRouter: Router = express.Router();

climbersRouter.get("/climbers");
climbersRouter.post("/climbers");
