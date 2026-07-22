import { z } from "zod";

export const createClassSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    instructor: z.string().min(1),
    capacity: z.number().int().positive(),
    date: z.coerce.date(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string().min(1),
  })
  .refine((data) => data.startTime < data.endTime, {
    message: "Start time must be before end time",
    path: ["startTime"],
  });

export const updateClassSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    instructor: z.string().min(1).optional(),
    capacity: z.number().int().positive().optional(),
    date: z.coerce.date().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    location: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.startTime &&
      data.endTime &&
      data.startTime >= data.endTime
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["startTime"],
        message: "Start time must be before end time",
      });
    }
  });

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;