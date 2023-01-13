import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/errors";

export const verifyUserIsActiveMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const foundUser = req.foundUser;

  if (foundUser.isActive === false) {
    throw new AppError("User inactive", 400);
  }

  return next();
};
