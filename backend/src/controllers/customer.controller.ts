import type { Request, Response } from "express";
import customerService from "../services/customer.service.js";
import {
  loginCustomerSchema,
  registerCustomerSchema,
} from "../schemas/customer.schema.js";

class CustomerController {
  async register(req: Request, res: Response) {
    try {
      const data = registerCustomerSchema.parse(req.body);

      const result = await customerService.register(data);

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
      const data = loginCustomerSchema.parse(req.body);

      const result = await customerService.login(data);

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

  async me(req: Request, res: Response) {
    try {
      if (!req.customerId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const customer = await customerService.getProfile(req.customerId);

      return res.status(200).json({
        success: true,
        data: customer,
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

export default new CustomerController();