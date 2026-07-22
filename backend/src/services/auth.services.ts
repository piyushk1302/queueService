import type { LoginInput, RegisterInput } from "../schemas/auth.schema.js";
import studioRepository from "../repositories/studio.repository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  async register(data: RegisterInput) {
    const existingStudio = await studioRepository.findByEmail(data.email);

    if (existingStudio) {
      throw new Error("Studio already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const studio = await studioRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken(studio.id, "studio");

    return {
      studio,
      token,
    };
  }

  async login(data: LoginInput) {
    const studio = await studioRepository.findByEmail(data.email);

    if (!studio) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
      data.password,
      studio.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(studio.id, "studio");

    return {
      studio: {
        id: studio.id,
        name: studio.name,
        email: studio.email,
      },
      token,
    };
  }
}

export default new AuthService();