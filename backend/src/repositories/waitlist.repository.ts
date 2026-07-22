import prisma from "../config/prisma.js";

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

  async delete(id: string) {
    return prisma.waitlist.delete({
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

  async findNextInQueue(classId: string) {
    return prisma.waitlist.findFirst({
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