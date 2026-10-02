/**
 * The one-word state each settings section wears next to its heading.
 *
 * Pure functions over the same status payloads the sections already read, so
 * the badge can never disagree with the form under it.
 */
export type SectionBadge = {
  tone: "success" | "warning" | "neutral";
  label: string;
  /** Only a credential that is actually in place pulses. */
  live?: boolean;
};

export function oauthClientBadge(
  status: { source: "settings" | "environment" | null } | undefined,
): SectionBadge | null {
  if (!status) return null;
  if (status.source === "settings") {
    return { tone: "success", label: "Kayıtlı", live: true };
  }
  if (status.source === "environment") {
    return { tone: "success", label: "Ortamdan geliyor", live: true };
  }
  return { tone: "warning", label: "Eksik" };
}

/** Optional alternative to the OAuth client, so absence is not a warning. */
export function serviceAccountBadge(
  status: { clientEmail: string | null } | undefined,
): SectionBadge | null {
  if (!status) return null;
  return status.clientEmail
    ? { tone: "success", label: "Kayıtlı", live: true }
    : { tone: "neutral", label: "Kullanılmıyor" };
}

/**
 * Which Google credential the install actually uses. Mirrors the server: a
 * stored service account wins over an OAuth client (gscClient, ga4Client).
 */
export function activeGoogleCredential(
  oauth: { source: "settings" | "environment" | null } | undefined,
  serviceAccount: { clientEmail: string | null } | undefined,
): "service_account" | "oauth" | null {
  if (serviceAccount?.clientEmail) return "service_account";
  return oauth?.source ? "oauth" : null;
}

/** The line a credential section shows about whether it is the live one. */
export function activeCredentialNote(
  self: "service_account" | "oauth",
  active: "service_account" | "oauth" | null,
): string | null {
  if (active === null) return null;
  const names = { service_account: "hizmet hesabı", oauth: "OAuth istemcisi" };
  if (active === self) return `Şu an kullanılan: ${names[self]}`;
  return `Şu an kullanılmıyor (${names[active]} öncelikli): ${names[self]}`;
}

export function pageSpeedBadge(
  status: { source: "settings" | "environment" | null } | undefined,
): SectionBadge | null {
  if (!status) return null;
  if (status.source === "settings") {
    return { tone: "success", label: "Anahtar kayıtlı", live: true };
  }
  if (status.source === "environment") {
    return { tone: "success", label: "Ortam anahtarı", live: true };
  }
  return { tone: "warning", label: "Anahtar eksik" };
}

export function updateBadge(
  status:
    | {
        enabled: boolean;
        updateAvailable: boolean;
        outcome: string;
        latestVersion: string | null;
      }
    | undefined,
): SectionBadge | null {
  if (!status) return null;
  if (status.updateAvailable) {
    return { tone: "warning", label: `Yeni sürüm ${status.latestVersion}` };
  }
  if (!status.enabled) return { tone: "neutral", label: "Kontrol kapalı" };
  if (status.outcome === "ok") return { tone: "success", label: "Güncel" };
  if (status.outcome === "unreachable" || status.outcome === "error") {
    return { tone: "neutral", label: "Ulaşılamadı" };
  }
  return { tone: "neutral", label: "Denetlenmedi" };
}

/** When the status read itself failed: say so rather than shimmer forever. */
export const UNREADABLE: SectionBadge = {
  tone: "neutral",
  label: "Okunamadı",
};
