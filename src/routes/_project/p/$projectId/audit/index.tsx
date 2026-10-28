import { SafeExternalLink } from "@/client/components/SafeExternalLink";
import { PageHeader, PageShell } from "@/client/components/PageShell";
import { PageActions, RefreshButton } from "@/client/components/RefreshButton";
import { formatRelativeTime } from "@/client/lib/format";
import { QueryErrorState } from "@/client/components/QueryErrorState";
import { getErrorCode } from "@/client/lib/error-messages";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAuditResults, getAuditStatus } from "@/serverFunctions/audit";
import type { IssueSeverity } from "@/shared/audit-issues";
import { auditSearchSchema, type AuditTab } from "@/types/schemas/audit";
import { ProgressCard } from "@/client/features/audit/launch/ProgressCard";
import { useCompletionHold } from "@/client/features/audit/launch/useCompletionHold";
import { LaunchView } from "@/client/features/audit/launch/LaunchView";
import { ResultsView } from "@/client/features/audit/results/ResultsView";
import { DownloadReportButton } from "@/client/features/audit/results/DownloadReportButton";
import { BackLink } from "@/client/components/BackLink";
import {
  extractHostname,
  formatStartedAt,
  StatusBadge,
} from "@/client/features/audit/shared";
import { fillParts } from "@/client/features/settings/fillParts";
import {
  describeAuditFailure,
  describeAuditNotice,
} from "@/client/features/audit/results/auditFailureCopy";
import { t } from "@/shared/i18n";

export const Route = createFileRoute<"/_project/p/$projectId/audit/">(
  "/_project/p/$projectId/audit/",
)({
  validateSearch: auditSearchSchema,
  component: SiteAuditPage,
});

