import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import {
  googleOAuthClientStatusOptions,
  googleServiceAccountStatusOptions,
} from "@/client/features/settings/settingsQueries";
import { GSC_SELF_HOSTED_SETUP_DOCS_URL } from "@/shared/gsc";
import { t } from "@/shared/i18n";

/**
 * Said once, at the top, instead of twice in the middle.
 *
 * Search Console and Analytics share one OAuth client, so when it is missing
 * both connection cards printed the same warning, and the dashboard carried
 * two identical amber blocks explaining the same single fix. This is that
 * sentence, once; `useGoogleClientConfigured` lets the page drop the cards
 * that cannot do anything until it is answered.
 */
/**
 * Either credential is enough: an OAuth client or a stored service account.
 * Asking only about the OAuth client told a service-account install that its
 * key was missing while Search Console was working.
 */
export function useGoogleConfiguration() {
  const oauth = useQuery(googleOAuthClientStatusOptions());
  const account = useQuery(googleServiceAccountStatusOptions());
  if (oauth.data?.source != null || account.data?.clientEmail != null)
    return "ready" as const;
  if (oauth.isError || account.isError) return "error" as const;
  if (oauth.isPending || account.isPending) return "pending" as const;
  return "missing" as const;
}

export function GoogleSetupBanner() {
  return (
    <div className="alert alert-warning">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="space-y-1">
        <p className="font-medium text-base-content">
          {t("Google erişim anahtarı eksik")}
        </p>
        <p>
          {t(
            "Search Console ve Analytics aynı erişim anahtarını kullanır. Önce onu Ayarlar'a girin.",
          )}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Link
            to="/settings"
            hash="google"
            className="font-medium text-base-content underline underline-offset-2"
          >
            {t("Google erişim anahtarını Ayarlar'a girin")}
          </Link>
          <SafeExternalLink
            url={GSC_SELF_HOSTED_SETUP_DOCS_URL}
            label={t("Kurulum kılavuzunu aç")}
            className="inline-flex items-center gap-1 underline underline-offset-2"
          />
        </div>
      </div>
    </div>
  );
}
