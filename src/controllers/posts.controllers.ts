import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/postsInterface";
import createPostService from "../services/posts/createPost.service";

const createPostController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body;
  const newPost = await createPostService(postData);
  return res.status(201).json(newPost);
};

export { createPostController };
