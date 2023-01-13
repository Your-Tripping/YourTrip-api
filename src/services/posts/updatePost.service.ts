import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { AppError } from "../../error/errors";
import { IPostUpdate } from "../../interfaces/postsInterface";

const updatePostService = async (id: string, updateData: IPostUpdate) => {
  const postRepository = AppDataSource.getRepository(Post);

  const post = await postRepository.findOneBy({
    id: id,
  });

  if (!post) {
    throw new AppError("Invalid ID", 404);
  }

  const updatedPost = postRepository.create({
    ...post,
    ...updateData,
  });

  const newPost = await postRepository.save(updatedPost);

  return newPost;
};

export default updatePostService;
