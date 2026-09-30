import { PageHeader, PageShell } from "@/client/components/PageShell";
import { formatRelativeTime } from "@/client/lib/format";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { getErrorCode } from "@/client/lib/error-messages";
import {
  formatCount,
  formatDateTime,
  formatDuration,
  formatPercent,
} from "@/client/lib/format";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getAuditResults,
  getAuditStatus,
  getCrawlProgress,
} from "@/serverFunctions/audit";
import { auditSearchSchema, type AuditTab } from "@/types/schemas/audit";
import { LaunchView } from "@/client/features/audit/launch/LaunchView";
import { ResultsView } from "@/client/features/audit/results/ResultsView";
import { BackLink } from "@/client/components/BackLink";
import {
  extractHostname,
  extractPathname,
  formatStartedAt,
  HttpStatusBadge,
  StatusBadge,
} from "@/client/features/audit/shared";

export const Route = createFileRoute<"/_project/p/$projectId/audit/">(
  "/_project/p/$projectId/audit/",
)({
  validateSearch: auditSearchSchema,
  component: SiteAuditPage,
});

function SiteAuditPage() {
  const { projectId } = Route.useParams();
  const { auditId, tab } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  /*
   * A pushed entry, not a replaced one. All three callers below are real
   * navigations -- opening an audit, leaving it, switching tab -- and with
   * `replace` the entire audit screen collapsed into a single history entry:
   * a reader three tabs deep who pressed Back left the audit altogether
   * instead of stepping back one tab.
   */
  const setSearchParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      void navigate({ search: (prev) => ({ ...prev, ...updates }) });
    },
    [navigate],
  );

  if (!auditId) {
    return (
      <LaunchView
        projectId={projectId}
        onAuditStarted={(id) => setSearchParams({ auditId: id })}
      />
    );
  }

  return (
    <AuditDetail
      projectId={projectId}
      auditId={auditId}
      tab={tab}
      onBack={() => setSearchParams({ auditId: undefined })}
      onTabChange={(nextTab) => setSearchParams({ tab: nextTab })}
    />
  );
}

