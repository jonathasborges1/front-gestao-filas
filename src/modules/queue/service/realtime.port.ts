export type RealtimeStatus = "connecting" | "open" | "error" | "closed";

export interface RealtimePort<T> {
  connect: (
    onEvent: (payload: T) => void,
    onStatus?: (s: RealtimeStatus) => void
  ) => void;
  disconnect: () => void;
}
