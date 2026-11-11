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

const STORE_DATA_DIR =
  /^%LOCALAPPDATA%\\Packages\\[A-Za-z0-9][A-Za-z0-9.-]*_[a-z0-9]{13}\\LocalCache\\seowatcher$/;

/**
 * Set only by the Microsoft Store build of the Windows package: the folder its
 * launcher keeps the data in, written with %LOCALAPPDATA% so it carries no user
 * name. Its presence is also what says "the Store updates this install". The
 * value ends up inside prompts and commands, so anything that is not a package
 * family name (name, underscore, 13-character publisher id) in that one path
 * reads as absent.
 */
export async function getWindowsStoreDataDir(): Promise<string | null> {
  const value = (await getOptionalEnvValue("WINDOWS_STORE_DATA_DIR"))?.trim();
  return value && STORE_DATA_DIR.test(value) ? value : null;
}
