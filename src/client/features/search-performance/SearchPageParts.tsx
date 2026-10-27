import { t } from "@/shared/i18n";
import * as React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs } from "@/client/components/Tabs";
import { formatCount } from "@/client/lib/format";
import { syncGscHistory } from "@/serverFunctions/gscHistory";
import type { SearchPerformanceView } from "@/shared/searchPerformanceView";
import type { SearchTab } from "@/client/features/search-performance/searchTabs";

/**
 * Keeps the query archive caught up from this screen too: the weekly
 * position buckets read it. The same cache entry as the rankings screen, so
 * opening both costs one sync.
 */
export function useHistorySync(
  projectId: string,
  view: SearchPerformanceView | null,
) {
  const queryClient = useQueryClient();
  const sync = useQuery({
    queryKey: ["gscHistorySync", projectId],
    queryFn: () => syncGscHistory({ data: { projectId } }),
    staleTime: 15 * 60_000,
    retry: false,
    enabled: view !== null,
  });
  // The archive holds web search only, every device and country: with any
  // other filter a sync can never fill the weekly buckets, so the view is not
  // refetched for nothing.
  const needsArchive =
    view !== null &&
    view.weeklyPositionDistribution === null &&
    view.filters.device === null &&
    view.filters.country === null &&
    view.filters.searchType === "web";
  // Once per finished sync (dataUpdatedAt), not on every render.
  const synced = sync.isSuccess ? sync.dataUpdatedAt : 0;
  React.useEffect(() => {
    if (synced > 0 && needsArchive) {
      void queryClient.invalidateQueries({
        queryKey: ["searchPerformanceView", projectId],
      });
    }
  }, [synced, needsArchive, queryClient, projectId]);
}

/**
 * One scrolling row on a phone, never wrapping: seven tabs on three ragged
 * lines push the content a screen down. The open tab is scrolled into view,
 * so a link to the last tab does not land on a strip that hides it.
 */
export function TabStrip({
  tab,
  view,
  onChange,
}: {
  tab: SearchTab;
  view: SearchPerformanceView;
  onChange: (next: SearchTab) => void;
}) {
  const strip = React.useRef<HTMLDivElement>(null);
  // A fade on the right edge while more tabs sit past it, so a cut-off
  // label reads as "scroll for more" rather than as clipped text.
  const [more, setMore] = React.useState(false);
  const measure = React.useCallback(() => {
    const el = strip.current;
    if (el) setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);
  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);
  React.useEffect(() => {
    const container = strip.current;
    const active = container?.querySelector<HTMLElement>(
      '[aria-selected="true"]',
    );
    if (!container || !active) return;
    const left = active.offsetLeft;
    const right = left + active.offsetWidth;
    if (left < container.scrollLeft) container.scrollLeft = left - 16;
    else if (right > container.scrollLeft + container.clientWidth)
      container.scrollLeft = right - container.clientWidth + 16;
    measure();
  }, [tab, measure]);

  const opportunities =
    view.insights.striking.total +
    view.insights.snippets.length +
    view.insights.zeroClickPages.total;
  const changes =
    view.insights.movers.queries.declining.length +
    view.insights.movers.pages.declining.length;

  return (
    <div className="border-b border-[var(--hairline)] px-4 pt-1">
      <div
        ref={strip}
        onScroll={measure}
        className={`relative -mx-1 min-w-0 overflow-x-auto px-1 [scrollbar-width:none] ${
          more
            ? "[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)]"
            : ""
        }`}
      >
        <Tabs
          group="search-performance"
          className="w-max flex-nowrap whitespace-nowrap"
          value={tab}
          onChange={onChange}
          items={[
            {
              id: "todo",
              label: t("Yapılacaklar ({count})", {
                count: formatCount(view.todo.length),
              }),
            },
            {
              id: "queries",
              label: t("Sorgular ({count})", {
                count: formatCount(view.coverage.queries.rows),
              }),
            },
            {
              id: "pages",
              label: t("Sayfalar ({count})", {
                count: formatCount(view.coverage.pages.rows),
              }),
            },
            {
              id: "opportunities",
              // Not "Fırsatlar": the sidebar has a screen by that name.
              label: t("Sıralama fırsatları ({count})", {
                count: formatCount(opportunities),
              }),
            },
            {
              id: "changes",
              label:
                changes > 0
                  ? t("Değişimler ({count} düşüş)", {
                      count: formatCount(changes),
                    })
                  : t("Değişimler"),
            },
            { id: "overlaps", label: t("Çakışmalar") },
            { id: "distribution", label: t("Dağılım") },
          ]}
        />
      </div>
    </div>
  );
}
