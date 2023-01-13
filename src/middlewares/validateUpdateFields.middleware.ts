import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/errors";

export const validateUpdateFieldsMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const input = Object.keys(req.body);

  if (
    input.includes("isAdm") ||
    input.includes("id") ||
    input.includes("isActive")
  ) {
    throw new AppError("Invalid Input", 401);
  }

  return next();
};
