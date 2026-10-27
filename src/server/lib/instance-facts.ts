import { version } from "../../../package.json";
import { UpdateCheckService } from "@/server/features/updates/UpdateCheckService";
import { getInstallKind } from "@/server/lib/install-kind";
import { getPortFacts, type PortFacts } from "@/server/lib/port-fallback";
import { getOptionalEnvValue } from "@/server/lib/runtime-env";
import { isNewerVersion } from "@/shared/version";

type InstanceKind = "windows" | "docker" | "dev";

type InstanceFacts = {
  version: string;
  installKind: InstanceKind;
  /** Configured vs actual port; `fallback` when the launcher had to move. */
  port: PortFacts;
  /** Latest released version from the cached update check; null if never answered. */
  latestVersion: string | null;
  /** This instance is older than the latest release. */
  stale: boolean;
  /** One line for agents; English because agents read it. */
  agentNote: string;
};

/**
 * Which seotracker an MCP client is talking to. An agent connected to an old
 * Docker copy still answering on the same port reads stale data with full
 * confidence, so `whoami` and `get_diagnostics` hand it the facts to notice.
 * Reads only local state: the update answer comes from the cache, never from
 * GitHub.
 */
export async function getInstanceFacts(
  /** The URL the client reached this instance by, for the actual port. */
  requestUrl?: string | null,
): Promise<InstanceFacts> {
  const [kind, update] = await Promise.all([
    getInstallKind(),
    UpdateCheckService.getCachedStatus().catch(() => null),
  ]);
  const port = await getPortFacts(requestUrl, kind);
  const moved = port.fallback;
  /*
   * The compose file sets CLOUDFLARE_INCLUDE_PROCESS_ENV for the container;
   * a checkout started with `pnpm dev` does not.
   */
  const installKind: InstanceKind =
    kind === "windows"
      ? "windows"
      : (await getOptionalEnvValue("CLOUDFLARE_INCLUDE_PROCESS_ENV")) === "true"
        ? "docker"
        : "dev";
  const latestVersion = update?.latestVersion ?? null;
  const stale = Boolean(
    latestVersion && isNewerVersion(version, latestVersion),
  );
  const notes = [
    stale &&
      `This instance runs ${version} but ${latestVersion} is released: it may be an old copy.`,
    moved &&
      `Running on port ${moved.actual} because ${moved.configured} is taken by another program (perhaps an old Docker copy of seotracker); Google sign-in is set up for ${moved.configured}.`,
  ].filter(Boolean);
  return {
    version,
    installKind,
    port,
    latestVersion,
    stale,
    agentNote:
      notes.length > 0
        ? `Tell the user before using any data: ${notes.join(" ")}`
        : "No sign of an old or different instance.",
  };
}
