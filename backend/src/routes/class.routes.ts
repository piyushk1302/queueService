import { Router } from "express";
import classController from "../controllers/class.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, (req, res) =>
  classController.create(req, res)
);

export default router;