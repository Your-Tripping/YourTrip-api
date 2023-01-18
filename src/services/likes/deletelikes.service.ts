import AppDataSource from "../../data-source";
import { Likes } from "../../entities/likes.entity";

const deletelikesService = async (like_id: string) => {
  const likesRepository = AppDataSource.getRepository(Likes);

  await likesRepository.delete({ id: like_id });

  return [];
};

export default deletelikesService;
