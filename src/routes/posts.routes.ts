import { Router } from "express";
import {
  createPostController,
  deletePostController,
  listPostsController,
  updatePostController,
} from "../controllers/posts.controllers";
import validTokenMiddleware from "../middlewares/tokenAuth.middleware";

const postsRoutes = Router();

postsRoutes.post("", validTokenMiddleware, createPostController);
postsRoutes.get("", listPostsController);
postsRoutes.patch("/:id", validTokenMiddleware, updatePostController);
postsRoutes.delete("/:id", validTokenMiddleware, deletePostController);

export default postsRoutes;
