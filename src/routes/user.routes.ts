import { Router } from "express";
import { createUserController } from "../controllers/createUser.controllers";
import { verifyEmailIsAvailableMiddleware } from "../middlewares/verifyEmailIsAvailable.middleware";

const userRoutes = Router();

userRoutes.post("", verifyEmailIsAvailableMiddleware, createUserController);

export default userRoutes;
