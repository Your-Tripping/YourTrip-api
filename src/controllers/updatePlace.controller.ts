import { Request, Response } from "express";
import { updatePlaceService } from "../services/place/updatePlace.service";

export const updatePlaceController = async (req: Request, res: Response) => {
  await updatePlaceService(req.foundPlace, req.body);

  return res.status(200).end();
};
