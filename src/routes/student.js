import { Router } from "express";
import StudentController from "../controllers/Student.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = new Router();

router.get("/students", StudentController.index);
router.get("/students/:id", StudentController.show);
router.post("/students/store", isAuthenticated, StudentController.store);
router.put("/students/:id", isAuthenticated, StudentController.update);
router.delete("/students/:id", isAuthenticated, StudentController.delete);

export { router };
