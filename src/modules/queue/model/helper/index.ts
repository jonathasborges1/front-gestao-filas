import type { CallStatus, TotalCall } from "../Broadcast";

export function toCamelCase(key: CallStatus): keyof TotalCall {
  return (key.charAt(0).toLowerCase() + key.slice(1)) as keyof TotalCall;
}
