import { Request, Response } from "express";
import { deleteUserService } from "../services/deleteUser.services";

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.foundUser);

  return res.status(204).end();
};
