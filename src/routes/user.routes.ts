import { Router } from "express";
import { ValidationError } from "yup";
import { createUserController } from "../controllers/createUser.controllers";
import { deleteUserController } from "../controllers/deleteUser.controller";
import { getUserController } from "../controllers/getUser.controller";
import { updateUserController } from "../controllers/updateUser.controller";
import adminAuthMiddleware from "../middlewares/adminAuth.middleware";
import validTokenMiddleware from "../middlewares/tokenAuth.middleware";
import { validateUpdateFieldsMiddleware } from "../middlewares/validateUpdateFields.middleware";
import { verifyEmailIsAvailableMiddleware } from "../middlewares/verifyEmailIsAvailable.middleware";
import { verifyUserExistsMiddleware } from "../middlewares/verifyUserExists.middleware";
import { verifyUserIsActiveMiddleware } from "../middlewares/verifyUserIsActive.middleware";
import { verifyUserLoggedInMiddleware } from "../middlewares/verifyUserLoggedIn.middleware";

const userRoutes = Router();

userRoutes.post("", verifyEmailIsAvailableMiddleware, createUserController);
userRoutes.get("", validTokenMiddleware, getUserController);
userRoutes.delete(
  "/:id",
  validTokenMiddleware,
  adminAuthMiddleware,
  verifyUserExistsMiddleware,
  verifyUserIsActiveMiddleware,
  deleteUserController
);
userRoutes.patch(
  "/:id",
  validTokenMiddleware,
  verifyUserExistsMiddleware,
  verifyUserLoggedInMiddleware,
  adminAuthMiddleware,
  validateUpdateFieldsMiddleware,
  updateUserController
);

export default userRoutes;
