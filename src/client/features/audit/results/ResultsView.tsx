import { StatsStrip } from "@/client/features/audit/results/ResultsStats";
import type { getAuditIndexCoverage } from "@/serverFunctions/indexCoverage";

type CoverageRow = Awaited<
  ReturnType<typeof getAuditIndexCoverage>
>["rows"][number];
import { formatCount } from "@/client/lib/format";
import { useMemo, useState, type ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import {
  exportIndexCoverage,
  exportIssues,
  exportPages,
  exportPerformance,
} from "@/client/features/audit/results/export";
import type { AuditResultsData } from "@/client/features/audit/results/types";
import type { AuditTab as ResultsTab } from "@/types/schemas/audit";
import { IndexCoverageView } from "@/client/features/audit/results/IndexCoverageView";
import { SitemapStatusPanel } from "@/client/features/gsc/SitemapStatusPanel";
import { ForeignPropertyNotice } from "@/client/features/audit/results/ForeignPropertyNotice";
import { useAuditPropertyMatch } from "@/client/features/audit/results/useAuditPropertyMatch";
import {
  EMPTY_PAGES_FILTERS,
  EMPTY_PERFORMANCE_FILTERS,
  filterPages,
  isLighthouseFailure,
  type PagesFilters,
  type PerformanceFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import { IssuesView } from "@/client/features/audit/results/IssuesView";
import { PagesTable } from "@/client/features/audit/results/PagesTable";
import { TabPanel, Tabs } from "@/client/components/Tabs";
import {
  ExportDropdown,
  PerformanceTable,
} from "@/client/features/audit/results/ResultsTables";

export function ResultsView({
  projectId,
  data,
  onTabChange,
  tab,
}: {
  projectId: string;
  data: AuditResultsData;
  tab: ResultsTab;
  onTabChange: (tab: ResultsTab) => void;
}) {
  const { audit, pages, lighthouse, issues } = data;
  const crawlStopped = issues.some(
    (issue) => issue.issueType === "crawl-rate-limited",
  );
  const hasPerformanceTab = lighthouse.length > 0;
  const activeTab =
    tab === "performance" && !hasPerformanceTab ? "issues" : tab;
  const stats = useResultStats(pages, lighthouse);
  const property = useAuditPropertyMatch(projectId, audit.startUrl);
  const blockedCount = useMemo(
    () => pages.filter((page) => page.fetchClass === "blocked").length,
    [pages],
  );
  const rateLimitedCount = useMemo(
    () => pages.filter((page) => page.fetchClass === "rate_limited").length,
    [pages],
  );
  /*
   * Distinct pages, matching what every issue row already claims.
   *
   * Link-level checks write one row per occurrence, so `issues.length` is a
   * record count. The group rows were corrected to count pages; the tab
   * label and the stat above them were not, which left the three biggest
   * numbers on the screen disagreeing -- and the groups visibly failing to
   * sum to the header.
   */
  /*
   * Owned here so the export menu and the table agree on what "these rows"
   * means. See the note on `PagesTable`'s props.
   */
  const [pagesFilters, setPagesFilters] =
    useState<PagesFilters>(EMPTY_PAGES_FILTERS);
  const [performanceFilters, setPerformanceFilters] =
    useState<PerformanceFilters>(EMPTY_PERFORMANCE_FILTERS);
  const [performanceIds, setPerformanceIds] = useState<string[] | null>(null);
  const [issueFocusUrl, setIssueFocusUrl] = useState<string | undefined>();
  /*
   * null until the index tab has been opened once: the query lives inside
   * that tab, so before then the count is unknown, not zero. The tab label
   * says nothing rather than claiming "(0)" for a table nobody has loaded.
   */
  const [coverageRows, setCoverageRows] = useState<CoverageRow[] | null>(null);
  /*
   * The export has to follow the focus chip, the same way the pages and
   * performance exports follow their filters. Without this, focusing one
   * page and clicking CSV wrote every issue in the audit while the screen
   * showed one.
   */
  const scopedIssues = useMemo(
    () =>
      issueFocusUrl
        ? issues.filter((issue) => issue.pageUrl === issueFocusUrl)
        : issues,
    [issueFocusUrl, issues],
  );
  const filteredLighthouse = useMemo(() => {
    if (!performanceIds) return lighthouse;
    const keep = new Set(performanceIds);
    return lighthouse.filter((row) => keep.has(row.id));
  }, [lighthouse, performanceIds]);
  const filteredPages = useMemo(
    () => filterPages(pages, pagesFilters),
    [pages, pagesFilters],
  );
  const issuePageCount = useMemo(
    () => new Set(issues.map((issue) => issue.pageUrl)).size,
    [issues],
  );

  return (
    <>
      {blockedCount > 0 && (
        <CrawlWarning headline={`${blockedCount} sayfada engellendik.`}>
          Sitenin bot koruması tarayıcımızı durdurdu, bu yüzden o sayfalar
          denetlenemedi. Bunun için henüz bir çözümümüz yok. Masaüstü
          tarayıcılar kendi makinenizden çalıştığı için genelde geçebiliyor:{" "}
          <a
            className="link link-primary"
            href="https://github.com/PhialsBasement/LibreCrawl"
            target="_blank"
            rel="noreferrer"
          >
            LibreCrawl
          </a>{" "}
          (ücretsiz, açık kaynak) ya da{" "}
          <a
            className="link link-primary"
            href="https://www.screamingfrog.co.uk/seo-spider/"
            target="_blank"
            rel="noreferrer"
          >
            Screaming Frog
          </a>{" "}
          (500 adrese kadar ücretsiz) deneyin.
        </CrawlWarning>
      )}

      {(rateLimitedCount > 0 || crawlStopped) && (
        <CrawlWarning
          headline={
            crawlStopped
              ? "Tarama, sitenin istek sınırı yüzünden erken durdu."
              : `Site ${rateLimitedCount} sayfada istek sınırı uyguladı.`
          }
        >
          {crawlStopped
            ? "İstenen bekleme süresi denetim süresini aştı, bazı adresler ziyaret edilmedi. Bu rapor eksiktir. "
            : "429 Too Many Requests döndüren sayfalar denetlenemedi. "}
          İstek sınırı sıfırlandıktan sonra denetimi yeniden çalıştırın, ya da
          site sahibinden "seotracker-audit" tarayıcısına izin vermesini
          isteyin.
        </CrawlWarning>
      )}

      <StatsStrip
        pagesCrawled={audit.pagesCrawled}
        issuePageCount={issuePageCount}
        issues={issues}
        totalLighthouse={lighthouse.length}
        averageResponseMs={stats.averageResponseMs}
        lighthouseSummary={stats.lighthouseSummary}
        onTabChange={onTabChange}
      />

      <div className="card bg-base-100 border border-base-300">
        <div className="card-body gap-3">
          <ResultsHeader
            issueCount={issuePageCount}
            issueRowCount={scopedIssues.length}
            coverageCount={coverageRows === null ? null : coverageRows.length}
            pageCount={filteredPages.length}
            lighthouseCount={filteredLighthouse.length}
            hasPerformanceTab={hasPerformanceTab}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onExport={(format) => {
              if (activeTab === "index") {
                exportIndexCoverage(coverageRows ?? [], format);
                return;
              }
              if (activeTab === "performance") {
                exportPerformance(filteredLighthouse, pages, format);
                return;
              }
              if (activeTab === "issues") {
                exportIssues(scopedIssues, format);
                return;
              }
              exportPages(filteredPages, format);
            }}
          />

          <TabPanel group="audit-results" value={activeTab}>
            {activeTab === "index" && (
              <div className="space-y-4">
                {/* Two halves of one question. Above: what the site told
                    Google to crawl. Below: what Google decided about the
                    pages this audit found. A sitemap Google has not
                    downloaded since March explains a coverage table full of
                    unanswered rows, and the two used to live apart. */}
                {property.covered ? null : (
                  <ForeignPropertyNotice
                    projectId={projectId}
                    auditedHost={property.auditedHost}
                    propertyHost={property.propertyHost ?? "başka bir mülk"}
                  />
                )}
                <SitemapStatusPanel projectId={projectId} />
                <IndexCoverageView
                  projectId={projectId}
                  auditId={audit.id}
                  onRowsChange={setCoverageRows}
                  askDisabledReason={
                    property.covered
                      ? undefined
                      : `Bu denetim ${property.auditedHost} adresine ait, bağlı mülk ise ${property.propertyHost ?? "başka bir site"}. Sormak kotayı boşa harcardı.`
                  }
                />
              </div>
            )}
            {activeTab === "issues" && (
              <IssuesView
                issues={issues}
                focusUrl={issueFocusUrl}
                onClearFocus={() => setIssueFocusUrl(undefined)}
              />
            )}
            {activeTab === "pages" && (
              <PagesTable
                pages={pages}
                startUrl={audit.startUrl}
                issues={issues}
                filters={pagesFilters}
                onFiltersChange={setPagesFilters}
                filteredPages={filteredPages}
                onShowIssues={(url) => {
                  setIssueFocusUrl(url);
                  onTabChange("issues");
                }}
              />
            )}
            {activeTab === "performance" && lighthouse.length > 0 && (
              <PerformanceTable
                auditId={audit.id}
                projectId={projectId}
                lighthouse={lighthouse}
                pages={pages}
                filters={performanceFilters}
                onFiltersChange={setPerformanceFilters}
                onFilteredIdsChange={setPerformanceIds}
              />
            )}
          </TabPanel>
        </div>
      </div>
    </>
  );
}

/** Banner for pages the crawler could not read (bot protection, rate limits). */
function CrawlWarning({
  headline,
  children,
}: {
  headline: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-box border border-warning/30 bg-warning/5 px-4 py-3 text-sm">
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
      <p>
        <span className="font-medium">{headline}</span>{" "}
        <span className="text-muted">{children}</span>
      </p>
    </div>
  );
}

function useResultStats(
  pages: AuditResultsData["pages"],
  lighthouse: AuditResultsData["lighthouse"],
) {
  const averageResponseMs = useMemo(() => {
    if (pages.length === 0) return 0;
    const total = pages.reduce(
      (sum: number, page: AuditResultsData["pages"][number]) =>
        sum + (page.responseTimeMs ?? 0),
      0,
    );
    return Math.round(total / pages.length);
  }, [pages]);

  const lighthouseSummary = useMemo(() => {
    const failed = lighthouse.filter(
      (row: AuditResultsData["lighthouse"][number]) => isLighthouseFailure(row),
    ).length;
    const successful = lighthouse.filter(
      (row: AuditResultsData["lighthouse"][number]) =>
        !isLighthouseFailure(row),
    );
    const averageScore = (
      key: "performanceScore" | "seoScore" | "accessibilityScore",
    ) => {
      const values = successful
        .map((row: AuditResultsData["lighthouse"][number]) => row[key])
        .filter((value: number | null): value is number => value != null);
      if (values.length === 0) return null;
      const total = values.reduce((sum: number, value) => sum + value, 0);
      return Math.round(total / values.length);
    };

    return {
      failed,
      avgPerformance: averageScore("performanceScore"),
      avgSeo: averageScore("seoScore"),
      avgAccessibility: averageScore("accessibilityScore"),
    };
  }, [lighthouse]);

  return { averageResponseMs, lighthouseSummary };
}

function ResultsHeader({
  issueCount,
  issueRowCount,
  coverageCount,
  pageCount,
  lighthouseCount,
  hasPerformanceTab,
  activeTab,
  onTabChange,
  onExport,
}: {
  /** Distinct affected pages — what the tab label promises. */
  issueCount: number;
  /** Issue records — what an issues export actually writes. */
  issueRowCount: number;
  /** Rows Google has answered about, or null before that tab has loaded. */
  coverageCount: number | null;
  pageCount: number;
  lighthouseCount: number;
  hasPerformanceTab: boolean;
  activeTab: ResultsTab;
  onTabChange: (tab: ResultsTab) => void;
  onExport: (format: "csv" | "json" | "sheets") => void;
}) {
  const tabs: Array<{ tab: ResultsTab; label: string }> = [
    { tab: "issues", label: `Sorunlar (${formatCount(issueCount)})` },
    { tab: "pages", label: `Sayfalar (${formatCount(pageCount)})` },
    {
      tab: "index",
      label:
        coverageCount === null
          ? "İndeksleme"
          : `İndeksleme (${formatCount(coverageCount)})`,
    },
    ...(hasPerformanceTab
      ? [
          {
            tab: "performance" as const,
            label: `Performance (${formatCount(lighthouseCount)})`,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <Tabs
        group="audit-results"
        className="w-fit"
        value={activeTab}
        onChange={onTabChange}
        items={tabs.map(({ tab, label }) => ({ id: tab, label }))}
      />

      {/* No export for index coverage yet, and falling through to the pages
          export downloaded the wrong file without saying so. */}
      <ExportDropdown
        onExport={onExport}
        rowCount={
          activeTab === "performance"
            ? lighthouseCount
            : activeTab === "issues"
              ? issueRowCount
              : activeTab === "index"
                ? (coverageCount ?? 0)
                : pageCount
        }
      />
    </div>
  );
}
