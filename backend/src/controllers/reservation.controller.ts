import type { Request, Response } from "express";
import reservationService from "../services/reservation.service.js";

class ReservationController {
  async getMyReservations(req: Request, res: Response) {
    const customerId = req.customerId!;

    const reservations =
      await reservationService.getMyReservations(customerId);

    res.status(200).json({
      success: true,
      data: reservations,
    });
  }

  async accept(req: Request, res: Response) {
    const customerId = req.customerId!;
    const { id } = req.params;

    const booking = await reservationService.accept(
      id,
      customerId
    );

    res.status(200).json({
      success: true,
      message: "Reservation accepted successfully",
      data: booking,
    });
  }
}

export default new ReservationController();