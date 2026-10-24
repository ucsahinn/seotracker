import { ProgressBar, StepProgress } from "@/client/components/ProgressBar";
import { estimateRemainingMs } from "@/client/features/audit/launch/progressEstimate";
import { useQuery } from "@tanstack/react-query";
import {
  HttpStatusBadge,
  extractPathname,
} from "@/client/features/audit/shared";
import {
  formatCount,
  formatDateTime,
  formatDuration,
} from "@/client/lib/format";
import { getCrawlProgress } from "@/serverFunctions/audit";
import { t } from "@/shared/i18n";
import { useEffect, useState } from "react";
import { formatElapsed, parseTimestamp } from "@/shared/format";

// Turkish source labels; t() runs where they render.
const PHASE_LABEL: Record<string, string> = {
  discovery: "Sayfa bulma",
  crawling: "Taranıyor",
  lighthouse: "Hız ölçümü",
  finalizing: "Tamamlanıyor",
};

/** Step list for the phases this audit will actually go through. */
function phaseSteps(withLighthouse: boolean) {
  return [
    { key: "discovery", label: t("Sayfa bulma") },
    { key: "crawling", label: t("Tarama") },
    ...(withLighthouse ? [{ key: "lighthouse", label: t("Hız ölçümü") }] : []),
    { key: "finalizing", label: t("Tamamlanıyor") },
  ];
}

export function ProgressCard({
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
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const elapsed = now - parseTimestamp(status.startedAt);
  const crawlProgress =
    status.pagesTotal > 0 ? status.pagesCrawled / status.pagesTotal : 0;
  const lighthouseDone = status.lighthouseCompleted + status.lighthouseFailed;
  const lighthouseProgress =
    status.lighthouseTotal > 0 ? lighthouseDone / status.lighthouseTotal : 0;
  const isLighthousePhase = status.currentPhase === "lighthouse";
  const isFinalizing = status.currentPhase === "finalizing";
  const phaseLabel = status.currentPhase
    ? t(PHASE_LABEL[status.currentPhase] ?? status.currentPhase)
    : t("Çalışıyor");
  const progress = isLighthousePhase ? lighthouseProgress : crawlProgress;
  /** Discovery has not produced a denominator yet. */
  const hasTotal = isLighthousePhase
    ? status.lighthouseTotal > 0
    : status.pagesTotal > 0;

  /*
   * How long it has been running, and roughly how much is left. A
   * five-hundred-page crawl can run for many minutes and the only thing
   * telling the operator whether to wait was a fraction that can sit still
   * for thirty seconds on a slow host. See `estimateRemainingMs` for the
   * 5% gate and the UTC parsing.
   */
  const remainingMs = estimateRemainingMs({
    startedAt: status.startedAt,
    progress,
    hasTotal,
    now,
  });
  const eta =
    remainingMs !== null
      ? t("~{duration} kaldı", { duration: formatDuration(remainingMs) })
      : undefined;

  const showSpeedBar =
    status.lighthouseTotal > 0 &&
    (isLighthousePhase || isFinalizing || lighthouseDone > 0);
  const crawlDone = isLighthousePhase || isFinalizing;
  const steps = phaseSteps(status.lighthouseTotal > 0 || isLighthousePhase);
  const currentStep = steps.findIndex(
    (step) => step.key === status.currentPhase,
  );

  const crawlProgressQuery = useQuery({
    queryKey: ["audit-crawl-progress", projectId, auditId],
    queryFn: () => getCrawlProgress({ data: { projectId, auditId } }),
    // Same cadence as the status poll in the audit route, so one tick of the
    // page drives both instead of two independent timers.
    refetchInterval: 3000,
  });

  const crawledUrls = crawlProgressQuery.data ?? [];

  return (
    <div className="space-y-3">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body gap-3">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex items-center gap-2">
              <span className="dot-live text-primary" aria-hidden />
              {isLighthousePhase
                ? t("Lighthouse kontrolleri çalışıyor")
                : t("Sayfalar taranıyor")}
            </h2>
            <span className="badge badge-ghost badge-sm">{phaseLabel}</span>
          </div>
          {Number.isFinite(elapsed) && (
            <p className="text-xs text-muted">
              {t("Geçen süre: {duration}", {
                duration: formatElapsed(elapsed),
              })}
            </p>
          )}

          <div className="grid items-start gap-4 md:grid-cols-[minmax(0,1fr)_11rem]">
            <div className="space-y-3">
              {/* Indeterminate until there is a total to be a fraction of.
                  During discovery `pagesTotal` is 0, and a determinate bar
                  sat at zero for exactly the phase where the operator is
                  least sure anything is happening. */}
              <ProgressBar
                label={t("Tarama")}
                value={status.pagesCrawled}
                max={Math.max(status.pagesTotal, 1)}
                showCount
                state={crawlDone ? "done" : "running"}
                indeterminate={status.pagesTotal === 0}
                eta={crawlDone ? undefined : eta}
              />
              {showSpeedBar ? (
                <ProgressBar
                  label={t("Hız ölçümü")}
                  value={lighthouseDone}
                  max={status.lighthouseTotal}
                  showCount
                  state={
                    isLighthousePhase
                      ? "running"
                      : status.lighthouseFailed > 0
                        ? "warning"
                        : "done"
                  }
                  eta={isLighthousePhase ? eta : undefined}
                />
              ) : null}
              {status.lighthouseFailed > 0 ? (
                <p className="text-xs text-muted">
                  {t("{count} ölçüm başarısız oldu; kalanlar sürüyor.", {
                    count: status.lighthouseFailed,
                  })}
                </p>
              ) : null}
            </div>
            {currentStep >= 0 ? (
              <StepProgress
                steps={steps.map((step) => step.label)}
                current={currentStep}
              />
            ) : null}
          </div>

          {/* One polite region for the whole run: a screen reader got
              nothing at all for a crawl that takes minutes. */}
          <p className="sr-only" role="status" aria-live="polite">
            {!hasTotal
              ? t("Adresler bulunuyor…")
              : isLighthousePhase
                ? status.lighthouseFailed > 0
                  ? t("{done} / {total} kontrol ({failed} başarısız)", {
                      done: formatCount(lighthouseDone),
                      total: formatCount(status.lighthouseTotal),
                      failed: formatCount(status.lighthouseFailed),
                    })
                  : t("{done} / {total} kontrol", {
                      done: formatCount(lighthouseDone),
                      total: formatCount(status.lighthouseTotal),
                    })
                : t("{done} / {total} sayfa", {
                    done: formatCount(status.pagesCrawled),
                    total: formatCount(status.pagesTotal),
                  })}
            {eta ? `, ${eta}` : ""}
          </p>
        </div>
      </div>

      {crawledUrls.length > 0 && (
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body gap-2 p-4">
            <h3 className="text-sm font-medium text-muted">
              {t("Taranan sayfalar ({count})", {
                count: formatCount(crawledUrls.length),
              })}
            </h3>
            <p className="text-xs text-muted">
              {t("Güncellendi {date}", {
                date: formatDateTime(
                  new Date(crawledUrls[0].crawledAt).toISOString(),
                ),
              })}
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
        index === 0 ? "bg-primary/5 crawl-arrival" : ""
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
