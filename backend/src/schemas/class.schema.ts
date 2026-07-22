import { z } from "zod";

export const createClassSchema = z
  .object({
    title: z.string().trim().min(3).max(100),

    description: z.string().trim().optional(),

    instructor: z.string().trim().min(2).max(100),

    capacity: z
      .number()
      .int()
      .positive()
      .max(1000),

    date: z.coerce.date(),

    startTime: z.coerce.date(),

    endTime: z.coerce.date(),

    location: z.string().trim().min(2).max(200),
  })
  .refine(
    (data) => data.startTime < data.endTime,
    {
      message: "Start time must be before end time",
      path: ["startTime"],
    }
  );

export type CreateClassInput = z.infer<typeof createClassSchema>;