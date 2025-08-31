import {
  RTStatus,
  type RealtimePort,
  type RealtimeStatus,
} from "../model/realtime";

// SSE - Server Side Events
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
    onStatus?.(RTStatus.CONNECTING);
    this.es = new EventSource(this.url);
    this.es.onopen = () => onStatus?.(RTStatus.OPEN);
    this.es.onerror = () => onStatus?.(RTStatus.ERROR);
    this.es.addEventListener(this.eventName, (evt: MessageEvent) => {
      const data = JSON.parse(evt.data) as T;
      onEvent(data);
    });
  }

  disconnect() {
    this.es?.close();
  }
}
