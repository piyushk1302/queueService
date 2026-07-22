import bookingRepository from "../repositories/booking.repository.js";
import reservationRepository from "../repositories/reservation.repository.js";
import prisma from "../config/prisma.js";

class ReservationService {
  async accept(reservationId: string, customerId: string) {
    // 1. Reservation exists?
    const reservation = await reservationRepository.findById(
      reservationId
    );

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    // 2. Reservation belongs to customer?
    if (reservation.customerId !== customerId) {
      throw new Error("Unauthorized");
    }

    // 3. Reservation expired?
    if (reservation.expiresAt.getTime() < Date.now()) {
      throw new Error("Reservation has expired");
    }

    // 4. Create booking
    return prisma.$transaction(async (tx) => {
  // Create booking
  const booking = await bookingRepository.create(
    customerId,
    reservation.classId,
    tx
  );

  // Delete reservation
  await reservationRepository.delete(
    reservation.id,
    tx
  );

  return booking;
});
  }

  async getMyReservations(customerId: string) {
    return reservationRepository.findByCustomer(customerId);
  }
}

export default new ReservationService();