import { ScoreCard } from "@/client/features/audit/results/ScoreCard";
import type { getAuditIndexCoverage } from "@/serverFunctions/indexCoverage";

type CoverageRow = Awaited<
  ReturnType<typeof getAuditIndexCoverage>
>["rows"][number];
import { formatCount } from "@/client/lib/format";
import { useEffect, useMemo, useState, type ReactNode } from "react";
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
import { DownloadReportButton } from "@/client/features/audit/results/DownloadReportButton";
import { PerformanceSummary } from "@/client/features/audit/results/PerformanceSummary";
import { CruxHistoryCard } from "@/client/features/lighthouse/CruxHistoryCard";
import { TabIntro } from "@/client/features/audit/results/TabIntro";
import { ForeignPropertyNotice } from "@/client/features/audit/results/ForeignPropertyNotice";
import { useAuditPropertyMatch } from "@/client/features/audit/results/useAuditPropertyMatch";
import {
  EMPTY_PAGES_FILTERS,
  EMPTY_PERFORMANCE_FILTERS,
  filterPages,
  scopeToUrls,
  type PagesFilters,
  type PerformanceFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import type { IssueSeverity } from "@/shared/audit-issues";
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
  severity,
}: {
  projectId: string;
  data: AuditResultsData;
  tab: ResultsTab;
  severity?: IssueSeverity;
  onTabChange: (tab: ResultsTab) => void;
}) {
  const { audit, pages, lighthouse, issues } = data;
  const crawlStopped = issues.some(
    (issue) => issue.issueType === "crawl-rate-limited",
  );
  const hasPerformanceTab = lighthouse.length > 0;
  const activeTab =
    tab === "performance" && !hasPerformanceTab ? "issues" : tab;
  /*
   * Put the URL back in step with the screen.
   *
   * An audit run without Lighthouse has no Performance tab, and a link to
   * `?tab=performance` -- from a bookmark, or from the audit before this
   * one -- silently drew Sorunlar while the address bar still said
   * performance. Reload it and you got the same mismatch again; share it
   * and the other person saw something else than you described.
   */
  useEffect(() => {
    if (tab !== activeTab) onTabChange(activeTab);
  }, [activeTab, onTabChange, tab]);
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
   * Set from a problem card on Sorunlar: the Sayfalar table then shows only
   * that problem's pages. Kept beside the filters rather than inside them
   * because it is a list of addresses, not a value the filter panel can edit.
   */
  const [pageScope, setPageScope] = useState<{
    label: string;
    urls: string[];
  } | null>(null);
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
    () => scopeToUrls(filterPages(pages, pagesFilters), pageScope?.urls),
    [pages, pagesFilters, pageScope],
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
            : 'Sunucunun "çok fazla istek" (429) yanıtı verdiği sayfalar denetlenemedi. '}
          İstek sınırı sıfırlandıktan sonra denetimi yeniden çalıştırın, ya da
          site sahibinden "seotracker-audit" tarayıcısına izin vermesini
          isteyin.
        </CrawlWarning>
      )}

      <div className="flex justify-end">
        <DownloadReportButton projectId={projectId} auditId={audit.id} />
      </div>

      <ScoreCard
        issues={issues}
        pagesCrawled={audit.pagesCrawled}
        onOpenIssues={() => onTabChange("issues")}
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
            <div className="mb-3">
              <TabIntro tab={activeTab} />
            </div>
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
                  onRowsChange={(rows) => setCoverageRows(rows ?? null)}
                  askDisabledReason={
                    property.covered
                      ? undefined
                      : `Bu denetim ${property.auditedHost} adresine ait, bağlı mülk ise ${property.propertyHost ?? "başka bir mülk"}. Sormak kotayı boşa harcardı.`
                  }
                />
              </div>
            )}
            {activeTab === "issues" && (
              <IssuesView
                issues={issues}
                initialSeverity={severity}
                focusUrl={issueFocusUrl}
                onClearFocus={() => setIssueFocusUrl(undefined)}
                onShowPages={(urls, label) => {
                  setPagesFilters(EMPTY_PAGES_FILTERS);
                  setPageScope({ label, urls });
                  onTabChange("pages");
                }}
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
                scopeLabel={pageScope?.label}
                onClearScope={() => setPageScope(null)}
                onShowIssues={(url) => {
                  setIssueFocusUrl(url);
                  onTabChange("issues");
                }}
              />
            )}
            {activeTab === "performance" && (
              <div className="mb-4">
                <CruxHistoryCard url={audit.startUrl} />
              </div>
            )}
            {activeTab === "performance" && lighthouse.length > 0 && (
              <div className="mb-4">
                <PerformanceSummary
                  lighthouse={lighthouse}
                  plannedChecks={audit.lighthouseTotal}
                  filters={performanceFilters}
                  onChange={setPerformanceFilters}
                />
              </div>
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
          ? "Dizin durumu"
          : `Dizin durumu (${formatCount(coverageCount)})`,
    },
    ...(hasPerformanceTab
      ? [
          {
            tab: "performance" as const,
            label: `Hız (${formatCount(lighthouseCount)})`,
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
