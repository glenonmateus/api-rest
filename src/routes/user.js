import { Router } from "express";
import UserController from "../controllers/User.js";

const router = new Router();

router.get("/users", UserController.index);
router.post("/users/store", UserController.store);
router.get("/users/:id", UserController.show);
router.delete("/users/:id", UserController.delete);
router.put("/users/:id", UserController.update);

export { router };
