import { Router } from "express";
import { userLoginController } from "../controllers/userLogin.controller";

const sessionRoutes = Router();

sessionRoutes.post("/login", userLoginController);

export default sessionRoutes;
