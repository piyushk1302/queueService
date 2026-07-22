import bookingRepository from "../repositories/booking.repository.js";
import classRepository from "../repositories/class.repository.js";

class BookingService {
  async create(customerId: string, classId: string) {
    // 1. Check if class exists
    const cls = await classRepository.findById(classId);

    if (!cls) {
      throw new Error("Class not found");
    }

    // 2. Check if class is active
    if (cls.status !== "ACTIVE") {
      throw new Error("Class is not available for booking");
    }

    // 3. Check duplicate booking
    const existingBooking =
      await bookingRepository.findByCustomerAndClass(
        customerId,
        classId
      );

    if (existingBooking) {
      throw new Error("You have already booked this class");
    }

    // 4. Check capacity
    const confirmedBookings =
      await bookingRepository.countConfirmedBookings(classId);

    if (confirmedBookings >= cls.capacity) {
      throw new Error("Class is full");
    }

    // 5. Create booking
    return bookingRepository.create(customerId, classId);
  }

  async getMyBookings(customerId: string) {
    return bookingRepository.findByCustomer(customerId);
  }

  async cancel(bookingId: string, customerId: string) {
    const booking = await bookingRepository.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.customerId !== customerId) {
      throw new Error("Unauthorized");
    }

    if (booking.status === "CANCELLED") {
      throw new Error("Booking already cancelled");
    }

    return bookingRepository.cancel(bookingId);
  }
}

export default new BookingService();