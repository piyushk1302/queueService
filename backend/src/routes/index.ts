import { Router } from "express";
import authRoutes from "./auth.routes.js";
import classRoutes from "./class.routes.js";
import customerRoutes from "./customer.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/classes", classRoutes);
router.use("/customers", customerRoutes);

export default router;