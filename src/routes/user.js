import { Router } from "express";
import UserController from "../controllers/User.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = new Router();

router.get("/users", isAuthenticated, UserController.index);
router.post("/users/store", UserController.store);
router.get("/users/:id", UserController.show);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id", isAuthenticated, UserController.update);

export { router };
