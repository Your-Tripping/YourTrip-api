import { IPostRequest } from "../postsInterface";

export interface ICommentRequest {
  content: string;
}

export interface IPropertyAddress {
  post: Array<IPostRequest>;
}
