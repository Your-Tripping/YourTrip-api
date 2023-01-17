import AppDataSource from "../../data-source";
import { Place } from "../../entities/place.entity";

export const deletePlaceService = async (place: Place) => {
  const placeRepo = AppDataSource.getRepository(Place);

  await placeRepo
    .createQueryBuilder("places")
    .delete()
    .from(Place)
    .where("id = :id", { id: place.id })
    .execute();

  return;
};
