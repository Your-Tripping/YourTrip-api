import { Router } from "express";
import createfollowsController from "../controllers/follows/createfollows.controller";
import deletefollowsController from "../controllers/follows/deletefollows.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";

const followsRoute = Router();

followsRoute.post("/:id", tokenAuthMiddleware, createfollowsController);
followsRoute.delete("/:id", tokenAuthMiddleware, deletefollowsController);

export default followsRoute;
