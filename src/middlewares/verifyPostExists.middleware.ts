import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Post } from "../entities/post.entity";
import { AppError } from "../error/errors";

export const verifyPostExistsMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const postRepository = AppDataSource.getRepository(Post);

  const post = await postRepository.findOneBy({
    id: req.params.id,
  });

  if (!post) {
    throw new AppError("Invalid ID", 404);
  }

  req.foundPost = post;

  return next();
};
