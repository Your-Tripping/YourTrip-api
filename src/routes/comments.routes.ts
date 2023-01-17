import { Router } from "express";
import createCommentsController from "../controllers/comments/createComments.controller";
import deleteCommentsController from "../controllers/comments/deleteComments.controller";
import updateCommentsController from "../controllers/comments/updateComments.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";

const commentsRoutes = Router();

commentsRoutes.post("/:id", tokenAuthMiddleware, createCommentsController);
commentsRoutes.patch("/:id", tokenAuthMiddleware, updateCommentsController);
commentsRoutes.delete("/:id", tokenAuthMiddleware, deleteCommentsController);

export default commentsRoutes;
