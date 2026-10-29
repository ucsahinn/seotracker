import { useQuery } from "@tanstack/react-query";
import { t } from "@/shared/i18n";
import { GoogleOAuthClientSection } from "./GoogleOAuthClientSection";
import { GoogleServiceAccountSection } from "./GoogleServiceAccountSection";
import {
  googleOAuthClientStatusOptions,
  googleServiceAccountStatusOptions,
} from "./settingsQueries";
/** Installation scope; retain method anchors while putting the active method first. */
export function GoogleCredentialMethods() {
  const oauth = useQuery(googleOAuthClientStatusOptions());
  const service = useQuery(googleServiceAccountStatusOptions());
  const oauthFirst = oauth.data?.source && !service.data?.clientEmail;
  return (
    <section className="space-y-6">
      <h2 className="text-base font-semibold">{t("Google kimlikleri")}</h2>
      {oauthFirst ? (
        <>
          <GoogleOAuthClientSection />
          <GoogleServiceAccountSection />
        </>
      ) : (
        <>
          <GoogleServiceAccountSection />
          <GoogleOAuthClientSection />
        </>
      )}
      <details className="text-xs text-muted">
        <summary className="cursor-pointer py-1">
          {t("Kimlik yöntemleri")}
        </summary>
        <p className="text-sm text-muted">
          {t(
            "Google kimlikleri bu kurulumdaki tüm projelerde kullanılır. Hizmet hesabı kayıtlıysa önceliklidir. Projenizin mülkünü Proje ayarları → Bağlantılar bölümünden seçin.",
          )}
        </p>
      </details>
    </section>
  );
}
