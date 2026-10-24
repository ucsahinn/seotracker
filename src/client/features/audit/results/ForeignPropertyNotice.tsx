import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { t } from "@/shared/i18n";

/**
 * Says so when Google's answers on this tab are about a different site.
 *
 * The launch form takes any address, but a project holds exactly one Search
 * Console property. Audit another site inside the same project and this tab
 * still shows that property's sitemaps and would inspect the crawled pages
 * against it — so the sitemaps listed belong to a site that is not on screen,
 * and every page would come back "Google does not know this URL". Both read
 * as findings about the audited site. They are not.
 */
export function ForeignPropertyNotice({
  projectId,
  auditedHost,
  propertyHost,
}: {
  projectId: string;
  auditedHost: string;
  propertyHost: string;
}) {
  return (
    <div className="alert alert-warning items-start" role="alert">
      <AlertTriangle className="size-5 shrink-0" aria-hidden />
      <div className="space-y-1 text-sm">
        <p className="font-medium">
          {t(
            "Bu denetim {auditedHost} sitesine ait, ama Search Console bağlantınız {propertyHost} mülküne bağlı.",
            { auditedHost, propertyHost },
          )}
        </p>
        <p>
          {t(
            "Aşağıdaki site haritaları {propertyHost} mülküne ait, bu denetimin sayfalarıyla ilgisi yok. Google'a sorma da kapalı, çünkü bu sayfalar o mülkte değil ve sorulan her adres günlük kotadan boşuna giderdi. {auditedHost} için Google verisi görmek istiyorsanız siteyi ayrı bir proje olarak ekleyip kendi Search Console mülküne bağlayın.",
            { auditedHost, propertyHost },
          )}
        </p>
        <Link
          to="/p/$projectId/settings/integrations"
          params={{ projectId }}
          className="link link-primary"
        >
          {t("Bağlantılar")}
        </Link>
      </div>
    </div>
  );
}
