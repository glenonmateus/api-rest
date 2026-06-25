import express from "express";
import morgan from "morgan";
import "./src/database/index.js";
import { router as photoRouter } from "./src/routes/Photo.js";
import { router as studentRouter } from "./src/routes/student.js";
import { router as tokenRouter } from "./src/routes/token.js";
import { router as userRouter } from "./src/routes/user.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(tokenRouter);
    this.app.use(userRouter);
    this.app.use(studentRouter);
    this.app.use(photoRouter);
  }
}

export default new App().app;
