import { Request, Response } from "express";
import { IPostRequest } from "../interfaces/postsInterface";
import createPostService from "../services/posts/createPost.service";
import deletePostService from "../services/posts/deletePost.service";
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

const deletePostController = async (req: Request, res: Response) => {
  const deletePost = await deletePostService(req.params.id);
  return res.status(204).json({ message: "Post deletado com sucesso" });
};

export {
  createPostController,
  listPostsController,
  updatePostController,
  deletePostController,
};
