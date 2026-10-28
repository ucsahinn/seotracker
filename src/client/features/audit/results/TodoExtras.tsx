import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { formatCount, formatDate } from "@/client/lib/format";
import { extractPathname } from "@/client/features/audit/shared";
import {
  getIssueDescriptor,
  resolveIssueSeverity,
  type IssueSeverity,
} from "@/shared/audit-issues";
import {
  pageKey,
  rankWorstPages,
  type PageTraffic,
  type WorstPage,
} from "@/shared/auditTodo";
import { t } from "@/shared/i18n";
import { SeverityChip, StatusChip } from "./SeverityChip";
import type { AuditInsightsData, AuditResultsData } from "./types";

const WORST_SHOWN = 10;

const titleOf = (issueType: string) => {
  const descriptor = getIssueDescriptor(issueType);
  return descriptor ? t(descriptor.title) : issueType;
};

/** The pages with the most wrong with them, each opening to its problems. */
export function WorstPages({
  issues,
  traffic,
}: {
  issues: AuditResultsData["issues"];
  traffic: Map<string, PageTraffic> | null;
}) {
  const worst = useMemo(
    () =>
      rankWorstPages(
        issues.map((issue) => ({
          issueType: issue.issueType,
          severity: resolveIssueSeverity(issue),
          pageId: issue.pageId,
          pageUrl: issue.pageUrl,
        })),
        WORST_SHOWN,
      ),
    [issues],
  );
  if (worst.length === 0) return null;
  const heaviest = worst[0].weight;

  return (
    <section>
      <h3 className="text-sm font-medium">
        {t("En çok sorunu olan sayfalar")}
      </h3>
      <p className="mb-3 mt-0.5 max-w-prose text-xs text-subtle">
        {t(
          "Çubuk, sayfadaki sorun türlerinin önem ağırlıklı toplamı: bir kritik sorun 40, bir uyarı 15, bir bilgi 3 sayılır. En uzun çubuk en çok iş çıkaran sayfa.",
        )}
      </p>
      <ol className="divide-y divide-[var(--hairline)] rounded-box border border-[var(--hairline)]">
        {worst.map((page) => (
          <WorstPageRow
            key={page.url}
            page={page}
            share={page.weight / heaviest}
            clicks={traffic?.get(pageKey(page.url))?.clicks ?? null}
          />
        ))}
      </ol>
    </section>
  );
}

/* Turkish source text; shown through t(). Lowercase: it follows a number. */
const COUNT_WORD: Record<IssueSeverity, string> = {
  critical: "{count} kritik",
  warning: "{count} uyarı",
  info: "{count} bilgi",
};

/** "5 uyarı" with its severity's shape: the count says the word, not a dot's hue. */
function SeverityCount({
  severity,
  count,
}: {
  severity: IssueSeverity;
  count: number;
}) {
  if (count === 0) return null;
  return (
    <StatusChip tone={severity}>
      {t(COUNT_WORD[severity], { count })}
    </StatusChip>
  );
}

function WorstPageRow({
  page,
  share,
  clicks,
}: {
  page: WorstPage;
  share: number;
  clicks: number | null;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t(
          "{url}: {critical} kritik, {warning} uyarı, {info} bilgi",
          {
            url: page.url,
            critical: page.critical,
            warning: page.warning,
            info: page.info,
          },
        )}
        className="focus-inset grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 px-3 py-2.5 text-left transition-colors hover:bg-base-200/40 sm:px-4"
      >
        <span className="min-w-0 truncate text-sm" title={page.url}>
          {extractPathname(page.url)}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <SeverityCount severity="critical" count={page.critical} />
          <SeverityCount severity="warning" count={page.warning} />
          <SeverityCount severity="info" count={page.info} />
          {clicks !== null ? (
            <span className="tabular-nums text-[var(--data-clicks)]">
              {t("{count} tıklama", { count: formatCount(clicks) })}
            </span>
          ) : null}
          <ChevronRight
            aria-hidden
            className={`size-4 transition-transform ${open ? "rotate-90" : ""}`}
          />
        </span>
        <span className="col-span-2 h-1 overflow-hidden rounded-full bg-[var(--mark-track)]">
          <span
            className="block h-full rounded-full"
            style={{
              width: `${Math.max(4, share * 100)}%`,
              backgroundColor:
                page.critical > 0
                  ? "var(--ink-error)"
                  : page.warning > 0
                    ? "var(--ink-warning)"
                    : "var(--ink-info)",
            }}
          />
        </span>
      </button>
      <div
        className="reveal-height"
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <ul className="space-y-1.5 px-3 pb-3 sm:px-4">
            {page.issueTypes.map((entry) => (
              <li
                key={entry.issueType}
                className="flex items-center gap-2 text-sm"
              >
                <SeverityChip severity={entry.severity} />
                <span className="min-w-0 truncate">
                  {titleOf(entry.issueType)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

type Change = NonNullable<AuditInsightsData["changes"]>["added"][number];

/** What was fixed and what appeared since the previous audit of this site. */
export function AuditChanges({
  insights,
}: {
  insights: AuditInsightsData | undefined;
}) {
  // Nothing to compare on a first audit: no section rather than a
  // paragraph about a section that is not there yet.
  const changes = insights?.changes;
  if (!changes) return null;
  return (
    <section>
      <h3 className="text-sm font-medium">{t("Son denetimden bu yana")}</h3>
      <p className="mb-3 mt-0.5 text-xs text-subtle">
        {t("{date} tarihli denetimle karşılaştırıldı.", {
          date: formatDate(changes.previousStartedAt),
        })}
        {changes.partial
          ? ` ${t("Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.")}`
          : ""}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <ChangeList
          title={t("Düzeltilenler ({count})", {
            count: changes.fixed.length,
          })}
          empty={t("Önceki denetimdeki sorunların hiçbiri tamamen gitmedi.")}
          changes={changes.fixed}
          fixed
        />
        <ChangeList
          title={t("Yeni çıkanlar ({count})", {
            count: changes.added.length,
          })}
          empty={t("Yeni bir sorun türü çıkmadı.")}
          changes={changes.added}
          fixed={false}
        />
      </div>
    </section>
  );
}

function ChangeList({
  title,
  empty,
  changes,
  fixed,
}: {
  title: string;
  empty: string;
  changes: Change[];
  fixed: boolean;
}) {
  const Icon = fixed ? ArrowDownRight : ArrowUpRight;
  return (
    <div className="rounded-box border border-[var(--hairline)] p-4">
      <h4 className="flex items-center gap-1.5 text-sm font-medium">
        <Icon
          aria-hidden
          className="size-4"
          style={{ color: fixed ? "var(--ink-success)" : "var(--ink-error)" }}
        />
        {title}
      </h4>
      {changes.length === 0 ? (
        <p className="mt-2 text-sm text-muted">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {changes.map((change) => (
            <li
              key={change.issueType}
              className="flex items-center gap-2 text-sm"
            >
              <SeverityChip severity={change.severity} />
              <span className="min-w-0 flex-1 truncate">
                {titleOf(change.issueType)}
              </span>
              <span className="shrink-0 text-xs tabular-nums text-subtle">
                {t("{count} sayfa", {
                  count: formatCount(
                    fixed ? change.previousPages : change.pages,
                  ),
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
