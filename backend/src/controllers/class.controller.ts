import type { Request, Response } from "express";
import classService from "../services/class.service.js";
import { createClassSchema } from "../schemas/class.schema.js";

class ClassController {
  async create(req: Request, res: Response) {
    try {
      const data = createClassSchema.parse(req.body);

      const studioId = req.studioId;

      if (!studioId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const createdClass = await classService.create(data, studioId);

      return res.status(201).json({
        success: true,
        data: createdClass,
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

export default new ClassController();