import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
} from "../services/user.services";

export const createUserController = async (req: Request, res: Response) => {
  const userData = await createUserService(req.body);

  res.status(201).json(userData);
};

export const getUsersController = async (_req: Request, res: Response) => {
  const usersData = await getUsersService();

  res.status(200).json(usersData);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.foundUser);

  res.status(204).end();
};
