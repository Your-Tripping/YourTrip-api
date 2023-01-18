import AppDataSource from "../../data-source";
import { Follows } from "../../entities/follows.entity";

const deletefollowsService = async (followe_id: string) => {
  const followsRepository = AppDataSource.getRepository(Follows);

  await followsRepository.softDelete(followe_id);

  return [];
};

export default deletefollowsService;
