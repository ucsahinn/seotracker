import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  HttpStatusBadge,
  extractPathname,
} from "@/client/features/audit/shared";
import {
  formatCount,
  formatDateTime,
  formatDuration,
  formatPercent,
} from "@/client/lib/format";
import { getCrawlProgress } from "@/serverFunctions/audit";

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
