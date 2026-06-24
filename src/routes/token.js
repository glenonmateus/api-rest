import { Router } from "express";
import TokenController from "../controllers/Token.js";

const router = new Router();

router.post("/tokens", TokenController.store);

export { router };
