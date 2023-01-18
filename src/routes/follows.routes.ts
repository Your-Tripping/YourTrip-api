import { Router } from "express";
import createfollowsController from "../controllers/follows/createfollows.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";

const followsRoute = Router();

followsRoute.post("/:id", tokenAuthMiddleware, createfollowsController);

export default followsRoute;
