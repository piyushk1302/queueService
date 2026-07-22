import classRepository from "../repositories/class.repository.js";
import type { CreateClassInput } from "../schemas/class.schema.js";

class ClassService {
  async create(data: CreateClassInput, studioId: string) {
    // Business Rules go here

    if (data.capacity <= 0) {
      throw new Error("Capacity must be greater than 0");
    }

    return classRepository.create(data, studioId);
  }
}

export default new ClassService();