import { z } from "zod";

export const createWaitlistSchema = z.object({
  classId: z.string().uuid("Invalid class ID"),
});

export type CreateWaitlistInput = z.infer<
  typeof createWaitlistSchema
>;