import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
} from "../controllers/user.controllers";
import { verifyEmailIsAvailableMiddleware } from "../middlewares/verifyEmailIsAvailable.middleware";
import { verifyUserExistsMiddleware } from "../middlewares/verifyUserExists.middleware";
import { verifyUserIsActiveMiddleware } from "../middlewares/verifyUserIsActive.middleware";

const userRoutes = Router();

userRoutes.post("", verifyEmailIsAvailableMiddleware, createUserController);
userRoutes.get("", getUsersController);
userRoutes.delete(
  "/:id",
  verifyUserExistsMiddleware,
  verifyUserIsActiveMiddleware,
  deleteUserController
);

export default userRoutes;
