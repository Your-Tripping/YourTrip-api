import { Request, Response } from "express";
import deletelikesService from "../../services/likes/deletelikes.service";

const deletelikesController = async (req: Request, res: Response) => {
  const data = await deletelikesService(req.params.id);
  return res.status(201).json();
};

export default deletelikesController;
