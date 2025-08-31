import { z } from "zod";
import { detectEnvByHostname, type AppEnv, AppEnvEnum } from "./env-detect";
import configApp from "./config";

const { LOCAL, DEV, STATING, PROD } = AppEnvEnum;

const EnvSchema = z.object({
  VITE_APP_ENV: z.enum([LOCAL, DEV, STATING, PROD]).optional(),
  VITE_REALTIME_URL: z.string().url().optional(),
});

type ResolvedConfig = {
  appEnv: AppEnv;
  realtimeEndpoint: string;
};

const DEFAULT_ENDPOINTS: Record<AppEnv, string> = {
  local: configApp.local,
  dev: configApp.dev,
  staging: configApp.staging,
  prod: configApp.prod,
};

export async function resolveConfig(): Promise<ResolvedConfig> {
  const env = EnvSchema.parse(import.meta.env);

  // NOTE: ambiente por override explícito ou heurística
  const appEnv: AppEnv = (env.VITE_APP_ENV as AppEnv) ?? detectEnvByHostname();

  const realtimeEndpoint = DEFAULT_ENDPOINTS[appEnv];

  return { appEnv, realtimeEndpoint };
}
