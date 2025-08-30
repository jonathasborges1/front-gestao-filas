import type { RealtimePort, RealtimeStatus } from "./realtime.port";

export class SSEAdapter<T> implements RealtimePort<T> {
  private es?: EventSource;

  private url: string;
  private eventName: string;

  constructor(url: string, eventName = "Broadcast") {
    this.url = url;
    this.eventName = eventName;
  }

  connect(
    onEvent: (payload: T) => void,
    onStatus?: (s: RealtimeStatus) => void
  ) {
    onStatus?.("connecting");
    this.es = new EventSource(this.url, { withCredentials: false });
    this.es.onopen = () => onStatus?.("open");
    this.es.onerror = () => onStatus?.("error");
    this.es.addEventListener(this.eventName, (evt) => {
      const data = JSON.parse((evt as MessageEvent).data) as T;
      onEvent(data);
    });
  }

  disconnect() {
    this.es?.close();
  }
}
