import { z } from "zod";

import { RecentCallSchema } from "./RecentCall";
import { CallSchema } from "./call";

export const BroadcastPayloadSchema = z.object({
  currentCall: CallSchema,
  recentCalls: z.array(RecentCallSchema),
  totals: z.object({
    waitingLoading: z.number().int().nonnegative(),
    inLoading: z.number().int().nonnegative(),
    finished: z.number().int().nonnegative(),
  }),
});

export type BroadcastPayload = z.infer<typeof BroadcastPayloadSchema>;
