import { Request, Response } from "express";
import updateCommentsService from "../../services/comments/updateComments.service";

const updateCommentsController = async (req: Request, res: Response) => {
  const data = await updateCommentsService(req.body, req.params.id);

  return res.status(201).json(data);
};

export default updateCommentsController;
