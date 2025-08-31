export type AppEnv = "local" | "dev" | "staging" | "prod";

export const AppEnvEnum = {
  LOCAL: "local",
  DEV: "dev",
  STATING: "staging",
  PROD: "prod",
} as const;

const DEV_HINTS = ["dev", "preview", "test", "sandbox"];
const STAGING_HINTS = ["stg", "stage", "staging", "hml", "homolog"];
const PROD_HINTS = ["prod", "app", "www"];

export function detectEnvByHostname(
  host: string = window.location.hostname
): AppEnv {
  const h = host.toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h.endsWith(".localhost"))
    return "local";

  if (STAGING_HINTS.some((k) => h.includes(k))) return "staging";
  if (DEV_HINTS.some((k) => h.includes(k))) return "dev";

  if (
    PROD_HINTS.some((k) => h.includes(k)) ||
    /^[a-z0-9.-]+\.[a-z]{2,}$/.test(h)
  )
    return "prod";

  // fallback: se não sabemos, trate como dev remoto
  return "dev";
}
