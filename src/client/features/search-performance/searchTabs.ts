/**
 * The screen's tabs and view switches, and the URL values older links carry.
 */
export const SEARCH_TABS = [
  "todo",
  "queries",
  "pages",
  "opportunities",
  "changes",
  "overlaps",
  "distribution",
] as const;
export type SearchTab = (typeof SEARCH_TABS)[number];

/* Tab values from before the redesign: links in saved bookmarks and reports. */
const LEGACY_TABS = {
  striking: "opportunities",
  cannibalization: "overlaps",
} as const;

export const ROUTE_TAB_VALUES = [
  ...SEARCH_TABS,
  "striking",
  "cannibalization",
] as const;
type RouteTabValue = (typeof ROUTE_TAB_VALUES)[number];

export function canonicalTab(value: RouteTabValue): SearchTab {
  return value === "striking" || value === "cannibalization"
    ? LEGACY_TABS[value]
    : value;
}

export const COMPARE_MODES = ["previous", "yoy", "none"] as const;
export type CompareMode = (typeof COMPARE_MODES)[number];

export const GRANULARITIES = ["day", "week", "month"] as const;
export type Granularity = (typeof GRANULARITIES)[number];