function AuditDetail({
  projectId,
  auditId,
  tab,
  onBack,
  onTabChange,
}: {
  projectId: string;
  auditId: string;
  tab: AuditTab;
  onBack: () => void;
  onTabChange: (tab: AuditTab) => void;
}) {
  const statusQuery = useQuery({
    queryKey: ["audit-status", projectId, auditId],
    queryFn: () => getAuditStatus({ data: { projectId, auditId } }),
    // A missing audit is a settled answer, not a blip. Retrying it three
    // times with backoff left the pane blank for about seven seconds before
    // the "this audit is gone" message appeared, because between attempts the
    // query is neither loading nor errored.
    retry: (failureCount, error) =>
      getErrorCode(error) === "NOT_FOUND" ? false : failureCount < 3,
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.status === "running" ? 3000 : false;
    },
  });

  const isComplete = statusQuery.data?.status === "completed";
  const isFailed = statusQuery.data?.status === "failed";
  const isRunning = statusQuery.data?.status === "running";

  // Failed audits keep whatever pages were crawled before the failure
  // (persistence is per-batch), so fetch results for them too and show the
  // partial crawl instead of a dead end.
  const resultsQuery = useQuery({
    queryKey: ["audit-results", projectId, auditId],
    queryFn: () => getAuditResults({ data: { projectId, auditId } }),
    enabled: isComplete || isFailed,
  });

  if (statusQuery.isLoading) {
    // Shaped like the audit that is coming - header, three stats, the results
    // panel - so the page does not jump when it arrives.
    return (
      <PageShell>
        <div className="flex flex-col gap-6" aria-busy>
          <div className="skeleton h-9 w-64" />
          <div className="skeleton h-[104px]" />
          <div className="skeleton h-80" />
        </div>
      </PageShell>
    );
  }

  if (statusQuery.isError) {
    return (
      <PageShell width="reading">
        <div className="alert alert-error">
          <AlertCircle className="size-5" />
          <span>Bu denetim yüklenemedi. Silinmiş olabilir.</span>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          &larr; Tüm denetimler
        </button>
      </PageShell>
    );
  }

  const status = statusQuery.data;
  const partialPageCount = isFailed
    ? (resultsQuery.data?.pages.length ?? 0)
    : 0;
  const failedWithResults = isFailed && partialPageCount > 0;
  // Wait for the results fetch before choosing between the "partial results"
  // banner and the zero-page support CTA, so the CTA doesn't flash first.
  const showSupportCta =
    (isFailed && resultsQuery.isSuccess && !failedWithResults) ||
    (isComplete && status && status.pagesCrawled <= 1);

  return (
    <PageShell>
      {/* `PageHeader`, not a hand-rolled h1: this screen had its own heading
          markup and its own idea of the gap below it, which is how the app
          ended up with several. The back button is what `eyebrow` is for. */}
      <PageHeader
        eyebrow={<BackLink onClick={onBack}>Tüm denetimler</BackLink>}
        title={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {status ? extractHostname(status.startUrl) : "Site Denetimi"}
            {status && status.status !== "running" ? (
              <StatusBadge status={status.status} />
            ) : null}
          </span>
        }
        description={
          status ? (
            <>
              {/* Relative, with the exact time in the tooltip. "26 Eyl 10:36"
                  makes the reader do date arithmetic to answer the only
                  question they have: is this crawl current? */}
              Site denetimi ·{" "}
              <time
                dateTime={status.startedAt}
                title={formatStartedAt(status.startedAt)}
              >
                {formatRelativeTime(status.startedAt)}
              </time>
            </>
          ) : undefined
        }
      />

      {isRunning && status && (
        <ProgressCard projectId={projectId} auditId={auditId} status={status} />
      )}

      {showSupportCta && (
        <div className={isFailed ? "alert alert-error" : "alert alert-warning"}>
          <AlertCircle className="size-5" />
          <div className="space-y-1">
            <p className="font-medium">Denetim bu siteyi tamamen tarayamadı.</p>
            <p>
              Sitenin bot koruması tarayıcımızı engelledi ve bunu aşmanın bir
              yolu şu an yok. Kendi makinenizde çalışan masaüstü tarayıcılar
              genellikle geçebiliyor:{" "}
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
              (500 adrese kadar ücretsiz).
            </p>
          </div>
        </div>
      )}

      {failedWithResults && (
        <div className="alert alert-warning">
          <AlertCircle className="size-5" />
          <div className="space-y-1">
            <p className="font-medium">
              Denetim {partialPageCount} sayfadan sonra erken durdu.
            </p>
            <p>
              Aşağıdaki sonuçlar durmadan önce taranan her şeyi kapsıyor.
              Yeniden denemek için yeni bir denetim başlatın. Tekrar ederse
              hangi adımın düştüğünü konteyner günlüğünde görebilirsiniz.
            </p>
          </div>
        </div>
      )}

      {/* The status query has had a skeleton and an error branch since it was
          written; the results query had neither, so a completed audit whose
          results call failed rendered a green "completed" badge above an
          empty page -- no alert, no retry, nothing naming what went wrong.
          A failed audit whose results also failed rendered a bare header,
          because both banners above are gated on `resultsQuery` settling. */}
      {resultsQuery.isPending && (isComplete || isFailed) ? (
        <div className="skeleton h-80" aria-busy />
      ) : null}

      {resultsQuery.isError ? (
        <div className="rounded-box border border-base-300 bg-base-100">
          <QueryErrorState
            error={resultsQuery.error}
            onRetry={() => void resultsQuery.refetch()}
            title="Denetim sonuçları yüklenemedi"
          />
        </div>
      ) : null}

      {(isComplete || failedWithResults) && resultsQuery.data && (
        <ResultsView
          projectId={projectId}
          data={resultsQuery.data}
          tab={tab}
          onTabChange={onTabChange}
        />
      )}
    </PageShell>
  );
}

