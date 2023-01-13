import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const deletePostService = async (foundPost: Post) => {
  const postRepository = AppDataSource.getRepository(Post);

  await postRepository.softRemove(foundPost);

  await postRepository.save({ ...foundPost, status: "removed" });

  return [];
};
export default deletePostService;
