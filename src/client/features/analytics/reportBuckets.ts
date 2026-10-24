import {
  buildShareSegments,
  MAX_BAR_ROWS,
  MAX_RING_SEGMENTS,
  type ReportRow,
  type ShareSegment,
} from "@/client/features/analytics/reportInsights";
import type { Ga4ReportKindName } from "@/shared/ga4-reports";
import { t } from "@/shared/i18n";

/*
 * Titles and units are Turkish source strings, translated by t() in
 * buildSummary: the locale is not known at import time.
 */
type Measure = { field: string; title: string; unit: string };

/** Reports where "how is one total divided" is the question: ring or bars. */
const SHARE_REPORTS: Partial<Record<Ga4ReportKindName, Measure>> = {
  traffic_acquisition: {
    field: "sessions",
    title: "{dimension} bazında oturum payı",
    unit: "oturum",
  },
  audience_breakdown: {
    field: "activeUsers",
    title: "{dimension} bazında kullanıcı payı",
    unit: "kullanıcı",
  },
};

/** Reports that rank items: always bars. The first measure with data wins. */
const RANKED_REPORTS: Partial<
  Record<Ga4ReportKindName, { dimension: string; measures: Measure[] }>
> = {
  landing_pages: {
    dimension: "landingPage",
    measures: [
      {
        field: "sessions",
        title: "Giriş sayfaları, oturuma göre",
        unit: "oturum",
      },
    ],
  },
  page_performance: {
    dimension: "pagePath",
    measures: [
      {
        field: "screenPageViews",
        title: "Sayfalar, görüntülenmeye göre",
        unit: "görüntülenme",
      },
    ],
  },
  key_events: {
    dimension: "eventName",
    measures: [
      {
        field: "keyEvents",
        title: "Olaylar, tetiklenme sayısına göre",
        unit: "anahtar olay",
      },
    ],
  },
  ecommerce_performance: {
    dimension: "itemName",
    measures: [
      { field: "itemRevenue", title: "Ürünler, gelire göre", unit: "gelir" },
      {
        field: "itemsPurchased",
        title: "Ürünler, satış adedine göre",
        unit: "satılan ürün",
      },
      {
        field: "itemsViewed",
        title: "Ürünler, görüntülenmeye göre",
        unit: "ürün görüntüleme",
      },
    ],
  },
  site_search: {
    dimension: "searchTerm",
    measures: [
      {
        field: "eventCount",
        title: "Arama terimleri, arama sayısına göre",
        unit: "arama",
      },
    ],
  },
};

export type SummaryPlan = {
  form: "ring" | "bars";
  title: string;
  /** What the figures count, in the title's own words. */
  unit: string;
  /** The metric the segments measure, so revenue can be shown as money. */
  field: string;
  /** The column the table filters on when a segment is chosen. */
  dimension: string;
  segments: ShareSegment[];
};

/**
 * What a tab's chart shows, or null when there is nothing honest to draw.
 *
 * Fewer than two groups is null: one slice is a full ring that says nothing,
 * and one bar is a number the table already prints. The share reports take
 * their dimension from the report itself, because the acquisition and
 * audience switches change it (channel, source / medium, campaign...).
 */
export function buildSummary(
  kind: Ga4ReportKindName,
  dimensions: readonly string[],
  rows: ReportRow[],
  labelOf: (field: string) => string,
): SummaryPlan | null {
  const share = SHARE_REPORTS[kind];
  const dimension = dimensions[0];
  if (share && dimension) {
    const whole = buildShareSegments(rows, dimension, share.field, Infinity);
    if (whole.length < 2) return null;
    const form = whole.length <= MAX_RING_SEGMENTS ? "ring" : "bars";
    return {
      form,
      title: t(share.title, { dimension: labelOf(dimension) }),
      unit: t(share.unit),
      field: share.field,
      dimension,
      segments: buildShareSegments(
        rows,
        dimension,
        share.field,
        form === "ring" ? MAX_RING_SEGMENTS : MAX_BAR_ROWS,
      ),
    };
  }

  const ranked = RANKED_REPORTS[kind];
  if (!ranked || !dimensions.includes(ranked.dimension)) return null;
  for (const measure of ranked.measures) {
    const segments = buildShareSegments(
      rows,
      ranked.dimension,
      measure.field,
      MAX_BAR_ROWS,
    );
    if (segments.length < 2) continue;
    return {
      form: "bars",
      title: t(measure.title),
      unit: t(measure.unit),
      field: measure.field,
      dimension: ranked.dimension,
      segments,
    };
  }
  return null;
}
