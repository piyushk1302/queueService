import { reservationQueue } from "../queue/reservation.queue.js";

export async function scheduleReservationExpiry(
  reservationId: string,
  delay = 10 * 60 * 1000
) {
  await reservationQueue.add(
    "expire-reservation",
    {
      reservationId,
    },
    {
      delay,
      removeOnComplete: true,
      removeOnFail: 100,
    }
  );
}