import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../error/errors";

const deletePostService = async (id: string) => {
  const postRepository = AppDataSource.getRepository(Post);

  const foundPost = await postRepository.findOneBy({ id: id });

  if (!foundPost) {
    throw new AppError("Invalid ID", 404);
  }

  await postRepository.softRemove(foundPost);

  await postRepository.save({ ...foundPost, status: "removed" });

  return [];
};
export default deletePostService;
