import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/errors";
import { ICommentRequest } from "../../interfaces/comments";

const createCommentsService = async (
  content: ICommentRequest,
  user_id: string,
  post_id: string
): Promise<Comments> => {
  const postRepository = AppDataSource.getRepository(Post);
  const commentReository = AppDataSource.getRepository(Comments);
  const userRepository = AppDataSource.getRepository(User);

  const postExist = await postRepository.findOneBy({
    id: post_id,
  });

  if (!postExist) {
    throw new AppError("Post não exist!", 404);
  }

  const userExist = await userRepository.findOneBy({ id: user_id });

  if (!userExist) {
    throw new AppError("User não exist!", 404);
  }

  const comment = commentReository.create({
    ...content,
    post: postExist,
    user: userExist,
  });

  await commentReository.save(comment);

  return comment;
};

export default createCommentsService;
