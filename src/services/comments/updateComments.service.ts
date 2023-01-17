import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { AppError } from "../../error/errors";

const updateCommentsService = async (content: any, comment_id: string) => {
  const commentsReository = AppDataSource.getRepository(Comments);

  const comment = commentsReository.findOneBy({ id: comment_id });

  if (!comment) {
    throw new AppError("Comment não exist", 404);
  }

  const updateComment = commentsReository.create({
    ...comment,
    ...content,
    updatedAt: new Date(),
  });

  const newComment = await commentsReository.save(updateComment);

  return newComment;
};

export default updateCommentsService;
