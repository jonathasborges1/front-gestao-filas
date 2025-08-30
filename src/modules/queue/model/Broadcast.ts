import { z } from "zod";
import { RecentCallSchema } from "./RecentCall";

export const BroadcastPayloadSchema = z.object({
  currentCall: z.object({
    scheduleNumber: z.string(),
    driverName: z.string(),
    plate: z.string(),
    message: z.string(),
    calledAt: z.string().datetime(),
  }),
  recentCalls: z.array(RecentCallSchema),
  totals: z.object({
    waitingLoading: z.number().int().nonnegative(),
    inLoading: z.number().int().nonnegative(),
    finished: z.number().int().nonnegative(),
  }),
});

export type BroadcastPayload = z.infer<typeof BroadcastPayloadSchema>;
