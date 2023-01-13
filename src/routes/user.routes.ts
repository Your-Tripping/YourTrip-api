import { Router } from "express";
import { createUserController } from "../controllers/createUser.controllers";
import { deleteUserController } from "../controllers/deleteUser.controller";
import { getUserController } from "../controllers/getUser.controller";
import { getUserByIdController } from "../controllers/getUserById.controller";
import { updateUserController } from "../controllers/updateUser.controller";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import { validateUpdateFieldsMiddleware } from "../middlewares/validateUpdateFields.middleware";
import { verifyEmailIsAvailableMiddleware } from "../middlewares/verifyEmailIsAvailable.middleware";
import { verifyUserExistsMiddleware } from "../middlewares/verifyUserExists.middleware";
import { verifyUserIsActiveMiddleware } from "../middlewares/verifyUserIsActive.middleware";
import { verifyUserLoggedInMiddleware } from "../middlewares/verifyUserLoggedIn.middleware";

const userRoutes = Router();

userRoutes.post("", verifyEmailIsAvailableMiddleware, createUserController);
userRoutes.get("", tokenAuthMiddleware, getUserController);
userRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  adminAuthMiddleware,
  verifyUserExistsMiddleware,
  verifyUserIsActiveMiddleware,
  deleteUserController
);
userRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyUserExistsMiddleware,
  verifyUserLoggedInMiddleware,
  adminAuthMiddleware,
  validateUpdateFieldsMiddleware,
  updateUserController
);
userRoutes.get(
  "/:id",
  tokenAuthMiddleware,
  verifyUserExistsMiddleware,
  getUserByIdController
);

export default userRoutes;
