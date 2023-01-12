import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { errorHandler } from "./error/errors";

const app = express();
app.use(express.json());

app.use(errorHandler);

export default app;
