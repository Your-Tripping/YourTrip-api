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
import { verifyUserLoggedInMiddleware } from "../middlewares/verifyUserLoggedIn.middleware";

const postsRoutes = Router();

postsRoutes.post("", tokenAuthMiddleware, createPostController);
postsRoutes.get("", listPostsController);
postsRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyUserLoggedInMiddleware,
  adminAuthMiddleware,
  verifyPostExistsMiddleware,
  updatePostController
);
postsRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifyUserLoggedInMiddleware,
  adminAuthMiddleware,
  verifyPostExistsMiddleware,
  deletePostController
);

export default postsRoutes;
