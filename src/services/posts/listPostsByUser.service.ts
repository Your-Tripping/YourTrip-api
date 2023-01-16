import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const listPostsByUserService = async (id: string): Promise<Post[]> => {
  const postRepository = AppDataSource.getRepository(Post);

  const posts = await postRepository
    .createQueryBuilder("users")
    .innerJoinAndSelect("user.posts", "userPosts")
    .innerJoinAndSelect("userPosts.places", "userPostsPlaces")
    .where("users.id = :id_user", { id_user: id })
    .getMany();

  return posts;
};
export default listPostsByUserService;
