import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import { ScoreOverview } from "@/client/features/audit/results/ScoreOverview";
import { WithheldScore } from "@/client/features/audit/results/WithheldScore";
import { ChecksView } from "@/client/features/audit/results/ChecksView";
import { TodoView } from "@/client/features/audit/results/TodoView";
import { FactsView } from "@/client/features/audit/results/FactsView";
import { useAuditOverview } from "@/client/features/audit/results/useAuditOverview";
import type { AuditCategory } from "@/shared/auditCategory";
import type { getAuditIndexCoverage } from "@/serverFunctions/indexCoverage";

type CoverageRow = Awaited<
  ReturnType<typeof getAuditIndexCoverage>
>["rows"][number];
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
import { TabIntro } from "@/client/features/audit/results/TabIntro";
import { PerformanceView } from "@/client/features/audit/results/PerformanceView";
import { ForeignPropertyNotice } from "@/client/features/audit/results/ForeignPropertyNotice";
import { useAuditPropertyMatch } from "@/client/features/audit/results/useAuditPropertyMatch";
import {
  EMPTY_PAGES_FILTERS,
  EMPTY_PERFORMANCE_FILTERS,
  filterPages,
  isLighthouseFailure,
  scopeToUrls,
  type PagesFilters,
  type PerformanceFilters,
} from "@/client/features/audit/results/AuditResultsTableFilterLogic";
import type { IssueSeverity } from "@/shared/audit-issues";
import { IssuesView } from "@/client/features/audit/results/IssuesView";
import { PagesTable } from "@/client/features/audit/results/PagesTable";
import { Reveal } from "@/client/components/Reveal";
import { TabPanel } from "@/client/components/Tabs";
import { ResultsHeader } from "@/client/features/audit/results/ResultsHeader";
import { fillParts } from "@/client/features/settings/fillParts";
import { t } from "@/shared/i18n";

