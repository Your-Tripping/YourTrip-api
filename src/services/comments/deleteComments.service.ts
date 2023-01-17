import AppDataSource from "../../data-source";
import { Comments } from "../../entities/comments.entity";

const deleteCommentsService = async (
  comment_id: string
): Promise<Comments[]> => {
  const commentRepository = AppDataSource.getRepository(Comments);

  await commentRepository
    .createQueryBuilder("comments")
    .delete()
    .from(Comments)
    .where("id=:id", { id: comment_id })
    .execute();

  return [];
};

export default deleteCommentsService;
