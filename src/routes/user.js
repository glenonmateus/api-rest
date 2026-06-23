import { Router } from "express";
import UserController from "../controllers/User.js";

const router = new Router();

router.get("/users", UserController.index);
router.post("/users/store", UserController.store);

export { router };
