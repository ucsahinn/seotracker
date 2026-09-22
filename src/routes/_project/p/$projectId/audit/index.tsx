import { PageShell } from "@/client/components/PageShell";
import { getErrorCode } from "@/client/lib/error-messages";
import { formatDateTime } from "@/client/lib/format";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  getAuditResults,
  getAuditStatus,
  getCrawlProgress,
} from "@/serverFunctions/audit";
import { auditSearchSchema } from "@/types/schemas/audit";
import { LaunchView } from "@/client/features/audit/launch/LaunchView";
import { ResultsView } from "@/client/features/audit/results/ResultsView";
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
  tab: string;
  onBack: () => void;
  onTabChange: (tab: "issues" | "pages" | "performance" | "index") => void;
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
      <div className="space-y-1">
        <button className="btn btn-ghost btn-sm px-0" onClick={onBack}>
          &larr; Tüm denetimler
        </button>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h1 className="text-2xl font-semibold">
            {status ? extractHostname(status.startUrl) : "Site Denetimi"}
          </h1>
          {status?.status !== "running" && status && (
            <StatusBadge status={status.status} />
          )}
        </div>
        {status && (
          <p className="text-sm text-muted">
            Site denetimi &middot; {formatStartedAt(status.startedAt)}
          </p>
        )}
      </div>

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
  };
}) {
  const crawlProgress =
    status.pagesTotal > 0
      ? Math.round((status.pagesCrawled / status.pagesTotal) * 100)
      : 0;
  const lighthouseDone = status.lighthouseCompleted + status.lighthouseFailed;
  const lighthouseProgress =
    status.lighthouseTotal > 0
      ? Math.round((lighthouseDone / status.lighthouseTotal) * 100)
      : 0;
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

          <progress
            className="progress progress-primary w-full"
            value={progress}
            max={100}
          />

          <div className="flex items-center justify-between text-sm">
            {isLighthousePhase ? (
              <span>
                {lighthouseDone} / {status.lighthouseTotal} kontrol
                {status.lighthouseFailed > 0
                  ? ` (${status.lighthouseFailed} başarısız)`
                  : ""}
              </span>
            ) : (
              <span>
                {status.pagesCrawled} / {status.pagesTotal} sayfa
              </span>
            )}
            <span className="text-muted">{progress}%</span>
          </div>
        </div>
      </div>

      {crawledUrls.length > 0 && (
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-2 p-4">
            <h3 className="text-sm font-medium text-muted">
              Taranan sayfalar ({crawledUrls.length})
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
      className={`flex items-center justify-between gap-3 px-2 py-1.5 rounded text-sm ${
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
