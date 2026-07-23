import bookingRepository from "../repositories/booking.repository.js";
import classRepository from "../repositories/class.repository.js";
import reservationRepository from "../repositories/reservation.repository.js";
import waitlistRepository from "../repositories/waitlist.repository.js";
import prisma from "../config/prisma.js";
import type { Booking, Reservation, Waitlist } from "@prisma/client";

import { getReservationExpiry } from "../utils/reservation.js";
import { scheduleReservationExpiry } from "../jobs/reservation.job.js";
import mailService from "./mail.service.js";

type CancelResult =
  | {
      status: "CANCELLED";
      booking: Booking;
    }
  | {
      status: "RESERVATION_CREATED";
      booking: Booking;
      reservation: Reservation;
      nextCustomer: Waitlist;
    };

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
    const existingBooking = await bookingRepository.findByCustomerAndClass(
      customerId,
      classId
    );

    if (existingBooking && existingBooking.status === "CONFIRMED") {
      throw new Error("You have already booked this class");
    }

    // 4. Check capacity
    const confirmedBookings =
      await bookingRepository.countConfirmedBookings(classId);

    if (confirmedBookings >= cls.capacity) {
      const existingWaitlist =
        await waitlistRepository.findByCustomerAndClass(
          customerId,
          classId
        );

      if (existingWaitlist) {
        throw new Error("You are already on the waitlist");
      }

      const waitlist = await waitlistRepository.create(
        customerId,
        classId
      );

      return {
        status: "WAITLISTED",
        waitlist,
      };
    }

    // 5. Create booking
    const booking = await bookingRepository.create(
      customerId,
      classId
    );

    return {
      status: "CONFIRMED",
      booking,
    };
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

    const result: CancelResult = await prisma.$transaction(async (tx) => {
      // Cancel booking
      const cancelledBooking = await bookingRepository.cancel(
        bookingId,
        tx
      );

      // Find next customer in waitlist
      const nextCustomer =
        await waitlistRepository.findNextInQueue(
          booking.classId,
          tx
        );

      // Nobody waiting
      if (!nextCustomer) {
        return {
          status: "CANCELLED",
          booking: cancelledBooking,
        };
      }

      // Create reservation
      const reservation =
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

      return {
        status: "RESERVATION_CREATED",
        booking: cancelledBooking,
        reservation,
        nextCustomer,
      };
    });

    // Schedule BullMQ job only after successful commit
    if (result.status === "RESERVATION_CREATED") {
  await scheduleReservationExpiry(
    result.reservation.id,
    60000
  );

  const details =
    await reservationRepository.findReservationDetails(
      result.reservation.id
    );

  if (!details) {
    throw new Error("Reservation not found");
  }

  await mailService.sendReservationCreated(
    details.customer.email,
    {
      customerName: details.customer.name,
      classTitle: details.class.title,
      instructor: details.class.instructor,
      location: details.class.location,
      startTime: details.class.startTime,
      endTime: details.class.endTime,
      expiresAt: details.expiresAt,
    }
  );
}

    return result;
  }
}

export default new BookingService();