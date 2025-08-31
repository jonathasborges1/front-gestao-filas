import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { RTStatus, type RealtimeStatus } from "../model/realtime";
import {
  BroadcastPayloadSchema,
  type BroadcastPayload,
} from "../model/Broadcast";

import { SSEAdapter } from "../service/sse-adapter";
import { TTS } from "../service/tts-adapter";

import { getEndPoint } from "config";

type VMState = {
  status: RealtimeStatus;
  broadcastPayload: BroadcastPayload;
};

const RECENT_LIMIT = 4 as const;

const initialState: VMState = {
  status: RTStatus.CONNECTING,
  broadcastPayload: {
    currentCall: null,
    recentCalls: [],
    totals: { waitingLoading: 0, inLoading: 0, finished: 0 },
  },
};

export function useQueueDisplayVM(endpoint?: string): VMState {
  const [state, setState] = useState<VMState>(initialState);
  const lastSpokenRef = useRef<string | null>(null);
  const tts = useMemo(() => new TTS(), []);

  const handleEvent = useCallback(
    (raw: BroadcastPayload) => {
      const parsed = BroadcastPayloadSchema.safeParse(raw);

      if (!parsed.success) {
        console.error("[VM] payload inválido:", parsed.error);
        setState((prev) => ({ ...prev, status: "error" }));
        return;
      }

      const payload = parsed.data;
      const currentCall =
        payload.currentCall ?? initialState.broadcastPayload.currentCall;
      const id = `${currentCall?.scheduleNumber}|${currentCall?.driverName}`;

      setState({
        status: RTStatus.OPEN,
        broadcastPayload: {
          currentCall,
          recentCalls: payload.recentCalls.slice(0, RECENT_LIMIT),
          totals: payload.totals,
        },
      });

      if (currentCall?.driverName && lastSpokenRef.current !== id) {
        tts.speak(currentCall.driverName);
        lastSpokenRef.current = id;
      }
    },
    [tts]
  );

  const handleStatus = useCallback((rts: RealtimeStatus) => {
    setState((prev) => (prev.status === rts ? prev : { ...prev, status: rts }));
  }, []);

  useEffect(() => {
    let sse: SSEAdapter<BroadcastPayload> | null = null;
    let cancelled = false;

    async function init() {
      // resolve endpoint (parâmetro > config)
      const resolvedEndpoint = endpoint ?? (await getEndPoint());
      if (cancelled) return;

      // inicializa SSE
      sse = new SSEAdapter<BroadcastPayload>(resolvedEndpoint, "Broadcast");
      sse.connect(handleEvent, handleStatus);
    }

    init();

    return () => {
      cancelled = true;
      sse?.disconnect();
    };
  }, [endpoint, handleEvent, handleStatus]);

  return state;
}
