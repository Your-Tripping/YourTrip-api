import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/errors";

const adminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    throw new AppError("You need admin permission", 403);
  }

  return next();
};
export default adminAuthMiddleware;
