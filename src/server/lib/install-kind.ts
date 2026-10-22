import { getOptionalEnvValue } from "@/server/lib/runtime-env";

export type InstallKind = "windows" | "docker";

/**
 * How this install was set up. The Windows package's launcher writes
 * INSTALL_KIND=windows into server.env; every other install (git checkout +
 * docker compose) reads as "docker". Screens and the prompts handed to agents
 * branch on this so nobody is told to run `docker compose` on a machine that
 * has a tray icon instead.
 */
export async function getInstallKind(): Promise<InstallKind> {
  return (await getOptionalEnvValue("INSTALL_KIND")) === "windows"
    ? "windows"
    : "docker";
}
