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
  const postQueryBuilder = postRepository.createQueryBuilder("post");

  const post = await postQueryBuilder
    .leftJoinAndSelect("post.places", "places")
    .leftJoinAndSelect("post.user", "user")
    .where("post.id = :id", { id: req.params.id })
    .getOne();

  if (!post) {
    throw new AppError("Invalid ID", 404);
  }

  req.foundPost = post;

  return next();
};
