import prisma from "../config/prisma.js";
import type { RegisterInput } from "../schemas/auth.schema.js";

class StudioRepository {
  async findByEmail(email: string) {
    return prisma.studio.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.studio.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: RegisterInput & { password: string }) {
    return prisma.studio.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        createdAt: true,
      },
    });
  }
}

export default new StudioRepository();