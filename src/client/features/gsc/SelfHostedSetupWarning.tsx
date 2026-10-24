import { Link } from "@tanstack/react-router";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import { GSC_SELF_HOSTED_SETUP_DOCS_URL } from "@/shared/gsc";
import { t } from "@/shared/i18n";

/**
 * Shown in self-hosted deployments that haven't set GOOGLE_CLIENT_ID/SECRET yet
 * — in both the Integrations card and the onboarding step. One sentence and
 * one primary action; the card around it already says the connection is
 * missing, so there is no second status badge.
 */
export function SelfHostedSetupWarning() {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-1">
        <p className="font-medium">{t("Google erişim anahtarı eksik")}</p>
        <p className="text-muted">
          {t(
            "Search Console'u bağlamak için önce Ayarlar'a Google erişim anahtarınızı girin.",
          )}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Link to="/settings" hash="google" className="btn btn-primary btn-sm">
          {t("Ayarlar'ı aç")}
        </Link>
        <SafeExternalLink
          url={GSC_SELF_HOSTED_SETUP_DOCS_URL}
          label={t("Kurulum kılavuzunu aç")}
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
        />
      </div>
    </div>
  );
}
