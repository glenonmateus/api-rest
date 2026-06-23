import { Router } from "express";
import StudentController from "../controllers/Student.js";

const router = new Router();

router.get("/students", StudentController.index);
router.post("/students/store", StudentController.store);
router.get("/students/:id", StudentController.show);

export { router };
