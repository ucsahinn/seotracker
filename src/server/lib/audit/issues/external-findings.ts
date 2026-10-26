/**
 * The external checks' answers turned into findings, decided from values
 * alone (the requests live in `external-checks.ts`, the workflow step in
 * `siteAuditWorkflowExternal.ts`).
 */
import { sortBy } from "remeda";
import type {
  ImageMeasure,
  LinkVerdict,
} from "@/server/lib/audit/external-checks";
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";

export const LARGE_IMAGE_BYTES = 200 * 1024;
const VERY_LARGE_IMAGE_BYTES = 500 * 1024;
/** Heavy images named per page; the count says how many there are. */
const IMAGES_PER_FINDING = 5;

type ExternalSource = { target: string; pageId: string; url: string };

/**
 * Whether a check can be called measured: nothing to check, or at least
 * one target answered definitively. All-unknown (every host refused, the
 * network down) is not a pass.
 */
export function externalMeasured(targets: number, definitive: number): boolean {
  return targets === 0 || definitive > 0;
}

/** One finding per linking page and broken target. */
export function brokenLinkFindings(
  verdicts: LinkVerdict[],
  sources: ExternalSource[],
): DetectedIssue[] {
  const broken = new Map(
    verdicts
      .filter((verdict) => verdict.state === "broken")
      .map((verdict) => [verdict.url, verdict]),
  );
  return sources.flatMap((source): DetectedIssue[] => {
    const verdict = broken.get(source.target);
    if (!verdict) return [];
    return [
      {
        issueType: "broken-external-link",
        pageId: source.pageId,
        pageUrl: source.url,
        dedupeKey: source.target,
        details: {
          targetUrl: source.target,
          status: verdict.status,
          reason: verdict.reason,
        },
      },
    ];
  });
}

/** One finding per page that shows at least one image over the limit. */
export function largeImageFindings(
  measures: ImageMeasure[],
  sources: ExternalSource[],
): DetectedIssue[] {
  const heavy = new Map(
    measures
      .filter((measure) => (measure.bytes ?? 0) > LARGE_IMAGE_BYTES)
      .map((measure) => [measure.url, measure]),
  );
  const byPage = new Map<string, { url: string; images: ImageMeasure[] }>();
  for (const source of sources) {
    const measure = heavy.get(source.target);
    if (!measure) continue;
    const entry = byPage.get(source.pageId) ?? { url: source.url, images: [] };
    entry.images.push(measure);
    byPage.set(source.pageId, entry);
  }
  return [...byPage].map(([pageId, entry]): DetectedIssue => {
    const images = sortBy(entry.images, [(image) => image.bytes ?? 0, "desc"]);
    return {
      issueType: "image-file-too-large",
      pageId,
      pageUrl: entry.url,
      details: {
        count: images.length,
        over500Kb: images.filter(
          (image) => (image.bytes ?? 0) > VERY_LARGE_IMAGE_BYTES,
        ).length,
        limitBytes: LARGE_IMAGE_BYTES,
        images: images.slice(0, IMAGES_PER_FINDING).map((image) => ({
          url: image.url,
          bytes: image.bytes,
          // The body passed the read cap: the file is at least this big.
          atLeast: image.atLeast,
        })),
      },
    };
  });
}
