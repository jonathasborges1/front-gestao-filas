import { Chip } from "@mui/material";

import type { RealtimeStatus } from "@modules/queue/model/realtime";

function ConnectionBadge({ status }: { status: RealtimeStatus }) {
  const map = {
    connecting: { color: "info", label: "Conectando..." },
    open: { color: "success", label: "Conectado" },
    error: { color: "error", label: "Erro" },
    closed: { color: "default", label: "Fechado" },
  } as const;

  const cfg = map[status];

  return <Chip color={cfg.color} label={cfg.label} size="medium" />;
}

export default ConnectionBadge;
