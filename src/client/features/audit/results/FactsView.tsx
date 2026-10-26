import { t } from "@/shared/i18n";
import { FieldDataPanel } from "./FieldDataPanel";
import { SiteFactsPanel } from "./SiteFactsPanel";
import { SitePreviews } from "./SitePreviews";
import type { AuditInsightsData, AuditResultsData } from "./types";

/** "Anlık veri": the site as the audit found it, beyond its pages. */
export function FactsView({
  facts,
  insights,
}: {
  facts: AuditResultsData["siteFacts"];
  insights: AuditInsightsData | undefined;
}) {
  return (
    <div className="flex flex-col gap-4">
      {insights === undefined ? (
        <div aria-busy className="grid gap-4 lg:grid-cols-2">
          <div className="skeleton h-56" />
          <div className="skeleton h-56" />
        </div>
      ) : insights.startPage ? (
        <SitePreviews
          page={insights.startPage}
          // Another page's screenshot would pass for the start page's.
          screenshot={
            insights.speed?.isStartPage ? insights.speed.screenshot : null
          }
          twitterMeasured={facts !== null}
        />
      ) : (
        <p className="text-sm text-muted">
          {t("Başlangıç sayfası okunamadığı için önizleme yok.")}
        </p>
      )}
      {insights === undefined ? null : (
        <FieldDataPanel
          speed={insights.speed}
          speedError={insights.speedError}
        />
      )}
      <SiteFactsPanel facts={facts} insights={insights} />
    </div>
  );
}
