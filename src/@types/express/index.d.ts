import * as express from "express";
import { User } from "../../entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdm: boolean;
        isActive: boolean;
      };
      foundUser: User;
      validatedBody: object;
      loggedIn: boolean;
    }
  }
}
