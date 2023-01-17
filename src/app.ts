import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { errorHandler } from "./error/errors";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import postsRoutes from "./routes/posts.routes";
import commentsRoutes from "./routes/comments.routes";
import likesRoutes from "./routes/likes.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("", sessionRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);

app.use(errorHandler);

export default app;
