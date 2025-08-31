import { CallStatus } from "@modules/queue/model/Broadcast";

export const StatusLabel: Record<CallStatus, string> = {
  [CallStatus.FINISHED]: "Finalizado",
  [CallStatus.IN_PROGRESS]: "Em Carregamento",
  [CallStatus.WAITING]: "Aguardando Carregamento",
};

export const StatusColor: Record<
  CallStatus,
  "success.main" | "info.main" | "error.main"
> = {
  [CallStatus.FINISHED]: "success.main",
  [CallStatus.IN_PROGRESS]: "info.main",
  [CallStatus.WAITING]: "error.main",
};
