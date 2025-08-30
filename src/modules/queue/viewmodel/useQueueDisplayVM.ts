import { useEffect, useMemo, useRef, useState } from "react";
import type { RealtimeStatus } from "../service/realtime.port";
import {
  BroadcastPayloadSchema,
  type BroadcastPayload,
} from "../model/Broadcast";
import { WebSpeechTTS } from "../service/tts-web.adapter";
import { SSEAdapter } from "../service/sse.adapter";

type VMState = {
  status: RealtimeStatus;
  currentCall?: BroadcastPayload["currentCall"];
  recentCalls: BroadcastPayload["recentCalls"];
  totals: BroadcastPayload["totals"];
};

export function useQueueDisplayVM(endpoint: string) {
  const [state, setState] = useState<VMState>({
    status: "connecting",
    recentCalls: [],
    totals: { waitingLoading: 0, inLoading: 0, finished: 0 },
  });

  const lastSpokenRef = useRef<string | null>(null);
  const tts = useMemo(() => new WebSpeechTTS(), []);
  const realtime = useMemo(
    () => new SSEAdapter<BroadcastPayload>(endpoint, "Broadcast"),
    [endpoint]
  );

  useEffect(() => {
    realtime.connect(onEvent, (s) =>
      setState((prev) => ({ ...prev, status: s }))
    );
    return () => realtime.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realtime]);

  function onEvent(raw: BroadcastPayload) {
    const payload = BroadcastPayloadSchema.parse(raw);
    setState({
      status: "open",
      currentCall: payload.currentCall,
      recentCalls: payload.recentCalls.slice(0, 4),
      totals: payload.totals,
    });

    const id =
      payload.currentCall.scheduleNumber + "|" + payload.currentCall.driverName;
    if (lastSpokenRef.current !== id) {
      tts.speak(payload.currentCall.driverName);
      lastSpokenRef.current = id;
    }
  }

  return state;
}
