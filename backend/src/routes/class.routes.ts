import { Router } from "express";
import classController from "../controllers/class.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, (req, res) =>
  classController.create(req, res)
);

router.get("/", authMiddleware, (req, res) =>
  classController.getAll(req, res)
);

router.get("/:id", authMiddleware, (req, res) =>
  classController.getById(req, res)
);

router.patch("/:id", authMiddleware, (req, res) =>
  classController.update(req, res)
);

router.delete("/:id", authMiddleware, (req, res) =>
  classController.delete(req, res)
);

export default router;