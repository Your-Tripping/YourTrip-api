import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../error/errors";
import { ICommentsRequest } from "../../interfaces/comments";

const createCommentsService = async (
  content: any,
  user_id: string,
  post_id: string
): Promise<Comments[]> => {
  const postRepository = AppDataSource.getRepository(Post);
  const commentReository = AppDataSource.getRepository(Comments);

  const postExist = await postRepository.findOneBy({
    id: post_id,
  });

  if (!postExist) {
    throw new AppError("Post não exist!", 404);
  }

  const comment = commentReository.create({
    ...content,
    post: postExist,
    user: user_id,
  });

  await commentReository.save(comment);

  return comment;
};

export default createCommentsService;
