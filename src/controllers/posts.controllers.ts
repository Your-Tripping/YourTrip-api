import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/postsInterface";
import createPostService from "../services/posts/createPost.service";
import listPostsService from "../services/posts/listPosts.service";
import updatePostService from "../services/posts/updatePost.service";

const createPostController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body;
  const newPost = await createPostService(postData);
  return res.status(201).json(newPost);
};

const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService();
  return res.json(posts);
};

const updatePostController = async (req: Request, res: Response) => {
  const updatedPost = await updatePostService(req.params.id, req.body);
  return res.status(201).json(updatedPost);
};

export { createPostController, listPostsController, updatePostController };
