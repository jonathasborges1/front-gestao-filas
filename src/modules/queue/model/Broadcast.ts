import { z } from "zod";

export const CurrentCallSchema = z
  .object({
    scheduleNumber: z.string(),
    driverName: z.string(),
    plate: z.string(),
    message: z.string(),
    calledAt: z.string().datetime().nullable(),
  })
  .nullable();
export type CurrentCall = z.infer<typeof CurrentCallSchema>;

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

export const TotalCallSchema = z.object({
  waitingLoading: z.number().int().nonnegative(),
  inLoading: z.number().int().nonnegative(),
  finished: z.number().int().nonnegative(),
});
export type TotalCall = z.infer<typeof TotalCallSchema>;

export const BroadcastPayloadSchema = z.object({
  currentCall: CurrentCallSchema,
  recentCalls: z.array(RecentCallSchema),
  totals: TotalCallSchema,
});

export type BroadcastPayload = z.infer<typeof BroadcastPayloadSchema>;
