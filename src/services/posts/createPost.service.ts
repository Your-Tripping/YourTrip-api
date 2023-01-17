import AppDataSource from "../../data-source";
import { Place } from "../../entities/place.entity";
import { Post } from "../../entities/post.entity";
import { User } from "../../entities/user.entity";
import { IPostRequest } from "../../interfaces/postsInterface";

const createPostService = async (data: IPostRequest, user: string) => {
  const postRepository = AppDataSource.getRepository(Post);
  const placeRepository = AppDataSource.getRepository(Place);
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: user,
  });

  const createPlaces = placeRepository.create(data.places);

  const newPlaces = await placeRepository.save(createPlaces);

  const post = {
    ...data,
    user: findUser,
    places: newPlaces,
  };

  const createPost = postRepository.create(post);
  const newPost = await postRepository.save(createPost);

  return newPost;
};

export default createPostService;
