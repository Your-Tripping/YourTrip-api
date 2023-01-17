import { Request, Response } from "express";
import createlikesService from "../../services/likes/createlikes.service";

const createlikesController = async (req: Request, res: Response) => {
  const post_id: string = req.params.id;
  const user_id: string = req.user.id;
  const data = await createlikesService(post_id, user_id);

  return res.status(201).json(data);
};

export default createlikesController;