function ProgressCard({
  projectId,
  auditId,
  status,
}: {
  projectId: string;
  auditId: string;
  status: {
    pagesCrawled: number;
    pagesTotal: number;
    lighthouseTotal: number;
    lighthouseCompleted: number;
    lighthouseFailed: number;
    currentPhase: string | null;
    startedAt: string;
  };
}) {
  const crawlProgress =
    status.pagesTotal > 0 ? status.pagesCrawled / status.pagesTotal : 0;
  const lighthouseDone = status.lighthouseCompleted + status.lighthouseFailed;
  const lighthouseProgress =
    status.lighthouseTotal > 0 ? lighthouseDone / status.lighthouseTotal : 0;
  const isLighthousePhase = status.currentPhase === "lighthouse";
  const phaseLabel =
    status.currentPhase === "discovery"
      ? "Keşif"
      : status.currentPhase === "crawling"
        ? "Taranıyor"
        : status.currentPhase === "lighthouse"
          ? "Hız ölçümü"
          : status.currentPhase === "finalizing"
            ? "Tamamlanıyor"
            : (status.currentPhase ?? "Çalışıyor");
  const progress = isLighthousePhase ? lighthouseProgress : crawlProgress;
  /** Discovery has not produced a denominator yet. */
  const hasTotal = isLighthousePhase
    ? status.lighthouseTotal > 0
    : status.pagesTotal > 0;

  /*
   * How long it has been running, and roughly how much is left.
   *
   * A five-hundred-page crawl can run for many minutes -- the launch form
   * says so before starting one -- and the only thing telling the operator
   * whether to wait or come back was a fraction that can sit still for
   * thirty seconds on a slow host. The estimate is gated on 5%: before
   * that the rate is one or two pages of noise and the number it produces
   * is a guess dressed as an answer.
   */
  const elapsedMs = Date.now() - new Date(status.startedAt).getTime();
  const remainingMs =
    hasTotal && progress > 0.05 && elapsedMs > 0
      ? (elapsedMs * (1 - progress)) / progress
      : null;

  const crawlProgressQuery = useQuery({
    queryKey: ["audit-crawl-progress", projectId, auditId],
    queryFn: () => getCrawlProgress({ data: { projectId, auditId } }),
    refetchInterval: 1500,
  });

  const crawledUrls = crawlProgressQuery.data ?? [];

  return (
    <div className="space-y-3">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex items-center gap-2">
              <Loader2 className="size-4 animate-spin text-primary" />
              {isLighthousePhase
                ? "Lighthouse kontrolleri çalışıyor"
                : "Sayfalar taranıyor"}
            </h2>
            <span className="badge badge-ghost badge-sm">{phaseLabel}</span>
          </div>

          {/* Indeterminate until there is a total to be a fraction of.
              During discovery `pagesTotal` is 0, so a determinate bar sat
              at zero and the line read "0 / 0 sayfa · %0" for exactly the
              phase where the operator is least sure anything is happening.
              A `<progress>` with no `value` animates instead. */}
          <progress
            className="progress progress-primary w-full"
            aria-label="Denetim ilerlemesi"
            {...(hasTotal ? { value: progress, max: 1 } : {})}
          />

          {/* One polite region for the whole run: a screen reader got
              nothing at all for a crawl that takes minutes. */}
          <div
            className="flex items-center justify-between text-sm"
            role="status"
            aria-live="polite"
          >
            {!hasTotal ? (
              <span>Adresler bulunuyor…</span>
            ) : isLighthousePhase ? (
              <span>
                {formatCount(lighthouseDone)} /{" "}
                {formatCount(status.lighthouseTotal)} kontrol
                {status.lighthouseFailed > 0
                  ? ` (${formatCount(status.lighthouseFailed)} başarısız)`
                  : ""}
              </span>
            ) : (
              <span>
                {formatCount(status.pagesCrawled)} /{" "}
                {formatCount(status.pagesTotal)} sayfa
              </span>
            )}
            {hasTotal ? (
              <span className="text-muted">
                {formatPercent(progress, 0)}
                {remainingMs !== null
                  ? ` · ~${formatDuration(remainingMs)} kaldı`
                  : ""}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {crawledUrls.length > 0 && (
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-2 p-4">
            <h3 className="text-sm font-medium text-muted">
              Taranan sayfalar ({formatCount(crawledUrls.length)})
            </h3>
            <p className="text-xs text-muted">
              Güncellendi{" "}
              {formatDateTime(new Date(crawledUrls[0].crawledAt).toISOString())}
            </p>
            <div className="max-h-[400px] overflow-y-auto -mx-1">
              {crawledUrls.map((entry, i) => (
                <ProgressRow
                  key={`${entry.url}-${entry.crawledAt}`}
                  entry={entry}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProgressRow({
  entry,
  index,
}: {
  entry: {
    url: string;
    statusCode: number | null;
    title: string | null;
    crawledAt: number;
  };
  index: number;
}) {
  const pathname = extractPathname(entry.url);

  return (
    <div
      className={`flex items-center justify-between gap-3 px-2 py-1.5 rounded-field text-sm ${
        index === 0
          ? "bg-primary/5 animate-in fade-in slide-in-from-top-1 duration-300"
          : ""
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <HttpStatusBadge code={entry.statusCode} />
        <span className="truncate text-muted" title={entry.url}>
          {pathname}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {entry.title && (
          <span
            className="text-xs text-muted truncate max-w-[260px] hidden md:block"
            title={entry.title}
          >
            {entry.title}
          </span>
        )}
      </div>
    </div>
  );
}
