import express, { Router } from "express";

export const groupsRouter: Router = express.Router();

groupsRouter.get("/groups");
groupsRouter.post("/groups");
groupsRouter.put("/groups/:groupId/climbers");
groupsRouter.delete("/groups/:groupId");
