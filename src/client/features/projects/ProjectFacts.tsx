import { DeltaBadge } from "@/client/components/MetricTile";
import { Sparkline } from "@/client/components/Sparkline";
import { formatDate, formatRelativeTime } from "@/client/lib/format";
import { fractionalChange } from "@/shared/delta";
import { t } from "@/shared/i18n";
import type { getProjectsOverview } from "@/serverFunctions/projects";

type Overview = Awaited<ReturnType<typeof getProjectsOverview>>[number];

function Dot({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span
        aria-hidden
        className={`inline-block size-2 rounded-full ${
          on ? "bg-success" : "border border-[var(--control-border)]"
        }`}
      />
      {label}
      <span className="sr-only">{on ? t("bağlı") : t("bağlı değil")}</span>
    </span>
  );
}

/**
 * The facts a project row carries: clicks over the archive's last 28 days
 * with the change against the 28 before, the last finished audit and which
 * Google sources are connected. The dates are printed, so the window is never
 * a guess.
 */
export function ProjectFacts({ overview }: { overview: Overview | undefined }) {
  if (!overview) return null;
  const { clicks } = overview;
  const change =
    clicks && clicks.previousClicks !== null
      ? fractionalChange(clicks.clicks, clicks.previousClicks)
      : null;
  return (
    <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
      {clicks ? (
        <span className="inline-flex items-center gap-1.5">
          <span
            className="font-medium text-base-content tabular-nums"
            title={t("{start} – {end}", {
              start: formatDate(clicks.startDate),
              end: formatDate(clicks.endDate),
            })}
          >
            {t("{count} tıklama / 28 gün", { count: clicks.clicks })}
          </span>
          <DeltaBadge value={change} title={t("Önceki 28 güne göre")} />
          <span className="block w-16">
            <Sparkline values={clicks.daily} />
          </span>
        </span>
      ) : (
        <span>{t("Arama verisi arşivde yok")}</span>
      )}
      <span>
        {overview.lastAuditAt
          ? t("Son denetim {when}", {
              when: formatRelativeTime(overview.lastAuditAt),
            })
          : t("Henüz denetim yok")}
      </span>
      <Dot on={overview.searchConsole} label="Search Console" />
      <Dot on={overview.analytics} label="Analytics" />
    </span>
  );
}
