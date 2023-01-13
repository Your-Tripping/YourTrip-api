import AppDataSource from "../../data-source";
import { Place } from "../../entities/place.entity";
import { Post } from "../../entities/post.entity";
import { IPostUpdate } from "../../interfaces/postsInterface";

const updatePostService = async (postData: Post, updateData: IPostUpdate) => {
  const postRepository = AppDataSource.getRepository(Post);
  const placeRepository = AppDataSource.getRepository(Place);

  const createPlaces = placeRepository.create([...postData.places]);
  const updatedPlaces = await placeRepository.save(createPlaces);

  const updatedPost = postRepository.create({
    ...postData,
    ...updateData,
    places: updatedPlaces,
  });

  const newPost = await postRepository.save(updatedPost);

  return newPost;
};

export default updatePostService;
