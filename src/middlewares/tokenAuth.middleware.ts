import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded: any) => {
    if (err) {
      throw new AppError(err.message, 401);
    }

    req.user = {
      id: decoded.sub,
      isAdm: decoded.isAdm,
      isActive: decoded.isActive,
    };

    return next();
  });
};

export default tokenAuthMiddleware;
