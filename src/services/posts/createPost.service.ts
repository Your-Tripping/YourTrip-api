import AppDataSource from "../../data-source";
import { Place } from "../../entities/place.entity";
import { Post } from "../../entities/post.entity";
import { IPostRequest } from "../../interfaces/postsInterface";
import {
  postResponseSerializer,
  postSerializer,
} from "../../serializers/post.serializers";

const createPostService = async (data: IPostRequest) => {
  const postRepository = AppDataSource.getRepository(Post);
  const placeRepository = AppDataSource.getRepository(Place);

  const createPlaces = placeRepository.create(data.places);
  const newPlaces = await placeRepository.save(createPlaces);

  const post = {
    ...data,
    places: newPlaces,
  };

  const createPost = postRepository.create(post);
  const newPost = await postRepository.save(createPost);

  return newPost;
};

export default createPostService;
