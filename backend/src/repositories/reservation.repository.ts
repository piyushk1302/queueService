import prisma from "../config/prisma.js";

class ReservationRepository {
  async create(customerId: string, classId: string, expiresAt: Date) {
    return prisma.reservation.create({
      data: {
        customerId,
        classId,
        expiresAt,
      },
    });
  }

  async findById(id: string) {
    return prisma.reservation.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCustomer(customerId: string) {
    return prisma.reservation.findMany({
      where: {
        customerId,
      },
      include: {
        class: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string) {
    return prisma.reservation.delete({
      where: {
        id,
      },
    });
  }

  async findExpiredReservations(now: Date) {
    return prisma.reservation.findMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
  }

  async findActiveReservation(customerId: string, classId: string) {
    return prisma.reservation.findFirst({
      where: {
        customerId,
        classId,
      },
    });
  }

  
}

export default new ReservationRepository();