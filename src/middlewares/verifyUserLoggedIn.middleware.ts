import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../error/errors";

export const verifyUserLoggedInMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const email = req.foundUser.email;

  const userRepo = AppDataSource.getRepository(User);

  const foundUser = await userRepo.findOneBy({ email: email });

  if (!foundUser) {
    throw new AppError("Unauthorized!", 403);
  }

  req.loggedIn = true;

  return next();
};
