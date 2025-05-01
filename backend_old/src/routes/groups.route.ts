import express, { Router } from "express";
import { createGroup, getGroups } from "../controllers/group";

export const groupsRouter: Router = express.Router();

groupsRouter.get("", getGroups);
groupsRouter.post("", createGroup);