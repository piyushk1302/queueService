export function getReservationExpiry(minutes = 10): Date {
  return new Date(Date.now() +  5000);
}