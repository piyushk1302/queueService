import prisma from "../config/prisma.js";
import type {
  CreateClassInput,
  UpdateClassInput,
} from "../schemas/class.schema.js";

class ClassRepository {
  async create(data: CreateClassInput, studioId: string) {
    return prisma.class.create({
      data: {
        title: data.title,
        instructor: data.instructor,
        capacity: data.capacity,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        studioId,
        ...(data.description !== undefined && {
          description: data.description,
        }),
      },
    });
  }

  async findAllByStudioId(studioId: string) {
    return prisma.class.findMany({
      where: {
        studioId,
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.class.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateClassInput) {
    return prisma.class.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
  return prisma.class.delete({
    where: {
      id,
    },
  });
}
}

export default new ClassRepository();