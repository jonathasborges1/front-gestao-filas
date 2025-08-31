import { z } from "zod";

export const CallStatus = {
  FINISHED: "Finished",
  IN_PROGRESS: "InLoading",
  WAITING: "WaitingLoading",
} as const;

export type CallStatus = (typeof CallStatus)[keyof typeof CallStatus];

export const RecentCallSchema = z.object({
  driverName: z.string(),
  plate: z.string(),
  status: z.enum([
    CallStatus.FINISHED,
    CallStatus.IN_PROGRESS,
    CallStatus.WAITING,
  ]),
  icon: z.enum(["check", "loading"]),
  timestamp: z.string().datetime(),
});

export type RecentCall = z.infer<typeof RecentCallSchema>;
