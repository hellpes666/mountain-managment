import express, { Router } from "express";
import { createMountain, getMountains } from "../controllers/mountain";

export const mountainsRouter: Router = express.Router();

mountainsRouter.get("", getMountains);
mountainsRouter.post("", createMountain);
// Statistics
mountainsRouter.get("/:mountainId/expeditions");
