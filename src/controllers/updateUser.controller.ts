import { Request, Response } from "express";
import { updateUserService } from "../services/users/updateUser.service";

export const updateUserController = async (req: Request, res: Response) => {
  await updateUserService(req.foundUser, req.body);

  return res.status(200).end();
};
