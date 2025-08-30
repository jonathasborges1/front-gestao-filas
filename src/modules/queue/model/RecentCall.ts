import { z } from "zod";

export const RecentCallSchema = z.object({
  driverName: z.string(),
  plate: z.string(),
  status: z.enum(["WaitingLoading", "InLoading", "Finished"]),
  icon: z.enum(["check", "loading"]),
  timestamp: z.string().datetime(),
});

export type RecentCall = z.infer<typeof RecentCallSchema>;
