import { t } from "@/shared/i18n";

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
  /*
   * With a service account in place Google works without an OAuth client,
   * and a warning-yellow "Eksik" here read as a broken install while the
   * help screen said "Sorun yok". Neutral, and it says why.
   */
  serviceAccount?: { clientEmail: string | null },
): SectionBadge | null {
  if (!status) return null;
  if (status.source === null && serviceAccount?.clientEmail) {
    return { tone: "neutral", label: t("Kullanılmıyor, hizmet hesabı bağlı") };
  }
  if (status.source === "settings") {
    return { tone: "success", label: t("Kayıtlı"), live: true };
  }
  if (status.source === "environment") {
    return {
      tone: "success",
      label: t("Kurulum dosyasından geliyor"),
      live: true,
    };
  }
  return { tone: "warning", label: t("Eksik") };
}

/** Optional alternative to the OAuth client, so absence is not a warning. */
export function serviceAccountBadge(
  status: { clientEmail: string | null } | undefined,
): SectionBadge | null {
  if (!status) return null;
  return status.clientEmail
    ? { tone: "success", label: t("Kayıtlı"), live: true }
    : { tone: "neutral", label: t("Kullanılmıyor") };
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
  // Whole sentences, so each language words every case its own way.
  if (active === self) {
    return self === "service_account"
      ? t("Şu an kullanılan: hizmet hesabı")
      : t("Şu an kullanılan: Google erişim anahtarı");
  }
  return self === "oauth"
    ? t("Şu an kullanılmıyor (hizmet hesabı öncelikli): Google erişim anahtarı")
    : t(
        "Şu an kullanılmıyor (Google erişim anahtarı öncelikli): hizmet hesabı",
      );
}

export function pageSpeedBadge(
  status: { source: "settings" | "environment" | null } | undefined,
): SectionBadge | null {
  if (!status) return null;
  if (status.source === "settings") {
    return { tone: "success", label: t("Anahtar kayıtlı"), live: true };
  }
  if (status.source === "environment") {
    return {
      tone: "success",
      label: t("Kurulum dosyasından geliyor"),
      live: true,
    };
  }
  return { tone: "warning", label: t("Anahtar eksik") };
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
    return {
      tone: "warning",
      label: t("Yeni sürüm {version}", {
        version: status.latestVersion ?? "",
      }),
    };
  }
  if (!status.enabled) return { tone: "neutral", label: t("Kontrol kapalı") };
  if (status.outcome === "ok") return { tone: "success", label: t("Güncel") };
  if (
    status.outcome === "unreachable" ||
    status.outcome === "error" ||
    status.outcome === "source_missing"
  ) {
    return { tone: "neutral", label: t("Ulaşılamadı") };
  }
  return { tone: "neutral", label: t("Denetlenmedi") };
}

/**
 * When the status read itself failed: say so rather than shimmer forever.
 * A function, not a constant: the label is translated when it renders.
 */
export function unreadableBadge(): SectionBadge {
  return { tone: "neutral", label: t("Okunamadı") };
}
