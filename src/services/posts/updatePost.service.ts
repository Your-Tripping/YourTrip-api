import AppDataSource from "../../data-source";
import { Post } from "../../entities/post.entity";
import { IPostUpdate } from "../../interfaces/postsInterface";

const updatePostService = async (postData: Post, updateData: IPostUpdate) => {
  const postRepository = AppDataSource.getRepository(Post);

  const updatedPost = postRepository.create({
    ...postData,
    ...updateData,
  });

  const newPost = await postRepository.save(updatedPost);

  return newPost;
};

export default updatePostService;
