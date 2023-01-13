import { Router } from "express";
import { createPostController } from "../controllers/posts.controllers";
import validTokenMiddleware from "../middlewares/tokenAuth.middleware";

const postsRoutes = Router();

postsRoutes.post("", validTokenMiddleware, createPostController);

export default postsRoutes;
