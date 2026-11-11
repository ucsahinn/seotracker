type HostGuardSettings = {
  /** ALLOWED_HOST: the one extra name the operator reaches the app by. */
  allowedHost?: string;
  /** BETTER_AUTH_URL: its host is accepted too, as vite.config.ts does. */
  authUrl?: string;
};

/** The host name in a Host header, a bare name or a URL; null when it has none. */
export function hostnameOf(value: string | undefined | null) {
  if (!value) return null;
  const url = value.includes("://");
  // "x@127.0.0.1" and "evil/..@localhost" are not host names. A URL parser
  // reads the part after the "@" as the host, so they are refused first.
  if (!url && /[@/\\?#\s]/.test(value)) return null;
  try {
    return (
      new URL(url ? value : `http://${value}`).hostname
        .toLowerCase()
        // "localhost." is localhost, written with its root dot.
        .replace(/\.$/, "")
    );
  } catch {
    return null;
  }
}

const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

function isLoopbackNameOrIp(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    // An address is not a name an attacker's DNS can re-point, so it cannot
    // be rebound: the LAN address of a Docker install keeps working.
    IPV4.test(hostname) ||
    hostname.startsWith("[")
  );
}

/**
 * The app authenticates nobody in `local_noauth`, so the only thing between a
 * web page and every server function is that the page cannot reach this
 * origin. DNS rebinding removes that: a page whose own hostname is re-pointed
 * to 127.0.0.1 is same-origin with the app, and the CSRF check (Origin equals
 * Host) passes. Refusing every Host that is not loopback, an IP address or a
 * name the operator configured closes it. Docker already had this from
 * `vite preview`'s allowedHosts; the Windows package runs `wrangler dev`,
 * which checks nothing.
 */
export function hostGuardRejection(
  request: Request,
  authMode: "cloudflare_access" | "local_noauth",
  settings: HostGuardSettings,
): Response | null {
  if (authMode !== "local_noauth") return null;

  // Without a Host header the request line names the host instead.
  const header = request.headers.get("host");
  const hostname = header
    ? hostnameOf(header)
    : hostnameOf(new URL(request.url).host);
  if (
    hostname &&
    (isLoopbackNameOrIp(hostname) ||
      hostname === hostnameOf(settings.allowedHost) ||
      hostname === hostnameOf(settings.authUrl))
  ) {
    return null;
  }

  return new Response(
    "Misdirected Request: this host name is not configured (ALLOWED_HOST).",
    {
      status: 421,
      headers: { "content-type": "text/plain; charset=utf-8" },
    },
  );
}
