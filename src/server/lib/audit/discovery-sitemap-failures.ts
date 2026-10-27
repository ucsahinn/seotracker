/**
 * Which sitemap documents yielded nothing, and why.
 *
 * Discovery used to count them ("fetched=3, failed=1") without naming them,
 * so neither the log nor the audit could say which file failed, or whether
 * it was only the /sitemap.xml guess answering 404 on a site that keeps its
 * sitemap elsewhere.
 */

import { normalizeUrl } from "./url-utils";

/**
 * An HTTP error, no answer (timeout or a dropped connection, after the
 * retry), a redirect off the site, a body that is not sitemap XML, or valid
 * XML that lists nothing.
 */
export type SitemapFailureReason =
  | "status"
  | "timeout"
  | "network"
  | "off_site"
  | "not_xml"
  | "empty";

export type SitemapFailure = {
  url: string;
  reason: SitemapFailureReason;
  statusCode?: number;
};

/** The empty read of a document that failed for `failure`. */
export function sitemapFailure(
  failure: SitemapFailureReason,
  failureStatus?: number,
) {
  return {
    nestedSitemaps: [] as string[],
    pageUrls: [] as string[],
    timedOut: failure === "timeout",
    failure,
    ...(failureStatus === undefined ? {} : { failureStatus }),
  };
}

/**
 * The finding for a document that gave no entries, or null when it is not
 * one: an oversized document is reported on its own, and the unnamed
 * /sitemap.xml guess answering 404/410 only means the sitemap lives elsewhere.
 */
export function failedSitemapEntry(
  url: string,
  result: {
    tooLarge?: boolean;
    failure?: SitemapFailureReason;
    failureStatus?: number;
  },
  origin: string,
  /** Sitemap lines in robots.txt. */
  namedInRobots: string[],
): SitemapFailure | null {
  if (result.tooLarge) return null;
  const named = namedInRobots.some(
    (listed) => normalizeUrl(listed, origin) === url,
  );
  const unnamedGuess =
    !named &&
    url === normalizeUrl(`${origin}/sitemap.xml`) &&
    result.failure === "status" &&
    (result.failureStatus === 404 || result.failureStatus === 410);
  if (unnamedGuess) return null;
  return {
    url,
    reason: result.failure ?? "empty",
    ...(result.failureStatus === undefined
      ? {}
      : { statusCode: result.failureStatus }),
  };
}

/** For the log line: each failed document by name, with its reason. */
export function describeFailedSitemaps(failures: SitemapFailure[]): string {
  if (failures.length === 0) {
    return "only the unnamed /sitemap.xml guess (404/410) or an oversized document";
  }
  return failures
    .map(
      (doc) =>
        `${doc.url} (${doc.reason}${doc.statusCode ? ` ${doc.statusCode}` : ""})`,
    )
    .join(", ");
}
