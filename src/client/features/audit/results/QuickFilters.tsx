import { EyeOff, ImageOff, Link2Off, Timer, X } from "lucide-react";
import type { PagesFilters } from "@/client/features/audit/results/AuditResultsTableFilterLogic";

/**
 * The four questions an operator arrives with, as one click each. A fifth,
 * "Hatalı", used to sit here too; it wrote the same `status: "error"` as the
 * "Hatalı" bar in PagesSummary, so the bar is the only one now.
 *
 * Every one of these was reachable before — open the filter panel, find the
 * right control among eleven, set it, remember to unset it. That is the
 * right surface for an unusual question and the wrong one for the four that
 * get asked every time: which pages is Google not allowed to index, which
 * are slow, which have images with no alt text, which did the sitemap miss.
 *
 * They write into the same `PagesFilters` the panel does, so a chip and the
 * panel can never disagree about what is filtered — and a chip set here
 * shows as set there.
 */

const SLOW_MS = "1000";

/*
 * `apply` and `matches` as functions rather than a partial object: reading
 * a field back out of a `Partial<PagesFilters>` costs a cast, and a cast in
 * the one place that decides whether a chip looks pressed is the place it
 * would go wrong silently.
 */
type Preset = {
  key: string;
  icon: typeof Timer;
  label: string;
  title: string;
  apply: (filters: PagesFilters) => PagesFilters;
  matches: (filters: PagesFilters) => boolean;
};

const PRESETS: Preset[] = [
  {
    key: "noindex",
    icon: EyeOff,
    label: "Dizine kapalı",
    title: "Google'ın dizine almasına izin verilmeyen sayfalar",
    apply: (filters) => ({ ...filters, indexable: "no" }),
    matches: (filters) => filters.indexable === "no",
  },
  {
    key: "slow",
    icon: Timer,
    label: "Yavaş",
    title: "Sunucu yanıtı 1 saniyeden uzun süren sayfalar",
    apply: (filters) => ({ ...filters, minResponseMs: SLOW_MS }),
    matches: (filters) => filters.minResponseMs === SLOW_MS,
  },
  {
    key: "alt",
    icon: ImageOff,
    label: "Alt metni eksik",
    title: "En az bir görselinde alt metni olmayan sayfalar",
    apply: (filters) => ({ ...filters, missingAlt: "yes" }),
    matches: (filters) => filters.missingAlt === "yes",
  },
  {
    key: "sitemap",
    icon: Link2Off,
    label: "Site haritasında yok",
    title: "Taranan ama site haritasına girmemiş sayfalar",
    apply: (filters) => ({ ...filters, inSitemap: "no" }),
    matches: (filters) => filters.inSitemap === "no",
  },
];

/** The neutral value for every field a preset can set. */
function cleared(filters: PagesFilters): PagesFilters {
  return {
    ...filters,
    indexable: "all",
    inSitemap: "all",
    missingAlt: "all",
    status: "all",
    minResponseMs: "",
  };
}

export function QuickFilters({
  filters,
  onChange,
  counts,
  sitemapFound,
}: {
  filters: PagesFilters;
  onChange: (filters: PagesFilters) => void;
  /** How many pages each preset would show, so a zero can say so. */
  counts: Record<string, number>;
  /**
   * False when no page of the crawl is in a sitemap: the audit found none, so
   * "not in the sitemap" would be every page and say nothing.
   */
  sitemapFound: boolean;
}) {
  const anyActive = PRESETS.some((preset) => preset.matches(filters));

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.filter((preset) => sitemapFound || preset.key !== "sitemap").map(
        (preset) => {
          const active = preset.matches(filters);
          const count = counts[preset.key] ?? 0;
          return (
            <button
              key={preset.key}
              type="button"
              title={preset.title}
              aria-pressed={active}
              // A preset with nothing behind it is a filter to an empty table.
              // Kept visible, because "no slow pages" is itself an answer.
              disabled={count === 0 && !active}
              onClick={() =>
                onChange(
                  active ? cleared(filters) : preset.apply(cleared(filters)),
                )
              }
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-150 disabled:cursor-default disabled:opacity-50 ${
                active
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_0_3px_var(--color-primary)]/10"
                  : "border-[var(--control-border)] enabled:hover:border-primary/50 enabled:hover:bg-primary/5"
              }`}
            >
              <preset.icon aria-hidden className="size-3.5" />
              {preset.label}
              <span className="tabular-nums opacity-70">{count}</span>
            </button>
          );
        },
      )}

      {sitemapFound ? null : (
        <span className="text-xs text-muted">
          "Site haritasında yok" kullanılamıyor: bu denetimde site haritası
          bulunamadı.
        </span>
      )}

      {anyActive ? (
        <button
          type="button"
          onClick={() => onChange(cleared(filters))}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted transition-colors hover:text-base-content"
        >
          <X aria-hidden className="size-3" />
          Temizle
        </button>
      ) : null}
    </div>
  );
}

/** What each preset would show, counted once over the unfiltered set. */
export function quickFilterCounts(
  pages: {
    isIndexable: boolean;
    inSitemap: boolean;
    imagesMissingAlt: number;
    responseTimeMs: number | null;
  }[],
): Record<string, number> {
  return {
    noindex: pages.filter((page) => !page.isIndexable).length,
    slow: pages.filter((page) => (page.responseTimeMs ?? 0) >= Number(SLOW_MS))
      .length,
    alt: pages.filter((page) => page.imagesMissingAlt > 0).length,
    sitemap: pages.filter((page) => !page.inSitemap).length,
  };
}