function SiteAuditPage() {
  const { projectId } = Route.useParams();
  const { auditId, tab, severity, pageUrl, issueType } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  /*
   * A pushed entry, not a replaced one. All three callers below are real
   * navigations -- opening an audit, leaving it, switching tab -- and with
   * `replace` the entire audit screen collapsed into a single history entry:
   * a reader three tabs deep who pressed Back left the audit altogether
   * instead of stepping back one tab.
   */
  const setSearchParams = useCallback(
    (
      updates: Record<string, string | undefined>,
      options?: { replace?: boolean },
    ) => {
      void navigate({
        search: (prev) => ({ ...prev, ...updates }),
        replace: options?.replace ?? false,
      });
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
      issueType={issueType}
      severity={severity}
      pageUrl={pageUrl}
      onPageUrlChange={(url) =>
        setSearchParams({ pageUrl: url }, { replace: true })
      }
      onBack={() =>
        setSearchParams({
          auditId: undefined,
          pageUrl: undefined,
          issueType: undefined,
        })
      }
      onTabChange={(nextTab, options) =>
        setSearchParams({ tab: nextTab }, options)
      }
      // A filter tweak is not a navigation: replace, so Back is not a stack of
      // every severity click.
      onIssueTypeChange={(next) =>
        setSearchParams({ issueType: next ?? undefined }, { replace: true })
      }
      onSeverityChange={(next) =>
        setSearchParams({ severity: next ?? undefined }, { replace: true })
      }
    />
  );
}

function AuditDetail({
  projectId,
  auditId,
  tab,
  severity,
  issueType,
  onIssueTypeChange,
  pageUrl,
  onPageUrlChange,
  onBack,
  onTabChange,
  onSeverityChange,
}: {
  projectId: string;
  auditId: string;
  tab: AuditTab;
  severity: IssueSeverity | undefined;
  issueType?: string;
  onIssueTypeChange: (issueType: string | null) => void;
  pageUrl?: string;
  onPageUrlChange: (url: string | undefined) => void;
  onBack: () => void;
  onTabChange: (tab: AuditTab, options?: { replace?: boolean }) => void;
  onSeverityChange: (severity: IssueSeverity | null) => void;
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

  const { finished, holding, justCompleted, isComplete, isRunning, isFailed } =
    useCompletionHold(statusQuery.data?.status);

  // Failed audits keep whatever pages were crawled before the failure
  // (persistence is per-batch), so fetch results for them too and show the
  // partial crawl instead of a dead end.
  const resultsQuery = useQuery({
    queryKey: ["audit-results", projectId, auditId],
    queryFn: () => getAuditResults({ data: { projectId, auditId } }),
    enabled: finished || isFailed,
    // Only queried once the audit is completed or failed, and a finished
    // audit never changes (a re-run is a new audit id), so never refetch.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
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

  // Only without data: a failed background poll must not replace an audit
  // that is already on screen.
  if (statusQuery.isError && !statusQuery.data) {
    const notFound = getErrorCode(statusQuery.error) === "NOT_FOUND";
    return (
      <PageShell width="reading">
        {notFound ? (
          <div className="alert alert-error">
            <AlertCircle className="size-5" />
            <span>{t("Bu denetim bulunamadı. Silinmiş olabilir.")}</span>
          </div>
        ) : (
          <div className="rounded-box border border-base-300 bg-base-100">
            <QueryErrorState
              error={statusQuery.error}
              onRetry={() => void statusQuery.refetch()}
              title={t("Denetime bağlanılamadı")}
            />
          </div>
        )}
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          &larr; {t("Tüm denetimler")}
        </button>
      </PageShell>
    );
  }

  const status = statusQuery.data;
  const partialPageCount = isFailed
    ? (resultsQuery.data?.pages.length ?? 0)
    : 0;
  const failedWithResults = isFailed && partialPageCount > 0;
  return (
    <PageShell>
      {/* `PageHeader`, not a hand-rolled h1: this screen had its own heading
          markup and its own idea of the gap below it, which is how the app
          ended up with several. The back button is what `eyebrow` is for. */}
      <PageHeader
        eyebrow={<BackLink onClick={onBack}>{t("Tüm denetimler")}</BackLink>}
        title={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {status ? extractHostname(status.startUrl) : t("Site denetimi")}
            {status && status.status !== "running" ? (
              <StatusBadge status={status.status} />
            ) : null}
          </span>
        }
        actions={
          <PageActions>
            {/* Beside Yenile rather than above the score: it acts on the
                whole audit, like the header's other action. */}
            {(isComplete || failedWithResults) && resultsQuery.data ? (
              <DownloadReportButton projectId={projectId} auditId={auditId} />
            ) : null}
            <RefreshButton
              onRefresh={() => {
                void statusQuery.refetch();
                if (isComplete || isFailed) void resultsQuery.refetch();
              }}
              isFetching={statusQuery.isFetching || resultsQuery.isFetching}
              dataUpdatedAt={
                resultsQuery.dataUpdatedAt || statusQuery.dataUpdatedAt
              }
              shortcut
            />
          </PageActions>
        }
        description={
          status ? (
            <>
              {/* Relative, with the exact time in the tooltip. "26 Eyl 10:36"
                  makes the reader do date arithmetic to answer the only
                  question they have: is this crawl current? */}
              {fillParts(t("Site denetimi · {time}"), {
                time: (
                  <time
                    dateTime={status.startedAt}
                    title={formatStartedAt(status.startedAt)}
                  >
                    {formatRelativeTime(status.startedAt)}
                  </time>
                ),
              })}
            </>
          ) : undefined
        }
      />

      {isRunning && status && (
        <ProgressCard
          projectId={projectId}
          auditId={auditId}
          status={status}
          completed={holding}
          issueCount={resultsQuery.data?.issues.length}
        />
      )}
      <FailureBanners
        status={status}
        isFailed={isFailed}
        isComplete={isComplete}
        failedWithResults={failedWithResults}
        keptPages={partialPageCount}
        resultsReady={resultsQuery.isSuccess}
      />

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
            title={t("Denetim sonuçları yüklenemedi")}
          />
        </div>
      ) : null}

      {(isComplete || failedWithResults) && resultsQuery.data && (
        <ResultsView
          projectId={projectId}
          data={resultsQuery.data}
          tab={tab}
          issueType={issueType}
          onIssueTypeChange={onIssueTypeChange}
          severity={severity}
          pageUrl={pageUrl}
          onPageUrlChange={onPageUrlChange}
          justCompleted={justCompleted}
          onTabChange={onTabChange}
          onSeverityChange={onSeverityChange}
          onNewAudit={onBack}
        />
      )}
    </PageShell>
  );
}

/**
 * What an audit that stopped (or finished with a caveat) tells the operator.
 * A failure we classified says what happened, whether it is the site or the
 * app, and what to do (see auditFailureCopy.ts). An unclassified failure with
 * nothing crawled is read as the site's bot protection, so it gets the
 * desktop-crawler suggestion; the results fetch is awaited before choosing so
 * that suggestion doesn't flash first.
 */
function FailureBanners({
  status,
  isFailed,
  isComplete,
  failedWithResults,
  keptPages,
  resultsReady,
}: {
  status:
    | {
        errorCode?: string | null;
        failedPhase?: string | null;
        noticeCode?: string | null;
        pagesCrawled: number;
      }
    | undefined;
  isFailed: boolean;
  isComplete: boolean;
  failedWithResults: boolean;
  keptPages: number;
  resultsReady: boolean;
}) {
  const classifiedFailure = isFailed && Boolean(status?.errorCode);
  const showFailure = classifiedFailure || failedWithResults;
  const failure = showFailure
    ? describeAuditFailure({
        errorCode: status?.errorCode,
        failedPhase: status?.failedPhase,
      })
    : null;
  const notice = isComplete ? describeAuditNotice(status?.noticeCode) : null;
  const showSupportCta =
    (isFailed && !classifiedFailure && resultsReady && !failedWithResults) ||
    (isComplete && status !== undefined && status.pagesCrawled <= 1);
  return (
    <>
      {failure && (
        <div
          role="alert"
          className={
            failedWithResults ? "alert alert-warning" : "alert alert-error"
          }
        >
          <AlertCircle className="size-5" />
          <div className="space-y-1">
            <p className="font-medium">
              {t(failure.title, {
                phase: failure.phase ? t(failure.phase) : "",
              })}
            </p>
            <p>
              {t(failure.cause)} {t(failure.side)}
            </p>
            {failedWithResults && (
              <p>
                {t(
                  "{count} sayfa tarandı ve kaydedildi; aşağıdaki sonuçlar bu sayfalara dayanır.",
                  { count: keptPages },
                )}
              </p>
            )}
            <p>{t(failure.action)}</p>
          </div>
        </div>
      )}

      {notice && (
        <div role="status" className="alert alert-warning">
          <AlertCircle className="size-5" />
          <div className="space-y-1">
            <p className="font-medium">{t(notice.title)}</p>
            <p>{t(notice.body)}</p>
          </div>
        </div>
      )}

      {showSupportCta && (
        <div className={isFailed ? "alert alert-error" : "alert alert-warning"}>
          <AlertCircle className="size-5" />
          <div className="space-y-1">
            <p className="font-medium">
              {t("Denetim bu siteyi tamamen tarayamadı.")}
            </p>
            <p>
              {fillParts(
                t(
                  "Sitenin bot koruması tarayıcımızı engelledi ve şu an aşmanın bir yolu yok. Bilgisayarınızda çalışan masaüstü tarayıcılar genelde geçer. Şunları deneyin: {libreCrawl} (ücretsiz, açık kaynak) ya da {screamingFrog} (500 adrese kadar ücretsiz).",
                ),
                {
                  libreCrawl: (
                    <SafeExternalLink
                      className="link link-primary inline-flex items-center gap-0.5"
                      url="https://github.com/PhialsBasement/LibreCrawl"
                      label="LibreCrawl"
                    />
                  ),
                  screamingFrog: (
                    <SafeExternalLink
                      className="link link-primary inline-flex items-center gap-0.5"
                      url="https://www.screamingfrog.co.uk/seo-spider/"
                      label="Screaming Frog"
                    />
                  ),
                },
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
