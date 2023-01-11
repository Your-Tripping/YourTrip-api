import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../error/errors";

export const verifyEmailIsAvailableMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOneBy({ email: req.body.email });

  if (foundUser) {
    throw new AppError("Email already in use!", 409);
  }

  return next();
};
