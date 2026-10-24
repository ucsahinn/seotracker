import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import { t } from "@/shared/i18n";

export function GoogleOAuthSetupWarning({
  integrationName,
  docsUrl,
}: {
  integrationName: string;
  docsUrl: string;
}) {
  return (
    <div className="alert alert-warning items-start text-sm">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <div className="space-y-1">
        <p className="font-medium">{t("Google erişim anahtarı eksik")}</p>
        <p className="text-muted">
          {t(
            "{integration} için önce Ayarlar'a Google erişim anahtarınızı girin.",
            { integration: integrationName },
          )}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/settings"
            hash="google"
            className="font-medium underline underline-offset-2"
          >
            {t("Ayarlar'ı aç")}
          </Link>
          <SafeExternalLink
            url={docsUrl}
            label={t("Kurulum kılavuzunu aç")}
            className="inline-flex items-center gap-1 font-medium underline underline-offset-2"
          />
        </div>
      </div>
    </div>
  );
}
