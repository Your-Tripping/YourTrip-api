import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";
import { verifyEmailIsAvailableMiddleware } from "../middlewares/verifyEmailIsAvailable.middleware";

const userRoutes = Router();

userRoutes.post("", verifyEmailIsAvailableMiddleware, createUserController);

export default userRoutes;
