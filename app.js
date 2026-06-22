import express from "express";
import home from "./src/routes/home.js";
import morgan from "morgan";

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
    this.app.use("/", home);
  }
}

export default new App().app;
