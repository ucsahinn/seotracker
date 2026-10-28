/** Keep bounded catch-up moving without repeatedly spending quota after errors. */
export function archiveSyncInterval(
  data?: {
    hasMore?: boolean;
    notConnected?: boolean;
    error?: string | null;
    errorCode?: "auth" | "quota" | "network" | "unknown" | null;
  },
  requestFailed = false,
): number | false {
  if (data?.notConnected || data?.errorCode === "auth") return false;
  // Google's short-term load quota guidance says to wait 15 minutes. Use the
  // same bounded delay for transport failures; an outage must not spin a loop.
  if (requestFailed || data?.error) return 15 * 60_000;
  return data?.hasMore ? 15_000 : 15 * 60_000;
}
