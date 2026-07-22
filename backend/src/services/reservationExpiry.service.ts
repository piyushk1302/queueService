import waitlistRepository from "../repositories/waitlist.repository.js";
import reservationRepository from "../repositories/reservation.repository.js";
import prisma from "../config/prisma.js";
import { getReservationExpiry } from "../utils/reservation.js";
import { scheduleReservationExpiry } from "../jobs/reservation.job.js";

class ReservationExpiryService {
  async process(reservationId: string) {
    const reservation = await reservationRepository.findById(
      reservationId
    );

    // Reservation already accepted or removed
    if (!reservation) {
      console.log("Reservation already handled");
      return;
    }

    // Safety check
    if (reservation.expiresAt > new Date()) {
      console.log("Reservation not expired yet");
      return;
    }

    console.log(`Expiring reservation ${reservation.id}`);

    const newReservation = await prisma.$transaction(async (tx) => {
      // Delete expired reservation
      await reservationRepository.delete(reservation.id, tx);

      // Find next customer in queue
      const nextCustomer =
  await waitlistRepository.findNextInQueue(
    reservation.classId,
    tx
  );

      // Nobody waiting
      if (!nextCustomer) {
        return null;
      }

      // Create reservation for next customer
      const reservationCreated =
        await reservationRepository.create(
          nextCustomer.customerId,
          nextCustomer.classId,
          getReservationExpiry(),
          tx
        );

      // Remove from waitlist
      await waitlistRepository.delete(
        nextCustomer.id,
        tx
      );

      return reservationCreated;
    });

    if (!newReservation) {
      console.log("No more customers waiting");
      return;
    }

    // Schedule expiry for the newly created reservation
    await scheduleReservationExpiry(
      newReservation.id,
      5000 // Change back to default 10 min after testing
    );

    console.log(
      `Next reservation created: ${newReservation.id}`
    );
  }
}

export default new ReservationExpiryService();