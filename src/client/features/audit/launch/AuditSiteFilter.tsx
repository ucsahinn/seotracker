import { formatCount } from "@/client/lib/format";
import { t } from "@/shared/i18n";
import type { AuditSite } from "./auditDelta";

/**
 * Which site's audits the history shows, when one project holds audits of
 * several. "Tümü" keeps every row reachable.
 */
export function AuditSiteFilter({
  sites,
  total,
  selected,
  onSelect,
}: {
  sites: AuditSite[];
  total: number;
  selected: string | null;
  onSelect: (key: string) => void;
}) {
  return (
    <div
      role="group"
      aria-label={t("Site")}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-xs text-muted">
        {t("Bu projede {count} farklı site denetlenmiş:", {
          count: sites.length,
        })}
      </span>
      {[...sites, { key: "all", label: t("Tümü"), count: total }].map(
        (entry) => {
          const active = selected === entry.key;
          return (
            <button
              key={entry.key}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(entry.key)}
              className={`btn btn-sm min-h-11 gap-1.5 rounded-full font-normal sm:min-h-0 ${
                active
                  ? "btn-active"
                  : "btn-ghost border-[var(--control-border)]"
              }`}
            >
              {entry.label}
              <span className="tabular-nums text-muted">
                {formatCount(entry.count)}
              </span>
            </button>
          );
        },
      )}
    </div>
  );
}
