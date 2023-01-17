import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const listPostsByUserService = async (id: string): Promise<Post[]> => {
  const postRepository = AppDataSource.getRepository(Post);

  const posts = await postRepository
    .createQueryBuilder("posts")
    .innerJoinAndSelect("posts.user", "userPosts")
    .where("posts.user = :id_user", { id_user: id })
    .getMany();

  return posts;
};
export default listPostsByUserService;
