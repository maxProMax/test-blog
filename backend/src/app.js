/** @type {import('express')} */
import express from "express";
import cors from "cors";
import { postsRoutes } from "./routes/post.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

postsRoutes(app);

export { app };
