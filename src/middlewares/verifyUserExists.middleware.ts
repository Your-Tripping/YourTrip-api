import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../error/errors";

export const verifyUserExistsMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ id: req.params.id });

  if (!foundUser) {
    throw new AppError("User doesn't exist", 404);
  }

  req.foundUser = foundUser;

  return next();
};
