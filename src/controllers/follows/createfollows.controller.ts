import { Request, Response } from "express";
import createfollowsService from "../../services/follows/createfollows.service";

const createfollowsController = async (req: Request, res: Response) => {
  const data = await createfollowsService(req.user.id, req.params.id);

  return res.status(201).json(data);
};

export default createfollowsController;
