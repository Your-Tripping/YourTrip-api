import { Request, Response } from "express";
import { createUserService } from "../services/createUser.services";

export const createUserController = async (req: Request, res: Response) => {
  const userData = await createUserService(req.body);

  res.status(201).json(userData);
};
