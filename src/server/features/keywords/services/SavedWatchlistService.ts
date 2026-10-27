import { groupSavedDailyObservations } from "@/shared/savedWatchlistDaily";
import { sort } from "remeda";
import type { SavedObservation } from "@/shared/savedWatchlist";
import { getSavedKeywords } from "./research/saved-keywords";
import { GscHistoryRepository } from "@/server/features/gsc/repositories/GscHistoryRepository";
import { GscHistoryService } from "@/server/features/gsc/services/GscHistoryService";
import { SavedArchiveRepository } from "../repositories/SavedArchiveRepository";
import {
  gscHistoryWindow,
  isoDaysInclusive,
  GSC_TIME_ZONE,
} from "@/shared/dataFreshness";
import { previousWindow } from "@/shared/rankingChange";
import {
  groupSavedObservations,
  savedMatchKey,
  savedWatchlistView,
  type SavedWatchlistInput,
} from "@/shared/savedWatchlist";
import type { SavedKeywordRow } from "@/types/keywords";

/** Same bounded paired raw aggregates as Rankings; Saved groups them without changing stored identities. */
export async function readSavedWatchlist(input: SavedWatchlistInput) {
  const range =
    input.startDate && input.endDate
      ? { startDate: input.startDate, endDate: input.endDate }
      : gscHistoryWindow(input.days);
  const requestedDays = isoDaysInclusive(range.startDate, range.endDate);
  if (
    requestedDays !== input.days ||
    range.endDate > gscHistoryWindow(1).endDate
  )
    throw new Error("Invalid saved archive window");
  const previous = previousWindow(range.startDate, requestedDays);
  const saved: SavedKeywordRow[] = [];
  let tags: Awaited<ReturnType<typeof getSavedKeywords>>["tags"] = [];
  for (let page = 1; ; page++) {
    const batch = await getSavedKeywords({
      ...input,
      sort: "createdAt",
      order: "desc",
      page,
      pageSize: 250,
    });
    saved.push(...batch.rows);
    tags = batch.tags;
    if (batch.rows.length < 250) break;
  }
  const keys = new Set(saved.map((row) => savedMatchKey(row.keyword)));
  const loadPeriod = async (since: string, until: string) => {
    const [raw, coverage] = await Promise.all([
      GscHistoryRepository.getTrackedQueries({
        projectId: input.projectId,
        since,
        until,
      }),
      GscHistoryRepository.getCoverage({
        projectId: input.projectId,
        since,
        until,
      }),
    ]);
    const matching = raw.filter((row) => keys.has(savedMatchKey(row.query)));
    const dates = await SavedArchiveRepository.observationDates(
      input.projectId,
      matching.map((r) => r.query),
      since,
      until,
    );
    return {
      groups: groupSavedObservations(
        matching.map((row) => ({ ...row, dates: dates.get(row.query) ?? [] })),
      ),
      coverage,
      observedDates: sort([...new Set([...dates.values()].flat())], (a, b) =>
        a.localeCompare(b),
      ),
    };
  };
  const [now, before, status, property] = await Promise.allSettled([
    loadPeriod(range.startDate, range.endDate),
    loadPeriod(previous.since, previous.until),
    GscHistoryService.getStatus(input.projectId),
    GscHistoryRepository.getProperty(input.projectId),
  ]);
  const coverage = now.status === "fulfilled" ? now.value.coverage : [];
  const previousCoverage =
    before.status === "fulfilled" ? before.value.coverage : [];
  const complete =
    now.status === "fulfilled" &&
    coverage.filter((d) => d.status === "complete-response").length ===
      requestedDays;
  const available = now.status === "fulfilled";
  const view = savedWatchlistView(
    saved,
    available ? now.value.groups : new Map<string, SavedObservation>(),
    before.status === "fulfilled"
      ? before.value.groups
      : new Map<string, SavedObservation>(),
    input,
    {
      archiveAvailable: available,
      coverageComplete: complete,
      comparisonAvailable: before.status === "fulfilled",
    },
  );
  const metadata = {
    filters: {
      includeTerms: input.includeTerms ?? [],
      excludeTerms: input.excludeTerms ?? [],
      tagIds: input.tagIds ?? [],
      band: input.band ?? null,
      fallers: input.fallers,
      sort: input.sort,
      order: input.order,
    },
    range,
    previousRange: { startDate: previous.since, endDate: previous.until },
    timeZone: GSC_TIME_ZONE,
    requestedDays,
    coverage: {
      complete: coverage.filter((d) => d.status === "complete-response").length,
      limited: coverage.filter((d) => d.status === "own-cap-limited").length,
      failed: coverage.filter((d) => d.status === "failed").length,
      unknown: requestedDays - coverage.length,
    },
    previousCoverage: {
      complete: previousCoverage.filter((d) => d.status === "complete-response")
        .length,
      unknown: requestedDays - previousCoverage.length,
    },
    observedDates: now.status === "fulfilled" ? now.value.observedDates : [],
    previousObservedDates:
      before.status === "fulfilled" ? before.value.observedDates : [],
    archiveError: !available,
    previousError: before.status === "rejected",
    statusError: status.status === "rejected",
    connectionError: property.status === "rejected",
    siteUrl: property.status === "fulfilled" ? property.value : null,
    status: status.status === "fulfilled" ? status.value : null,
    lookupTruncated: false,
    scope:
      "Google Web; all countries and devices; Turkish case and compact-whitespace groups",
  };
  // Export pages pin the full resolved base, archive and status, not the response timestamp or page number.
  const payload = JSON.stringify({
    saved,
    current: now.status === "fulfilled" ? [...now.value.groups] : null,
    previous: before.status === "fulfilled" ? [...before.value.groups] : null,
    metadata,
  });
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(payload),
  );
  const snapshot = Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
  if (input.expectedSnapshot && input.expectedSnapshot !== snapshot)
    throw new Error("SAVED_SNAPSHOT_CHANGED");
  return {
    ...view,
    tags,
    ...metadata,
    snapshot,
    page: input.page,
    pageSize: input.pageSize,
  };
}
export type SavedWatchlist = Awaited<ReturnType<typeof readSavedWatchlist>>;

export async function readSavedHistory(
  input: SavedWatchlistInput & { savedId: string },
) {
  const snapshot = await readSavedWatchlist(input);
  const saved = snapshot.rows.find((row) => row.id === input.savedId);
  if (!saved || snapshot.archiveError)
    throw new Error("SAVED_HISTORY_UNAVAILABLE");
  const [daily, coverage] = await Promise.all([
    SavedArchiveRepository.dailyObservations(
      input.projectId,
      saved.observation?.variants ?? [],
      snapshot.range.startDate,
      snapshot.range.endDate,
    ),
    GscHistoryRepository.getCoverage({
      projectId: input.projectId,
      since: snapshot.range.startDate,
      until: snapshot.range.endDate,
    }),
  ]);
  const rows = groupSavedDailyObservations(daily);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const position = impressions
    ? rows.reduce((sum, row) => sum + row.position * row.impressions, 0) /
      impressions
    : null;
  if (
    impressions !== (saved.impressions ?? 0) ||
    rows.length !== (saved.observation?.observedDays ?? 0) ||
    (position !== null &&
      saved.position !== null &&
      Math.abs(position - saved.position) > 1e-8)
  )
    throw new Error("SAVED_SNAPSHOT_CHANGED");
  return {
    rows,
    range: snapshot.range,
    coverage,
  };
}
