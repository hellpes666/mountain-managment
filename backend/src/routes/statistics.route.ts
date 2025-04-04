import express, { Router } from "express";

export const statisticsRouter: Router = express.Router();

statisticsRouter.get("/statistics/climber-activity");
statisticsRouter.get("/statistics/mountain-participants");
statisticsRouter.get("/statistics/period-expeditions");
