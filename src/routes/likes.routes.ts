import { Router } from "express";
import createlikesController from "../controllers/likes/createlikes.controller";
import deletelikesController from "../controllers/likes/deletelikes.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";

const likesRoutes = Router();

likesRoutes.post("/:id", tokenAuthMiddleware, createlikesController);
likesRoutes.delete("/:id", tokenAuthMiddleware, deletelikesController);

export default likesRoutes;
