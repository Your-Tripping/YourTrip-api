import console from "console";
import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Follows } from "../entities/follows.entity";
import { AppError } from "../error/errors";

const verifyFollowerUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const followsRepository = AppDataSource.getRepository(Follows);

  const follower = await followsRepository
    .createQueryBuilder("follows")
    .where("follows.follower = :follower_id", { follower_id: req.user.id })
    .andWhere("follows.following = :following_id", {
      following_id: req.params.id,
    })
    .getOne();

  if (follower) {
    throw new AppError("You are already following this user", 404);
  }

  return next();
};

export default verifyFollowerUserMiddleware;
