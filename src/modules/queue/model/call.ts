import { z } from "zod";

export const CallSchema = z.object({
  scheduleNumber: z.string(),
  driverName: z.string(),
  plate: z.string(),
  message: z.string(),
  calledAt: z.string().datetime(),
});

export type Call = z.infer<typeof CallSchema>;
