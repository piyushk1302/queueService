import classRepository from "../repositories/class.repository.js";
import type {
  CreateClassInput,
  UpdateClassInput,
} from "../schemas/class.schema.js";

class ClassService {
  async create(data: CreateClassInput, studioId: string) {
    if (data.capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }

    return classRepository.create(data, studioId);
  }

  async getAll(studioId: string) {
    return classRepository.findAllByStudioId(studioId);
  }

  async getById(id: string, studioId: string) {
    const cls = await classRepository.findById(id);

    if (!cls) {
      throw new Error("Class not found");
    }

    if (cls.studioId !== studioId) {
      throw new Error("Unauthorized");
    }

    return cls;
  }

  async update(
    id: string,
    data: UpdateClassInput,
    studioId: string
  ) {
    const cls = await classRepository.findById(id);

    if (!cls) {
      throw new Error("Class not found");
    }

    if (cls.studioId !== studioId) {
      throw new Error("Unauthorized");
    }

    if (
      data.capacity !== undefined &&
      data.capacity <= 0
    ) {
      throw new Error("Capacity must be greater than 0");
    }

    return classRepository.update(id, data);
  }
}

export default new ClassService();