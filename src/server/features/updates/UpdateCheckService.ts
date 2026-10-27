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
 * check every six hours is a rounding error of that, and keeps this screen
 * within hours of the tray launcher, which asks the same endpoint hourly. The conditional request carries the stored
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

/**
 * Six hours, answered or not. It was a day, and the Settings screen then
 * lagged the tray launcher's hourly check by up to a day after a release.
 */
const TTL_MS = 6 * 60 * 60 * 1000;
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
  /** null until a check has succeeded. */
  latestVersion: string | null;
  releaseUrl: string;
  publishedAt: string | null;
  updateAvailable: boolean;
  /** When GitHub was last asked, whether or not it answered. */
  checkedAt: string | null;
  /** When GitHub last answered usefully: the age of `latestVersion`. */
  lastSuccessAt: string | null;
  /**
   * Why there is nothing to show, when there is nothing to show. `ok` covers
   * both "up to date" and "an update exists". `error` means the last attempt
   * failed but an older answer is cached: `latestVersion` is then only the
   * last known one, as of `lastSuccessAt`.
   */
  outcome:
    | "ok"
    | "error"
    | "disabled"
    | "never_checked"
    // GitHub answered 404: the repository was renamed, removed or made
    // private. It has releases, so this is not "nothing published yet".
    | "source_missing"
    | "unreachable";
};

/** 200 and 304 both confirm the cached answer. */
function isFailedAttempt(lastStatus: number | null): boolean {
  return lastStatus !== null && lastStatus !== 200 && lastStatus !== 304;
}

function statusFrom(row: {
  enabled: boolean;
  checkedAt: string | null;
  lastSuccessAt: string | null;
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
        ? "source_missing"
        : latestVersion
          ? isFailedAttempt(row.lastStatus)
            ? "error"
            : "ok"
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
    lastSuccessAt: row.lastSuccessAt,
    outcome,
  };
}

function isDue(checkedAt: string | null): boolean {
  if (!checkedAt) return true;
  const age = Date.now() - Date.parse(checkedAt);
  // A failed attempt counts as an attempt: the same wait is what keeps a
  // rate-limited or offline install from spending the rest of its window.
  return Number.isNaN(age) || age > TTL_MS;
}

/**
 * A cached "latest" older than the version that is running was written
 * before this install was upgraded, so it says nothing about what is out now.
 * The tray launcher asks the same GitHub endpoint every hour; without this the
 * Settings screen kept showing v0.7.0 as the newest release for up to a day
 * after 0.8.0 was installed and announced.
 */
function predatesThisVersion(latestTag: string | null): boolean {
  return latestTag !== null && isNewerVersion(latestTag, currentVersion);
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
    // 404: the repository is gone or private (it has releases, so it is not
    // "none published yet"). 403/429 is the rate limit. Both are recorded so
    // the UI can say which.
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
  if (
    !options?.force &&
    !isDue(row.checkedAt) &&
    !predatesThisVersion(row.latestTag)
  ) {
    return statusFrom(row);
  }

  const checkedAt = new Date().toISOString();
  try {
    const result = await fetchLatest(row.etag);
    if (result.status === 304) {
      return statusFrom(
        await UpdateCheckRepository.save({
          checkedAt,
          lastSuccessAt: checkedAt,
          lastStatus: 304,
        }),
      );
    }
    if (result.release) {
      return statusFrom(
        await UpdateCheckRepository.save({
          checkedAt,
          lastSuccessAt: checkedAt,
          lastStatus: 200,
          etag: result.etag,
          latestTag: result.release.tag_name,
          releaseUrl: result.release.html_url,
          publishedAt: result.release.published_at ?? null,
        }),
      );
    }
    // A 200 whose body is not a release is a failed attempt (status 0), not a
    // confirmation of the cached tag.
    return statusFrom(
      await UpdateCheckRepository.save({
        checkedAt,
        lastStatus: result.status === 200 ? 0 : result.status,
      }),
    );
  } catch (error) {
    // Offline, DNS failure, timeout. Recorded as an attempt so the backoff
    // applies; the operator sees "could not check", not a broken page. The
    // reason goes to the log, which used to get nothing.
    console.warn(
      `Update check: GitHub could not be reached: ${error instanceof Error ? `${error.name}: ${error.message}` : String(error)}`,
    );
    return statusFrom(
      await UpdateCheckRepository.save({ checkedAt, lastStatus: 0 }),
    );
  }
}

async function setEnabled(enabled: boolean): Promise<UpdateStatus> {
  return statusFrom(await UpdateCheckRepository.save({ enabled }));
}

/**
 * The stored answer as it stands, never asking GitHub: for callers such as
 * the MCP `whoami` that must stay free of network calls.
 */
async function getCachedStatus(): Promise<UpdateStatus> {
  return statusFrom(await UpdateCheckRepository.get());
}

export const UpdateCheckService = { getStatus, getCachedStatus, setEnabled };
