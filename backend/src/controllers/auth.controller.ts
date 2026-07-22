import type { Request, Response } from "express";
import authService from "../services/auth.services.js";
import {
  registerSchema,
  loginSchema,
} from "../schemas/auth.schema.js";

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const data = registerSchema.parse(req.body);

      const result = await authService.register(data);

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await authService.login(data);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  }
}

export default new AuthController();