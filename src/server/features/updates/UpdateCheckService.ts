/**
 * Whether a newer seotracker has been released.
 *
 * The operator updates this install by pulling the repo and rebuilding, so
 * there is nothing to download and nothing to install — the only useful thing
 * the app can do is notice, and say which command to run. That makes the whole
 * feature decoration: every failure here resolves to "show nothing" or "could
 * not check", never to an error on the Settings page.
 *
 * GitHub allows an anonymous caller 60 requests an hour, counted against the
 * operator's public IP and shared with everything else on their network. One
 * check a day is 0.07% of that. The conditional request carries the stored
 * ETag, which saves the body but *not* the quota — GitHub only exempts
 * conditional requests that are authorized, and this one deliberately is not.
 */
import { z } from "zod";
import { UpdateCheckRepository } from "@/server/features/updates/UpdateCheckRepository";
import { version as currentVersion } from "../../../../package.json";
import { isNewerVersion } from "@/shared/version";

const RELEASES_URL =
  "https://api.github.com/repos/ucsahinn/seotracker/releases/latest";
const REPO_RELEASES_PAGE = "https://github.com/ucsahinn/seotracker/releases";

/** A day. Finer granularity buys nothing for a tool updated by hand. */
const TTL_MS = 24 * 60 * 60 * 1000;
/** After a failure, wait before spending another request. */
const RETRY_AFTER_FAILURE_MS = 6 * 60 * 60 * 1000;
/** GitHub terminates its own requests at ten seconds; do not wait that long. */
const TIMEOUT_MS = 5_000;

const releaseSchema = z.object({
  tag_name: z.string().min(1),
  html_url: z.string().url(),
  published_at: z.string().nullable().optional(),
});

type UpdateStatus = {
  currentVersion: string;
  enabled: boolean;
  /** null until a check has succeeded, or when the repo has no releases. */
  latestVersion: string | null;
  releaseUrl: string;
  publishedAt: string | null;
  updateAvailable: boolean;
  checkedAt: string | null;
  /**
   * Why there is nothing to show, when there is nothing to show. `ok` covers
   * both "up to date" and "an update exists".
   */
  outcome: "ok" | "disabled" | "never_checked" | "no_releases" | "unreachable";
};

function statusFrom(row: {
  enabled: boolean;
  checkedAt: string | null;
  latestTag: string | null;
  releaseUrl: string | null;
  publishedAt: string | null;
  lastStatus: number | null;
}): UpdateStatus {
  const latestVersion = row.latestTag;
  const outcome: UpdateStatus["outcome"] = !row.enabled
    ? "disabled"
    : !row.checkedAt
      ? "never_checked"
      : row.lastStatus === 404
        ? "no_releases"
        : latestVersion
          ? "ok"
          : "unreachable";

  return {
    currentVersion,
    enabled: row.enabled,
    latestVersion,
    releaseUrl: row.releaseUrl ?? REPO_RELEASES_PAGE,
    publishedAt: row.publishedAt,
    updateAvailable: Boolean(
      latestVersion && isNewerVersion(currentVersion, latestVersion),
    ),
    checkedAt: row.checkedAt,
    outcome,
  };
}

function isDue(checkedAt: string | null, lastStatus: number | null): boolean {
  if (!checkedAt) return true;
  const age = Date.now() - Date.parse(checkedAt);
  if (Number.isNaN(age)) return true;
  // A failed attempt still counts as an attempt; backing off is what keeps a
  // rate-limited or offline install from spending the rest of its window.
  const wait =
    lastStatus === 200 || lastStatus === 304 ? TTL_MS : RETRY_AFTER_FAILURE_MS;
  return age > wait;
}

async function fetchLatest(etag: string | null) {
  const response = await fetch(RELEASES_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      // GitHub rejects a request with no User-Agent outright, and the runtime
      // does not supply one.
      "User-Agent": `seotracker/${currentVersion}`,
      ...(etag ? { "If-None-Match": etag } : {}),
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (response.status === 304) {
    return { status: 304 as const, release: null, etag };
  }
  if (!response.ok) {
    // 404 is the ordinary answer for a repo that has published no releases
    // yet, not a fault. 403/429 is the rate limit. Both are recorded so the
    // UI can say which.
    return { status: response.status, release: null, etag: null };
  }

  const parsed = releaseSchema.safeParse(await response.json());
  return {
    status: 200 as const,
    release: parsed.success ? parsed.data : null,
    etag: response.headers.get("etag"),
  };
}

/** The cached answer, refreshing first if it is stale and checking is on. */
async function getStatus(options?: { force?: boolean }): Promise<UpdateStatus> {
  const row = await UpdateCheckRepository.get();
  if (!row.enabled) return statusFrom(row);
  if (!options?.force && !isDue(row.checkedAt, row.lastStatus)) {
    return statusFrom(row);
  }

  const checkedAt = new Date().toISOString();
  try {
    const result = await fetchLatest(row.etag);
    if (result.status === 304) {
      return statusFrom(
        await UpdateCheckRepository.save({ checkedAt, lastStatus: 304 }),
      );
    }
    if (result.release) {
      return statusFrom(
        await UpdateCheckRepository.save({
          checkedAt,
          lastStatus: 200,
          etag: result.etag,
          latestTag: result.release.tag_name,
          releaseUrl: result.release.html_url,
          publishedAt: result.release.published_at ?? null,
        }),
      );
    }
    return statusFrom(
      await UpdateCheckRepository.save({
        checkedAt,
        lastStatus: result.status,
      }),
    );
  } catch {
    // Offline, DNS failure, timeout. Recorded as an attempt so the backoff
    // applies; the operator sees "could not check", not a broken page.
    return statusFrom(
      await UpdateCheckRepository.save({ checkedAt, lastStatus: 0 }),
    );
  }
}

async function setEnabled(enabled: boolean): Promise<UpdateStatus> {
  return statusFrom(await UpdateCheckRepository.save({ enabled }));
}

export const UpdateCheckService = { getStatus, setEnabled };
