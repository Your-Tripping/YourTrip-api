import { Router } from "express";
import createfollowsController from "../controllers/follows/createfollows.controller";
import deletefollowsController from "../controllers/follows/deletefollows.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import verifyFollowerUserMiddleware from "../middlewares/verifyFollowerUser.middleware";

const followsRoute = Router();

followsRoute.post(
  "/:id",
  tokenAuthMiddleware,
  verifyFollowerUserMiddleware,
  createfollowsController
);
followsRoute.delete("/:id", tokenAuthMiddleware, deletefollowsController);

export default followsRoute;
