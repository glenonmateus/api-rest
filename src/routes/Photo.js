import { Router } from "express";
import PhotoController from "../controllers/Photo.js";

const router = new Router();

router.post("/photos", PhotoController.store);

export { router };
