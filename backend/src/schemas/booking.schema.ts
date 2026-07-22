import { z } from "zod";

export const createBookingSchema = z.object({
  classId: z.uuid("Invalid class id"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;