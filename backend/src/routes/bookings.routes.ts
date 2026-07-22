import { Router } from "express";
import bookingController from "../controllers/booking.controller.js";
import { customerAuthMiddleware } from "../middleware/customerAuth.middleware.js";
//import { scheduleReservationExpiry } from "../jobs/reservation.job.js";

const router = Router();



router.post(
  "/",
  customerAuthMiddleware,
  (req, res) => bookingController.create(req, res)
);

router.get(
  "/me",
  customerAuthMiddleware,
  (req, res) => bookingController.getMyBookings(req, res)
);

router.delete(
  "/:id",
  customerAuthMiddleware,
  (req, res) => bookingController.cancel(req, res)
);

export default router;