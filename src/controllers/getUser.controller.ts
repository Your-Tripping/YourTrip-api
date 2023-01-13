import { Request, Response } from "express";
import { getUsersService } from "../services/getUser.service";

export const getUserController = async (_req: Request, res: Response) => {
  const userData = await getUsersService();

  res.status(200).json(userData);
};
