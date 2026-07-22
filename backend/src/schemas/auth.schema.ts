import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  phone: z.string().min(10),
  address: z.string().min(3),
});

export type RegisterInput = z.infer<typeof registerSchema>;