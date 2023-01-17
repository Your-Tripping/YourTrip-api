import AppDataSource from "../../data-source";
import { Place } from "../../entities/place.entity";
import { IPlaceRequest } from "../../interfaces/places";

export const updatePlaceService = async (
  place: Place,
  updateData: IPlaceRequest
) => {
  const placeRepo = AppDataSource.getRepository(Place);

  const updatedPlace = placeRepo.create({
    ...place,
    ...updateData,
  });

  await placeRepo.save(updatedPlace);

  return updatedPlace;
};
