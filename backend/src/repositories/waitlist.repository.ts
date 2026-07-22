import prisma from "../config/prisma.js";
import type { Prisma } from "@prisma/client";

class WaitlistRepository {
  async findByCustomerAndClass(
    customerId: string,
    classId: string
  ) {
    return prisma.waitlist.findUnique({
      where: {
        customerId_classId: {
          customerId,
          classId,
        },
      },
    });
  }

  async create(customerId: string, classId: string) {
    return prisma.waitlist.create({
      data: {
        customerId,
        classId,
      },
    });
  }

  async findByCustomer(customerId: string) {
    return prisma.waitlist.findMany({
      where: {
        customerId,
      },
      include: {
        class: true,
      },
      orderBy: {
        joinedAt: "asc",
      },
    });
  }

  async delete(
  id: string,
  tx?: Prisma.TransactionClient
) {
  const db = tx ?? prisma;

  return db.waitlist.delete({
    where: {
      id,
    },
  });
}

  async findById(id: string) {
    return prisma.waitlist.findUnique({
      where: {
        id,
      },
    });
  }

  async findNextInQueue(
  classId: string,
  tx?: Prisma.TransactionClient
) {
  const db = tx ?? prisma;

  return db.waitlist.findFirst({
    where: {
      classId,
    },
    orderBy: {
      joinedAt: "asc",
    },
  });
}
}

export default new WaitlistRepository();