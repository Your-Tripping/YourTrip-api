import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Place } from "../entities/place.entity";

import { AppError } from "../error/errors";

export const verifyPlaceExistsMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const placeRepository = AppDataSource.getRepository(Place);

  const place = await placeRepository.findOneBy({ id: req.params.id });

  if (!place) {
    throw new AppError("Invalid ID", 404);
  }

  req.foundPlace = place;

  return next();
};