export function ResultsView({
  projectId,
  data,
  onTabChange,
  tab,
  severity,
  justCompleted = false,
  onSeverityChange,
  onNewAudit,
}: {
  projectId: string;
  data: AuditResultsData;
  tab: ResultsTab;
  severity?: IssueSeverity;
  /** This screen watched the audit finish; the score marks the moment once. */
  justCompleted?: boolean;
  onTabChange: (tab: ResultsTab, options?: { replace?: boolean }) => void;
  onSeverityChange?: (severity: IssueSeverity | null) => void;
  /** Back to the launch form, for a re-run. */
  onNewAudit?: () => void;
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
    // Replace, not push: the corrected entry must not trap the Back button.
    if (tab !== activeTab) onTabChange(activeTab, { replace: true });
  }, [activeTab, onTabChange, tab]);
  const property = useAuditPropertyMatch(projectId, audit.startUrl);
  const overview = useAuditOverview(projectId, data);
  const [checksFocus, setChecksFocus] = useState<AuditCategory | undefined>();
  const blockedCount = useMemo(
    () => pages.filter((page) => page.fetchClass === "blocked").length,
    [pages],
  );
  const rateLimitedCount = useMemo(
    () => pages.filter((page) => page.fetchClass === "rate_limited").length,
    [pages],
  );
  // No HTTP answer at all, even after the crawler's retry.
  const unreachableCount = useMemo(
    () =>
      pages.filter((page) => page.fetchClass === "error" && !page.statusCode)
        .length,
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
  const lighthouseMeasured = useMemo(
    () => lighthouse.filter((row) => !isLighthouseFailure(row)).length,
    [lighthouse],
  );
  // The index tab of a foreign property is one notice; there is nothing in
  // it to export.
  const foreignIndex = activeTab === "index" && !property.covered;

  return (
    <>
      {blockedCount > 0 && (
        <CrawlWarning
          headline={t("{count} sayfada engellendik.", { count: blockedCount })}
        >
          {fillParts(
            t(
              "Sitenin bot koruması tarayıcımızı durdurdu, o sayfalar denetlenemedi. Henüz bir çözümümüz yok. Masaüstü tarayıcılar sizin bilgisayarınızdan çalıştığı için genelde geçer. Şunları deneyin: {librecrawl} (ücretsiz, açık kaynak) ya da {screamingfrog} (500 adrese kadar ücretsiz).",
            ),
            {
              librecrawl: (
                <SafeExternalLink
                  className="link link-primary inline-flex items-center gap-0.5"
                  url="https://github.com/PhialsBasement/LibreCrawl"
                  label="LibreCrawl"
                />
              ),
              screamingfrog: (
                <SafeExternalLink
                  className="link link-primary inline-flex items-center gap-0.5"
                  url="https://www.screamingfrog.co.uk/seo-spider/"
                  label="Screaming Frog"
                />
              ),
            },
          )}
        </CrawlWarning>
      )}

      {unreachableCount > 0 && (
        <CrawlWarning
          headline={t("{count} sayfa alınamadı (ağ hatası).", {
            count: unreachableCount,
          })}
        >
          {t(
            "Bağlantı yeniden denemede de kurulamadı, bu sayfalar denetlenmedi ve bozuk sayılmadı. Çoğu zaman geçicidir; denetimi yeniden çalıştırın. Sürerse sitenin bu bilgisayardan açıldığını kontrol edin.",
          )}
        </CrawlWarning>
      )}

      {(rateLimitedCount > 0 || crawlStopped) && (
        <CrawlWarning
          headline={
            crawlStopped
              ? t("Tarama, sitenin istek sınırı yüzünden erken durdu.")
              : t("Site {count} sayfada istek sınırı uyguladı.", {
                  count: rateLimitedCount,
                })
          }
        >
          {crawlStopped
            ? t(
                "İstenen bekleme süresi denetim süresini aştı, bazı adresler ziyaret edilmedi. Bu rapor eksik.",
              )
            : t(
                'Sunucunun "çok fazla istek" (429) yanıtı verdiği sayfalar denetlenemedi.',
              )}{" "}
          {t(
            'İstek sınırı sıfırlandıktan sonra denetimi yeniden başlatın, ya da site sahibinden "seotracker-audit" tarayıcısına izin vermesini isteyin.',
          )}
        </CrawlWarning>
      )}

      <Reveal className="flex flex-col gap-6">
        {overview.standing.kind === "withheld" &&
        overview.standing.reason !== "empty" ? (
          <WithheldScore
            reason={overview.standing.reason}
            errorCode={audit.errorCode}
            failedPhase={audit.failedPhase}
          />
        ) : null}
        {overview.standing.kind !== "scored" ? null : (
          <ScoreOverview
            standing={overview.standing}
            thinLines={overview.thinLines}
            limitNote={overview.limitNote}
            countLine={overview.countLine}
            breakdown={overview.breakdown}
            history={overview.insights?.history}
            animate={justCompleted}
            onOpenChecks={(category) => {
              setChecksFocus(category);
              onTabChange("checks");
            }}
          />
        )}

        <div className="rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)]">
          <div className="flex flex-col gap-3 p-3 sm:p-5">
            <ResultsHeader
              todoCount={overview.todos.length}
              checkCount={overview.breakdown.checks.length}
              issueCount={issuePageCount}
              issueRowCount={scopedIssues.length}
              coverageCount={coverageRows === null ? null : coverageRows.length}
              pageCount={filteredPages.length}
              lighthouseCount={lighthouse.length}
              lighthouseMeasured={lighthouseMeasured}
              performanceExportCount={filteredLighthouse.length}
              hasPerformanceTab={hasPerformanceTab}
              activeTab={activeTab}
              onTabChange={onTabChange}
              onExport={
                foreignIndex
                  ? undefined
                  : (format) => {
                      if (activeTab === "index") {
                        exportIndexCoverage(coverageRows ?? [], format);
                        return;
                      }
                      if (activeTab === "performance") {
                        exportPerformance(filteredLighthouse, pages, format);
                        return;
                      }
                      if (activeTab !== "pages") {
                        // The overview tabs are views of the issue list.
                        exportIssues(scopedIssues, format);
                        return;
                      }
                      exportPages(filteredPages, format);
                    }
              }
            />

            <TabPanel group="audit-results" value={activeTab}>
              <div className="mb-3">
                <TabIntro tab={activeTab} />
              </div>
              {activeTab === "todo" && (
                <TodoView
                  todos={overview.todos}
                  firstGain={overview.firstGain}
                  traffic={overview.traffic}
                  insights={overview.insights}
                  issues={issues}
                />
              )}
              {activeTab === "checks" && (
                <ChecksView
                  breakdown={overview.breakdown}
                  focus={checksFocus}
                  onOpenIssues={() => onTabChange("issues")}
                />
              )}
              {activeTab === "facts" && (
                <FactsView
                  facts={data.siteFacts}
                  insights={overview.insights}
                />
              )}
              {activeTab === "index" &&
                (property.covered ? (
                  <div className="space-y-4">
                    {/* Two halves of one question. Above: what the site told
                      Google to crawl. Below: what Google decided about the
                      pages this audit found. A sitemap Google has not
                      downloaded since March explains a coverage table full
                      of unanswered rows, and the two used to live apart. */}
                    <SitemapStatusPanel projectId={projectId} />
                    <IndexCoverageView
                      projectId={projectId}
                      auditId={audit.id}
                      onRowsChange={(rows) => setCoverageRows(rows ?? null)}
                    />
                  </div>
                ) : (
                  /* The connected property is another site: its sitemaps,
                     the quota card and an inspect button would all be about
                     a site that is not on screen. One card says so. */
                  <ForeignPropertyNotice
                    projectId={projectId}
                    auditedHost={property.auditedHost}
                    propertyHost={property.propertyHost ?? t("başka bir mülk")}
                  />
                ))}
              {activeTab === "issues" && (
                <IssuesView
                  issues={issues}
                  initialSeverity={severity}
                  onSeverityChange={onSeverityChange}
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
                <PerformanceView
                  projectId={projectId}
                  auditId={audit.id}
                  startUrl={audit.startUrl}
                  lighthouse={lighthouse}
                  pages={pages}
                  plannedChecks={audit.lighthouseTotal}
                  filters={performanceFilters}
                  onFiltersChange={setPerformanceFilters}
                  onFilteredIdsChange={setPerformanceIds}
                  onNewAudit={onNewAudit}
                />
              )}
            </TabPanel>
          </div>
        </div>
      </Reveal>
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
