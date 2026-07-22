import prisma from "../config/prisma.js";
import type { Prisma } from "@prisma/client";

class BookingRepository {
  async findByCustomerAndClass(
    customerId: string,
    classId: string
  ) {
    return prisma.booking.findUnique({
      where: {
        customerId_classId: {
          customerId,
          classId,
        },
      },
    });
  }

  async countConfirmedBookings(classId: string) {
    return prisma.booking.count({
      where: {
        classId,
        status: "CONFIRMED",
      },
    });
  }

  async create(
  customerId: string,
  classId: string,
  tx?: Prisma.TransactionClient
) {
  const db = tx ?? prisma;

  return db.booking.create({
    data: {
      customerId,
      classId,
    },
  });
}

  async findById(id: string) {
    return prisma.booking.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCustomer(customerId: string) {
    return prisma.booking.findMany({
      where: {
        customerId,
      },
      include: {
        class: true,
      },
      orderBy: {
        bookedAt: "desc",
      },
    });
  }

  async cancel(
  id: string,
  tx?: Prisma.TransactionClient
) {
  const db = tx ?? prisma;

  return db.booking.update({
    where: {
      id,
    },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
    },
  });
}
}

export default new BookingRepository();