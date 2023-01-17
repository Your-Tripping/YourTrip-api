import { Router } from "express";
import createCommentsController from "../controllers/comments/createComments.controller";
import deleteCommentsController from "../controllers/comments/deleteComments.controller";
import updateCommentsController from "../controllers/comments/updateComments.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import verifyCommentMiddleware from "../middlewares/verifyComment.middleware";

const commentsRoutes = Router();

commentsRoutes.post("/post/:id", tokenAuthMiddleware, createCommentsController);
commentsRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyCommentMiddleware,
  updateCommentsController
);
commentsRoutes.delete("/:id", tokenAuthMiddleware, deleteCommentsController);

export default commentsRoutes;
