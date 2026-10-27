/**
 * Google's announced ranking updates, for marking on the search trend.
 *
 * Copied from the Google Search Status Dashboard's ranking history
 * (status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history), read on
 * 2026-10-26. The dashboard gives a start and a duration in US/Pacific; the
 * end here is start + duration, so it can be a day off. Unnamed "ranking
 * ongoing issue" incidents are left out. Kept locally because no API serves
 * it; a new update needs a new line here.
 *
 * Names stay in English: they are Google's names for the events, and the
 * same words are what an operator will search for.
 */
type GoogleSearchUpdate = {
  name: string;
  kind: "core" | "spam" | "helpfulContent" | "reviews" | "discover";
  startDate: string;
  endDate: string;
};

const GOOGLE_SEARCH_UPDATES: readonly GoogleSearchUpdate[] = [
  {
    name: "September 2026 spam update",
    kind: "spam",
    startDate: "2026-09-24",
    endDate: "2026-10-07",
  },
  {
    name: "August 2026 spam update",
    kind: "spam",
    startDate: "2026-08-18",
    endDate: "2026-08-20",
  },
  {
    name: "June 2026 spam update",
    kind: "spam",
    startDate: "2026-06-24",
    endDate: "2026-06-26",
  },
  {
    name: "May 2026 core update",
    kind: "core",
    startDate: "2026-05-21",
    endDate: "2026-06-01",
  },
  {
    name: "March 2026 core update",
    kind: "core",
    startDate: "2026-03-27",
    endDate: "2026-04-08",
  },
  {
    name: "March 2026 spam update",
    kind: "spam",
    startDate: "2026-03-24",
    endDate: "2026-03-24",
  },
  {
    name: "February 2026 Discover update",
    kind: "discover",
    startDate: "2026-02-05",
    endDate: "2026-02-26",
  },
  {
    name: "December 2025 core update",
    kind: "core",
    startDate: "2025-12-11",
    endDate: "2025-12-29",
  },
  {
    name: "August 2025 spam update",
    kind: "spam",
    startDate: "2025-08-26",
    endDate: "2025-09-21",
  },
  {
    name: "June 2025 core update",
    kind: "core",
    startDate: "2025-06-30",
    endDate: "2025-07-16",
  },
  {
    name: "March 2025 core update",
    kind: "core",
    startDate: "2025-03-13",
    endDate: "2025-03-26",
  },
  {
    name: "December 2024 spam update",
    kind: "spam",
    startDate: "2024-12-19",
    endDate: "2024-12-26",
  },
  {
    name: "December 2024 core update",
    kind: "core",
    startDate: "2024-12-12",
    endDate: "2024-12-18",
  },
  {
    name: "November 2024 core update",
    kind: "core",
    startDate: "2024-11-11",
    endDate: "2024-12-04",
  },
  {
    name: "August 2024 core update",
    kind: "core",
    startDate: "2024-08-15",
    endDate: "2024-09-03",
  },
  {
    name: "June 2024 spam update",
    kind: "spam",
    startDate: "2024-06-20",
    endDate: "2024-06-27",
  },
  {
    name: "March 2024 spam update",
    kind: "spam",
    startDate: "2024-03-05",
    endDate: "2024-03-19",
  },
  {
    name: "March 2024 core update",
    kind: "core",
    startDate: "2024-03-05",
    endDate: "2024-04-19",
  },
  {
    name: "November 2023 reviews update",
    kind: "reviews",
    startDate: "2023-11-08",
    endDate: "2023-12-07",
  },
  {
    name: "November 2023 core update",
    kind: "core",
    startDate: "2023-11-02",
    endDate: "2023-11-27",
  },
  {
    name: "October 2023 core update",
    kind: "core",
    startDate: "2023-10-05",
    endDate: "2023-10-18",
  },
  {
    name: "October 2023 spam update",
    kind: "spam",
    startDate: "2023-10-04",
    endDate: "2023-10-19",
  },
  {
    name: "September 2023 helpful content update",
    kind: "helpfulContent",
    startDate: "2023-09-14",
    endDate: "2023-09-27",
  },
  {
    name: "August 2023 core update",
    kind: "core",
    startDate: "2023-08-22",
    endDate: "2023-09-07",
  },
];

/** Updates whose rollout overlaps [startDate, endDate]. */
export function googleUpdatesBetween(
  startDate: string,
  endDate: string,
): GoogleSearchUpdate[] {
  return GOOGLE_SEARCH_UPDATES.filter(
    (update) => update.startDate <= endDate && update.endDate >= startDate,
  );
}
