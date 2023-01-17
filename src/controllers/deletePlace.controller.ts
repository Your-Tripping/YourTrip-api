import { Request, Response } from "express";
import { deletePlaceService } from "../services/place/deletePlace.service";

export const deletePlaceController = async (req: Request, res: Response) => {
  await deletePlaceService(req.foundPlace);

  return res.status(204).end();
};
