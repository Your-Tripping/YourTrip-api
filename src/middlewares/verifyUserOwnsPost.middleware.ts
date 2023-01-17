import { Request, Response, NextFunction } from "express";

export const verifyUserOwnsPostMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const id = req.foundPost.user.id;

  console.log(req.foundPost);

  if (req.user.id === id) {
    req.isOwner = true;
  }

  return next();
};
