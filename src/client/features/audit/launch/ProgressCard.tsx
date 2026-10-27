import { ProgressBar, StepProgress } from "@/client/components/ProgressBar";
import { estimateRemainingMs } from "@/client/features/audit/launch/progressEstimate";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import {
  HttpStatusBadge,
  extractPathname,
} from "@/client/features/audit/shared";
import {
  formatCount,
  formatDateTime,
  formatPercent,
  formatRemaining,
} from "@/client/lib/format";
import { LIGHTHOUSE_CHECKS_PER_PAGE } from "@/shared/audit-limits";
import { crawlCountLine } from "@/shared/auditStanding";
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

/** Turkish source text: what the current step is doing, in one line. */
const PHASE_NOTE: Record<string, string> = {
  discovery:
    "Site haritası ve ana sayfanın bağlantılarından adresler toplanıyor.",
  crawling:
    "Her sayfa indirilip başlık, içerik, bağlantı ve teknik kontrollerden geçiriliyor.",
  finalizing: "Bulgular puanlanıyor ve sonuçlar hazırlanıyor.",
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
  completed = false,
  issueCount,
}: {
  projectId: string;
  auditId: string;
  /**
   * The moment between the status turning "completed" and the results
   * replacing this card: the bars sit full and the card says what the run
   * found. `issueCount` is undefined until the results have arrived.
   */
  completed?: boolean;
  issueCount?: number;
  status: {
    pagesCrawled: number;
    pagesTotal: number;
    /** Every URL the crawl found so far; null until the first batch lands. */
    urlsDiscovered?: number | null;
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
  const isLighthousePhase = !completed && status.currentPhase === "lighthouse";
  const isFinalizing = !completed && status.currentPhase === "finalizing";
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
      ? t("yaklaşık {duration} kaldı", {
          duration: formatRemaining(remainingMs),
        })
      : undefined;
  const { phaseNote, countText } = describeStep({
    completed,
    isLighthousePhase,
    phase: status.currentPhase,
    lighthouseDone,
    lighthouseTotal: status.lighthouseTotal,
    pagesCrawled: status.pagesCrawled,
    pagesTotal: status.pagesTotal,
  });

  const showSpeedBar =
    status.lighthouseTotal > 0 &&
    (isLighthousePhase || isFinalizing || lighthouseDone > 0);
  const crawlDone = completed || isLighthousePhase || isFinalizing;
  const steps = phaseSteps(status.lighthouseTotal > 0 || isLighthousePhase);
  const currentStep = completed
    ? steps.length
    : steps.findIndex((step) => step.key === status.currentPhase);

  const completionText = completed
    ? completionLine(status.pagesCrawled, issueCount)
    : null;

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
      <div className="rounded-box border border-[var(--hairline)] bg-base-100 shadow-[var(--shadow-raise)]">
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            {completed ? (
              <h2 className="enter font-medium flex items-center gap-2">
                <CheckCircle2
                  className="size-4 text-[var(--ink-success)]"
                  aria-hidden
                />
                {completionText}
              </h2>
            ) : (
              <>
                <h2 className="font-medium flex items-center gap-2">
                  <span className="dot-live text-primary" aria-hidden />
                  {isLighthousePhase
                    ? t("Lighthouse kontrolleri çalışıyor")
                    : t("Sayfalar taranıyor")}
                </h2>
                <span className="badge badge-ghost badge-sm">{phaseLabel}</span>
              </>
            )}
          </div>
          <ProgressHeadline
            completed={completed}
            progress={hasTotal ? Math.min(1, progress) : null}
            countText={countText}
            eta={eta}
          />
          {phaseNote ? (
            <p className="max-w-prose text-sm text-muted">{phaseNote}</p>
          ) : null}
          {Number.isFinite(elapsed) && (
            <p className="text-xs text-subtle">
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
                // At the end the crawl is whole whatever the discovered total
                // said, so the bar reads full rather than stopping at 98%.
                max={
                  completed
                    ? Math.max(status.pagesCrawled, 1)
                    : Math.max(status.pagesTotal, 1)
                }
                showCount
                state={crawlDone ? "done" : "running"}
                indeterminate={!completed && status.pagesTotal === 0}
              />
              <FoundUrlsLine
                pagesCrawled={status.pagesCrawled}
                urlsDiscovered={status.urlsDiscovered}
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
            {completionText ??
              (!hasTotal
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
                    }))}
            {eta && !completed ? `, ${eta}` : ""}
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

/**
 * The bar's total stops at the page limit; this says how much the crawl
 * found beyond it. Nothing until the first batch has been counted.
 */
function FoundUrlsLine(input: {
  pagesCrawled: number;
  urlsDiscovered?: number | null;
}) {
  const line = crawlCountLine(input);
  return line ? <p className="text-xs text-muted">{line}</p> : null;
}

/** The one number the reader came back to look at, with what it counts. */
function ProgressHeadline({
  completed,
  progress,
  countText,
  eta,
}: {
  /** The finished card says what was found instead. */
  completed: boolean;
  /** Null while discovery has no total yet. */
  progress: number | null;
  countText: string;
  eta: string | undefined;
}) {
  if (completed) return null;
  return (
    <div className="flex flex-wrap items-end gap-x-5 gap-y-1">
      <p className="text-4xl font-semibold leading-none tabular-nums">
        {progress === null ? "…" : formatPercent(progress, 0)}
      </p>
      <p className="text-sm tabular-nums text-muted">
        {progress === null ? t("Adresler bulunuyor…") : countText}
        {eta ? (
          <>
            <br />
            {eta}
          </>
        ) : null}
      </p>
    </div>
  );
}

/** The step in one line, and the count that goes with it. */
function describeStep(input: {
  completed: boolean;
  isLighthousePhase: boolean;
  phase: string | null;
  lighthouseDone: number;
  lighthouseTotal: number;
  pagesCrawled: number;
  pagesTotal: number;
}) {
  const speedPages = Math.ceil(
    input.lighthouseTotal / LIGHTHOUSE_CHECKS_PER_PAGE,
  );
  const note = input.phase ? PHASE_NOTE[input.phase] : undefined;
  const phaseNote = input.completed
    ? null
    : input.isLighthousePhase
      ? t(
          "Hız ölçümü: {pages} sayfa × {devices} cihaz, Google PageSpeed ile. Google dakikada sınırlı ölçüme izin verdiği için bu adım en uzunu.",
          {
            pages: formatCount(speedPages),
            devices: LIGHTHOUSE_CHECKS_PER_PAGE,
          },
        )
      : note
        ? t(note)
        : null;
  const countText = input.isLighthousePhase
    ? t("{done} / {total} ölçüm", {
        done: formatCount(input.lighthouseDone),
        total: formatCount(input.lighthouseTotal),
      })
    : t("{done} / {total} sayfa", {
        done: formatCount(input.pagesCrawled),
        total: formatCount(input.pagesTotal),
      });
  return { phaseNote, countText };
}

/** What a finished run found; the issue count is unknown until results load. */
function completionLine(pages: number, issueCount: number | undefined) {
  return issueCount === undefined
    ? t("{count} sayfa tarandı", { count: formatCount(pages) })
    : t("{pages} sayfa tarandı, {issues} bulgu", {
        pages: formatCount(pages),
        issues: formatCount(issueCount),
      });
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
