import { getOptionalEnvValue } from "@/server/lib/runtime-env";

export type PortFallback = { configured: number; actual: number };

const FALLBACK_PATTERN = /^(\d{1,5})->(\d{1,5})$/;

const valid = (port: number) => port > 0 && port < 65536;

/**
 * The port the Windows launcher had to move to on this start. It binds the
 * configured port unless another program holds it (often an old Docker copy
 * of the app), then takes the next free one for this run only and writes
 * WINDOWS_PORT_FALLBACK=<configured>-><actual> into server.env. Google's
 * redirect addresses name the configured port, so signing in breaks until
 * that program is closed; the app says so instead of leaving the operator to
 * notice the address bar. Null when the configured port was free, on Docker,
 * and for any value that does not parse.
 */
export async function getPortFallback(): Promise<PortFallback | null> {
  const raw = await getOptionalEnvValue("WINDOWS_PORT_FALLBACK");
  const match = raw ? FALLBACK_PATTERN.exec(raw.trim()) : null;
  if (!match) return null;
  const configured = Number(match[1]);
  const actual = Number(match[2]);
  if (!valid(configured) || !valid(actual) || configured === actual) {
    return null;
  }
  return { configured, actual };
}

export type PortFacts = {
  /** The port the operator set up (Google's redirect addresses name it); null when unknown. */
  configured: number | null;
  /** The port this instance answers on; null when unknown. */
  actual: number | null;
  /** Set only when the Windows launcher had to move off the configured port. */
  fallback: PortFallback | null;
};

function portOfUrl(url: string | null | undefined): number | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const port = Number(
      parsed.port || (parsed.protocol === "https:" ? 443 : 80),
    );
    return valid(port) ? port : null;
  } catch {
    return null;
  }
}

/**
 * Which port this instance runs on, and which one it was meant to. `actual`
 * comes from the launcher's fallback, else the URL the caller reached it by,
 * else PORT. `configured` is known from the fallback, or on Windows (where
 * the launcher writes a fallback whenever the two differ) equals `actual`;
 * on Docker the host-side mapping is not visible from inside, so it is null.
 */
export async function getPortFacts(
  requestUrl?: string | null,
  installKind?: "windows" | "docker",
): Promise<PortFacts> {
  const fallback = await getPortFallback();
  const envPort = Number(await getOptionalEnvValue("PORT"));
  const actual =
    fallback?.actual ??
    portOfUrl(requestUrl) ??
    (valid(envPort) ? envPort : null);
  const configured =
    fallback?.configured ?? (installKind === "windows" ? actual : null);
  return { configured, actual, fallback };
}
