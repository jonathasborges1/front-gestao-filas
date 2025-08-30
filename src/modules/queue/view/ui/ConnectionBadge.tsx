import { Chip } from "@mui/material";

export default function ConnectionBadge({
  status,
}: {
  status: "connecting" | "open" | "error" | "closed";
}) {
  const map = {
    connecting: { color: "info", label: "Conectando..." },
    open: { color: "success", label: "Conectado" },
    error: { color: "error", label: "Erro" },
    closed: { color: "default", label: "Fechado" },
  } as const;
  const cfg = map[status];
  return <Chip color={cfg.color} label={cfg.label} size="small" />;
}
