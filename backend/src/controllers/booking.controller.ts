import type { Request, Response } from "express";
import bookingService from "../services/booking.service.js";
import { createBookingSchema } from "../schemas/booking.schema.js";

class BookingController {
  async create(req: Request, res: Response) {
    try {
      if (!req.customerId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const { classId } = createBookingSchema.parse(req.body);

      const booking = await bookingService.create(
        req.customerId,
        classId
      );

      return res.status(201).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }

  async getMyBookings(req: Request, res: Response) {
    try {
      if (!req.customerId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const bookings = await bookingService.getMyBookings(
        req.customerId
      );

      return res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      if (!req.customerId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      await bookingService.cancel(
        req.params.id,
        req.customerId
      );

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      });
    }
  }
}

export default new BookingController();