import { Request, Response } from "express";
import deletefollowsService from "../../services/follows/deletefollows.service";

const deletefollowsController = async (req: Request, res: Response) => {
  const data = await deletefollowsService(req.params.id);

  return res.status(201).json(data);
};

export default deletefollowsController;
