import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { AppError } from "../../error/errors";
import { ICommentRequest } from "../../interfaces/comments";

const updateCommentsService = async (
  content: ICommentRequest,
  comment_id: string
): Promise<Comments> => {
  const commentsReository = AppDataSource.getRepository(Comments);

  const comment = await commentsReository.findOneBy({ id: comment_id });

  if (!comment) {
    throw new AppError("Comment não exist", 404);
  }

  const updateComment = commentsReository.create({
    ...comment,
    ...content,
    updatedAt: new Date(),
  });

  await commentsReository.save(updateComment);

  return updateComment;
};

export default updateCommentsService;
