import AppDataSource from "../../data-source";
import { Likes } from "../../entities/likes.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/errors";

const createlikesService = async (
  post_id: string,
  user_id: string
): Promise<Likes> => {
  const likesRepository = AppDataSource.getRepository(Likes);
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  const postExist = await postRepository.findOneBy({ id: post_id });

  if (!postExist) {
    throw new AppError("Post não exist!", 404);
  }

  const userExist = await userRepository.findOneBy({ id: user_id });

  if (!userExist) {
    throw new AppError("User não exist!", 404);
  }

  const like = likesRepository.create({
    post: postExist,
    user: userExist,
  });

  await likesRepository.save(like);

  return like;
};

export default createlikesService;
