import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Comments } from "../entities/comments.entity";
import { AppError } from "../error/errors";

const verifyPostUserCommentUserOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params_id = req.params.id;
  const user_id = String(req.user.id);
  const userAdmin = req.user.isAdm;

  const commentRepository = AppDataSource.getRepository(Comments);

  const comment = await commentRepository.findOne({
    where: { id: params_id },
    relations: { user: true, post: { user: true } },
  });

  if (
    comment.user.id === user_id ||
    comment.post.user.id === user_id ||
    userAdmin
  ) {
    return next();
  }

  throw new AppError("Not authorized", 404);
};

export default verifyPostUserCommentUserOrAdminMiddleware;
