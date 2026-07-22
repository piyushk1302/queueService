import { Router } from "express";
import customerController from "../controllers/customer.controller.js";
import { customerAuthMiddleware } from "../middleware/customerAuth.middleware.js";

const router = Router();

router.post("/register", (req, res) =>
  customerController.register(req, res)
);

router.post("/login", (req, res) =>
  customerController.login(req, res)
);

router.get("/me", customerAuthMiddleware, (req, res) =>
  customerController.me(req, res)
);

export default router;