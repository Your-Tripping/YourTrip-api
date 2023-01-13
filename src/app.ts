import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { errorHandler } from "./error/errors";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import postsRoutes from "./routes/posts.routes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use("", sessionRoutes);

app.use(errorHandler);

export default app;
