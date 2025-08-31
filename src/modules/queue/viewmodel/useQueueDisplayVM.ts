import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { RTStatus, type RealtimeStatus } from "../model/realtime";
import {
  BroadcastPayloadSchema,
  type BroadcastPayload,
} from "../model/Broadcast";

import { WebSpeechTTS } from "../service/tts-web.adapter";
import { SSEAdapter } from "../service/sse.adapter";

import { resolveConfig } from "config";

type VMState = {
  status: RealtimeStatus;
  broadcastPayload: BroadcastPayload;
};

const RECENT_LIMIT = 4 as const;

// let endpointDefault: string = "";
// resolveConfig().then((configDynamic) => {
//   endpointDefault = configDynamic.realtimeEndpoint;
// });

const initialState: VMState = {
  status: RTStatus.CONNECTING,
  broadcastPayload: {
    currentCall: {
      scheduleNumber: "",
      driverName: "",
      plate: "",
      message: "",
      calledAt: "",
    },
    recentCalls: [],
    totals: { waitingLoading: 0, inLoading: 0, finished: 0 },
  },
};

export function useQueueDisplayVM(endpoint?: string): VMState {
  const [state, setState] = useState<VMState>(initialState);

  const [resolvedEndpoint, setResolvedEndpoint] = useState<string>();

  useEffect(() => {
    resolveConfig().then((config) => {
      setResolvedEndpoint(endpoint ?? config.realtimeEndpoint);
    });
  }, [endpoint]);

  const lastSpokenRef = useRef<string | null>(null);

  const tts = useMemo(() => new WebSpeechTTS(), []);
  // const realtime = useMemo(
  //   () => new SSEAdapter<BroadcastPayload>(endpoint, "Broadcast"),
  //   [endpoint]
  // );

  const realtime = useMemo(() => {
    if (!resolvedEndpoint) return null;
    return new SSEAdapter<BroadcastPayload>(resolvedEndpoint, "Broadcast");
  }, [resolvedEndpoint]);

  const handleEvent = useCallback(
    (raw: BroadcastPayload) => {
      const parsed = BroadcastPayloadSchema.safeParse(raw);
      if (!parsed.success) {
        const msgError = "[VM] payload inválido:";
        console.error(msgError, parsed.error.format?.() ?? parsed.error);
        setState((prev) => ({ ...prev, status: "error" }));
        return;
      }
      const payload = parsed.data;

      setState({
        status: RTStatus.OPEN,
        broadcastPayload: {
          currentCall: payload.currentCall,
          recentCalls: payload.recentCalls.slice(0, RECENT_LIMIT),
          totals: payload.totals,
        },
      });

      const id = `${payload?.currentCall?.scheduleNumber}|${payload?.currentCall?.driverName}`;
      if (lastSpokenRef.current !== id) {
        tts.speak(payload?.currentCall?.driverName ?? "");
        lastSpokenRef.current = id;
      }
    },
    [tts]
  );

  const handleStatus = useCallback((rts: RealtimeStatus) => {
    setState((prev) => (prev.status === rts ? prev : { ...prev, status: rts }));
  }, []);

  useEffect(() => {
    if (!realtime) return;
    realtime.connect(handleEvent, handleStatus);
    return () => realtime.disconnect();
  }, [realtime, handleEvent, handleStatus]);

  return state;
}
