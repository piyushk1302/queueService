import { Router } from "express";
import bookingController from "../controllers/booking.controller.js";
import { customerAuthMiddleware } from "../middleware/customerAuth.middleware.js";
//import { scheduleReservationExpiry } from "../jobs/reservation.job.js";
import mailService from "../services/mail.service.js";

const router = Router();

router.get("/test-email", async (_req, res, next) => {
    try {
        await mailService.sendMail(
            "piyushk1302@gmail.com",
            "QueueFlow Test",
            "<h1>Hello from QueueFlow 🚀</h1>"
        );

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        next(error);
    }
});



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