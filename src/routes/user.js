import { Router } from "express";
import UserController from "../controllers/User.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = new Router();

router.post("/users/store", UserController.store);
router.put("/users", isAuthenticated, UserController.update);
router.delete("/users", isAuthenticated, UserController.delete);

export { router };
