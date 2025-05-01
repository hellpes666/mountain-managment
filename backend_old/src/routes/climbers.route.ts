import express, { Router } from "express";
import { Climbers } from "../controllers";

export const climbersRouter: Router = express.Router();

climbersRouter.get("", Climbers.getClimbers);
climbersRouter.post("", Climbers.createClimber);
