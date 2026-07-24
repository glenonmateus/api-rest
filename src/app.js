import express from "express";
import morgan from "morgan";
import { resolve } from "path";
import "./database/index.js";
import { router as photoRouter } from "./routes/Photo.js";
import { router as studentRouter } from "./routes/student.js";
import { router as tokenRouter } from "./routes/token.js";
import { router as userRouter } from "./routes/user.js";
import cors from 'cors'

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(import.meta.dirname, "uploads")));
    this.app.use(morgan("combined"));
    this.app.use(cors({ origin: "http://localhost:3000" }))
  }

  routes() {
    this.app.use(tokenRouter);
    this.app.use(userRouter);
    this.app.use(studentRouter);
    this.app.use(photoRouter);
  }
}

export default new App().app;
