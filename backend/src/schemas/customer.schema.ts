import { z } from "zod";

export const registerCustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const loginCustomerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterCustomerInput = z.infer<
  typeof registerCustomerSchema
>;

export type LoginCustomerInput = z.infer<
  typeof loginCustomerSchema
>;