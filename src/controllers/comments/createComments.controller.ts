import { Request, Response } from "express";
import createCommentsService from "../../services/comments/createComments.service";

const createCommentsController = async (req: Request, res: Response) => {
  const data = await createCommentsService(
    req.body,
    req.user.id,
    req.params.id
  );

  return res.status(201).json(data);
};

export default createCommentsController;
