import console from "console";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Comments } from "../entities/comments.entity";
import { AppError } from "../error/errors";

const verifyCommentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params_id = req.params.id;
  const user_id = String(req.user.id);

  const commentRepository = AppDataSource.getRepository(Comments);

  const comment = await commentRepository.findOne({
    where: { id: params_id },
    relations: { user: true },
  });

  if (comment.user.id === user_id) {
    return next();
  }

  throw new AppError("Not authorized", 404);
};

export default verifyCommentMiddleware;
