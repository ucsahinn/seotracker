/**
 * Comparing two release numbers, and nothing more.
 *
 * Not the `semver` package: the full grammar — ranges, carets, build
 * metadata, prerelease precedence — answers questions this app never asks.
 * The inputs are this fork's own tags against its own `package.json`, both
 * plain `x.y.z`, and GitHub's "latest release" endpoint already excludes
 * prereleases. That leaves a parse and three numeric comparisons.
 *
 * Anything that does not parse returns `null` rather than a guess. A tag like
 * `nightly` or `v1.0.0-rc.1` must make the UI say nothing, not claim the
 * operator is out of date.
 */
const VERSION = /^v?(\d+)\.(\d+)\.(\d+)$/;
const RETIRED_VERSIONS = new Set([
  "2.0.0",
  "2.1.0",
  "2.2.0",
  "2.2.1",
  "2.3.0",
  "2.4.3",
  "2.5.0",
]);

type VersionOrder = -1 | 0 | 1 | null;

function parse(value: string): [number, number, number] | null {
  const match = VERSION.exec(value.trim());
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

/**
 * -1 when `a` is older than `b`, 0 when equal, 1 when newer.
 * `null` when either side is not a plain release number.
 */
export function compareVersions(a: string, b: string): VersionOrder {
  const left = parse(a);
  const right = parse(b);
  if (!left || !right) return null;

  for (let index = 0; index < 3; index += 1) {
    const l = left[index] ?? 0;
    const r = right[index] ?? 0;
    if (l !== r) return l < r ? -1 : 1;
  }
  return 0;
}

/**
 * Whether `latest` is worth telling the operator about.
 *
 * False when it cannot be compared, and false when the operator is *ahead* of
 * the published tag — which happens constantly while developing against the
 * repo, and nagging then would train them to ignore the notice.
 */
export function isNewerVersion(current: string, latest: string): boolean {
  const order = compareVersions(current, latest);
  if (order === null) return false;

  const currentRelease = current.trim().replace(/^v/, "");
  const latestRelease = latest.trim().replace(/^v/, "");

  // The 0.x line intentionally resets numbering. Offer its releases to known
  // 2.x installs even though ordinary numeric ordering calls them lower.
  if (RETIRED_VERSIONS.has(currentRelease) && latestRelease.startsWith("0."))
    return true;

  // Never offer a retired 2.x tag as an update to an Alpha installation.
  if (currentRelease.startsWith("0.") && RETIRED_VERSIONS.has(latestRelease))
    return false;

  return order === -1;
}
