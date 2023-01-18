import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";
import { AppError } from "../../error/errors";

const deleteCommentsService = async (
  comment_id: string
): Promise<Comments[]> => {
  const commentRepository = AppDataSource.getRepository(Comments);

  const commentExist = await commentRepository.findOneBy({
    id: comment_id,
  });

  if (!commentExist) {
    throw new AppError("Comment não exist!", 404);
  }

  await commentRepository
    .createQueryBuilder("comments")
    .delete()
    .from(Comments)
    .where("id=:id", { id: comment_id })
    .execute();

  return [];
};

export default deleteCommentsService;
