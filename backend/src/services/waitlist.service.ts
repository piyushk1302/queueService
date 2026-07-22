import bookingRepository from "../repositories/booking.repository.js";
import classRepository from "../repositories/class.repository.js";
import waitlistRepository from "../repositories/waitlist.repository.js";

class WaitlistService {
  async join(customerId: string, classId: string) {
    // 1. Check if class exists
    const cls = await classRepository.findById(classId);

    if (!cls) {
      throw new Error("Class not found");
    }

    // 2. Check class status
    if (cls.status !== "ACTIVE") {
      throw new Error("Class is not accepting registrations");
    }

    // 3. Customer already booked?
    const booking = await bookingRepository.findByCustomerAndClass(
      customerId,
      classId
    );

    if (booking && booking.status === "CONFIRMED") {
      throw new Error("You have already booked this class");
    }

    // 4. Already in waitlist?
    const existingWaitlist =
      await waitlistRepository.findByCustomerAndClass(
        customerId,
        classId
      );

    if (existingWaitlist) {
      throw new Error("You are already on the waitlist");
    }

    // 5. Join waitlist
    return waitlistRepository.create(customerId, classId);
  }

  async getMyWaitlists(customerId: string) {
    return waitlistRepository.findByCustomer(customerId);
  }

  async leave(waitlistId: string, customerId: string) {
    const waitlist = await waitlistRepository.findById(waitlistId);

    if (!waitlist) {
      throw new Error("Waitlist entry not found");
    }

    if (waitlist.customerId !== customerId) {
      throw new Error("Unauthorized");
    }

    await waitlistRepository.delete(waitlistId);
  }
}

export default new WaitlistService();