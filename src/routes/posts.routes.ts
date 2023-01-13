import { Router } from "express";
import {
  createPostController,
  deletePostController,
  listPostsController,
  updatePostController,
} from "../controllers/posts.controllers";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import { verifyPostExistsMiddleware } from "../middlewares/verifyPostExists.middleware";
import { verifyUserOwnsPostMiddleware } from "../middlewares/verifyUserOwnsPost.middleware";

const postsRoutes = Router();

postsRoutes.post("", tokenAuthMiddleware, createPostController);
postsRoutes.get("", listPostsController);
postsRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyPostExistsMiddleware,
  verifyUserOwnsPostMiddleware,
  adminAuthMiddleware,
  updatePostController
);
postsRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifyPostExistsMiddleware,
  verifyUserOwnsPostMiddleware,
  adminAuthMiddleware,
  deletePostController
);

export default postsRoutes;
