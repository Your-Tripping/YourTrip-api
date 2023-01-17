import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";

const listPostsService = async (): Promise<Post[]> => {
  const postRepository = AppDataSource.getRepository(Post);

  const posts = await postRepository.find({
    relations: {
      places: true,
      user: true,
    },
  });

  return posts;
};

export default listPostsService;
