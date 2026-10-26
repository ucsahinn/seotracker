import { Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { useState } from "react";
import { CreateProjectModal } from "@/client/features/projects/CreateProjectModal";
import { t } from "@/shared/i18n";

/**
 * The whole Dizin durumu tab when Google's answers would be about another
 * site.
 *
 * The launch form takes any address, but a project holds exactly one Search
 * Console property. Audit another site inside the same project and this tab
 * used to show that property's sitemaps, its quota and a disabled inspect
 * button under a warning -- four panels about a site that is not on screen,
 * which read as findings about the audited one. Now it is one card: what is
 * wrong, and the fix, which is a project of the audited site's own.
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
  const [creating, setCreating] = useState(false);
  return (
    <section className="flex flex-col items-start gap-3 rounded-box border border-[var(--hairline)] bg-base-100 p-5 sm:flex-row sm:gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-base-200 text-muted">
        <SearchX aria-hidden className="size-5" strokeWidth={1.5} />
      </span>
      <div className="min-w-0 space-y-2">
        <h3 className="text-sm font-semibold">
          {t("Bu proje {auditedHost} için Google verisi okuyamıyor", {
            auditedHost,
          })}
        </h3>
        <p className="max-w-prose text-sm text-muted">
          {t(
            "Projenin Search Console bağlantısı {propertyHost} mülküne ait. Google'a {auditedHost} sayfalarını sormak günlük kotayı boşa harcardı, bu yüzden dizin durumu, site haritaları ve kota bu denetimde gösterilmiyor. {auditedHost} için ayrı bir proje açıp kendi mülküne bağlayın.",
            { auditedHost, propertyHost },
          )}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setCreating(true)}
          >
            {t("Siteyi ayrı proje olarak ekle")}
          </button>
          <Link
            to="/p/$projectId/settings/integrations"
            params={{ projectId }}
            className="btn btn-ghost btn-sm"
          >
            {t("Bağlantıları aç")}
          </Link>
        </div>
      </div>
      {creating ? (
        <CreateProjectModal
          initialDomain={auditedHost}
          onClose={() => setCreating(false)}
        />
      ) : null}
    </section>
  );
}
