import express, { Router } from "express";

export const mountainsRouter: Router = express.Router();

mountainsRouter.get("/mountains");
mountainsRouter.post("/mountains");
mountainsRouter.put("/mountains/:mountainId");
mountainsRouter.delete("/mountains");
// Statistics
mountainsRouter.get("/mountains/:mountainId/expeditions");
