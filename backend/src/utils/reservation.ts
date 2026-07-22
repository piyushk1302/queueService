export function getReservationExpiry(minutes = 10): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}