import { Request, Response } from "express";
import deleteCommentsService from "../../services/comments/deleteComments.service";

const deleteCommentsController = async (req: Request, res: Response) => {
  const data = await deleteCommentsService(req.params.id);

  return res.status(204).json(data);
};

export default deleteCommentsController;
