import { Request, Response } from "express";
import createlikesService from "../../services/likes/createlikes.service";

const createlikesController = async (req: Request, res: Response) => {
  const data = await createlikesService(req.params.id, req.user.id);

  return res.status(201).json(data);
};

export default createlikesController;
