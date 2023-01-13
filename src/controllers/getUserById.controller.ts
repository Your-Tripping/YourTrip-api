import { Request, Response } from "express";
import { getUserByIdService } from "../services/getUserById.service";

export const getUserByIdController = async (req: Request, res: Response) => {
  const userData = await getUserByIdService(req.foundUser);

  return res.status(200).json(userData);
};
