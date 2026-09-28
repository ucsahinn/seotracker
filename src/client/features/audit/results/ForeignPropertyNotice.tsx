import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

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
          Bu denetim {auditedHost} adresine ait, Search Console bağlantısı ise{" "}
          {propertyHost} mülküne.
        </p>
        <p>
          Aşağıdaki site haritaları {propertyHost} hakkında; bu denetimin
          sayfalarıyla ilgili değil. Google&apos;a sorma da kapatıldı, çünkü bu
          sayfalar o mülkün içinde değil ve sorulan her adres günlük kotadan
          boşa harcanırdı. {auditedHost} için Google verisi görmek istiyorsanız
          bu siteyi kendi projesine alın ve kendi Search Console mülküne
          bağlayın.
        </p>
        <Link
          to="/p/$projectId/settings/integrations"
          params={{ projectId }}
          className="link link-primary"
        >
          Entegrasyonlar
        </Link>
      </div>
    </div>
  );
}
