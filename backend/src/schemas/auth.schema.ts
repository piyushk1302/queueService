import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10).max(15),
  address: z.string().trim().min(3),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;