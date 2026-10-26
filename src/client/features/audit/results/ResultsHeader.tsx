import { useEffect, useRef } from "react";
import { formatCount } from "@/client/lib/format";
import { Tabs } from "@/client/components/Tabs";
import { ExportDropdown } from "@/client/features/audit/results/ResultsTables";
import type { AuditTab as ResultsTab } from "@/types/schemas/audit";
import { t } from "@/shared/i18n";

/** The results tabs and the export menu that acts on the open one. */
export function ResultsHeader({
  todoCount,
  checkCount,
  issueCount,
  issueRowCount,
  coverageCount,
  pageCount,
  lighthouseCount,
  lighthouseMeasured,
  performanceExportCount,
  hasPerformanceTab,
  activeTab,
  onTabChange,
  onExport,
}: {
  todoCount: number;
  checkCount: number;
  /** Distinct affected pages — what the tab label promises. */
  issueCount: number;
  /** Issue records — what an issues export actually writes. */
  issueRowCount: number;
  /** Rows Google has answered about, or null before that tab has loaded. */
  coverageCount: number | null;
  pageCount: number;
  /** Speed measurements attempted (pages x devices). */
  lighthouseCount: number;
  /** Of those, the ones that produced a score. */
  lighthouseMeasured: number;
  /** Rows the speed export writes (it follows the table's filters). */
  performanceExportCount: number;
  hasPerformanceTab: boolean;
  activeTab: ResultsTab;
  onTabChange: (tab: ResultsTab) => void;
  /** Undefined when the open tab has nothing to export. */
  onExport?: (format: "csv" | "json" | "sheets") => void;
}) {
  /*
   * On a phone the strip scrolls sideways, and a tab opened from a link
   * (`?tab=performance`) sat past the right edge with nothing on screen
   * saying which tab was open. Scroll the strip, never the page.
   */
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = strip.current;
    const active = container?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    if (!container || !active) return;
    // The strip is `relative`, so it is the offsetParent.
    const left = active.offsetLeft;
    const right = left + active.offsetWidth;
    if (left < container.scrollLeft) container.scrollLeft = left - 16;
    else if (right > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = right - container.clientWidth + 16;
    }
  }, [activeTab]);

  const tabs: Array<{ tab: ResultsTab; label: string }> = [
    {
      tab: "todo",
      label: t("Yapılacaklar ({count})", { count: formatCount(todoCount) }),
    },
    {
      tab: "checks",
      label: t("Kontroller ({count})", { count: formatCount(checkCount) }),
    },
    { tab: "facts", label: t("Anlık veri") },
    {
      tab: "issues",
      label: t("Sorunlu sayfalar ({count})", {
        count: formatCount(issueCount),
      }),
    },
    {
      tab: "pages",
      label: t("Sayfalar ({count})", { count: formatCount(pageCount) }),
    },
    {
      tab: "index",
      label:
        coverageCount === null
          ? t("Dizin durumu")
          : t("Dizin durumu ({count})", { count: formatCount(coverageCount) }),
    },
    ...(hasPerformanceTab
      ? [
          {
            tab: "performance" as const,
            // "Hız (10)" over ten failed runs read as ten measurements.
            label:
              lighthouseMeasured === lighthouseCount
                ? t("Hız ({count})", { count: formatCount(lighthouseCount) })
                : t("Hız ({measured}/{total})", {
                    measured: formatCount(lighthouseMeasured),
                    total: formatCount(lighthouseCount),
                  }),
          },
        ]
      : []),
  ];

  return (
    <div className="flex items-center justify-between gap-2">
      {/* One scrolling row on a phone: seven tabs wrapped into three ragged
          lines and pushed the content a screen down. */}
      <div
        ref={strip}
        className="relative -mx-1 min-w-0 overflow-x-auto px-1 [scrollbar-width:none]"
      >
        <Tabs
          group="audit-results"
          className="w-max flex-nowrap whitespace-nowrap"
          value={activeTab}
          onChange={onTabChange}
          items={tabs.map(({ tab, label }) => ({ id: tab, label }))}
        />
      </div>

      {onExport ? (
        <ExportDropdown
          onExport={onExport}
          rowCount={
            activeTab === "performance"
              ? performanceExportCount
              : activeTab === "index"
                ? (coverageCount ?? 0)
                : activeTab === "pages"
                  ? pageCount
                  : issueRowCount
          }
        />
      ) : null}
    </div>
  );
}
