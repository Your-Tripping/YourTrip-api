import { Router } from "express";
import { deletePostController } from "../controllers/posts.controllers";
import { updatePlaceController } from "../controllers/updatePlace.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import { verifyPlaceExistsMiddleware } from "../middlewares/verifyPlaceExists.middleware";

const placeRoutes = Router();

placeRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyPlaceExistsMiddleware,
  updatePlaceController
);
placeRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifyPlaceExistsMiddleware,
  deletePostController
);

export default placeRoutes;
