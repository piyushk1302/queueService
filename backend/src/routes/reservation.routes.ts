import { Router } from "express";
import reservationController from "../controllers/reservation.controller.js";
import {customerAuthMiddleware} from "../middleware/customerAuth.middleware.js";

const router = Router();

router.use(customerAuthMiddleware);

router.get(
  "/me",
  reservationController.getMyReservations
);

router.post(
  "/:id/accept",
  reservationController.accept
);

export default router;