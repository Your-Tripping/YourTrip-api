import AppDataSource from "../../data-source";
import { Follows } from "../../entities/follows.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/errors";

const createfollowsService = async (
  follower_id: string,
  following_id: string
): Promise<Follows> => {
  const followRepository = AppDataSource.getRepository(Follows);
  const userRepository = AppDataSource.getRepository(User);

  const followerUserExist = await userRepository.findOneBy({ id: follower_id });

  if (!followerUserExist) {
    throw new AppError("User não exist!", 404);
  }

  const followingUserExist = await userRepository.findOneBy({
    id: following_id,
  });

  if (!followingUserExist) {
    throw new AppError("User não exist!", 404);
  }

  const follow = followRepository.create({
    follower: followerUserExist,
    following: followingUserExist,
  });

  await followRepository.save(follow);

  return follow;
};

export default createfollowsService;
