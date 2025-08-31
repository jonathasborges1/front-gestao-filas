export type RealtimeStatus = "connecting" | "open" | "error" | "closed";

export const RTStatus = {
  CONNECTING: "connecting",
  OPEN: "open",
  ERROR: "error",
  CLOSED: "closed",
} as const;

export type RTStatus = (typeof RTStatus)[keyof typeof RTStatus];

export interface RealtimePort<T> {
  connect: (
    onEvent: (payload: T) => void,
    onStatus?: (s: RealtimeStatus) => void
  ) => void;
  disconnect: () => void;
}
