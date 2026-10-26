/**
 * The opt-in external checks, after the crawl and before finalize (which
 * destroys the scratchpad the targets live in): outgoing links that no
 * longer resolve, and the site's own image files over 200 KB.
 *
 * Bounded: at most 300 URLs per audit (links first, up to 200), checked in
 * 40-URL steps, 4 requests at a time. Each step returns only the answers,
 * so a retried or replayed step re-asks nothing that already finished.
 */
import type { WorkflowStep } from "cloudflare:workers";
import { getAuditScratchpad } from "@/server/features/audit/AuditScratchpad";
import { AuditRepository } from "@/server/features/audit/repositories/AuditRepository";
import { AuditSiteFactsRepository } from "@/server/features/audit/repositories/AuditSiteFactsRepository";
import {
  checkExternalLink,
  mapWithConcurrency,
  measureImage,
  type HostCache,
  type ImageMeasure,
  type LinkVerdict,
} from "@/server/lib/audit/external-checks";
import {
  brokenLinkFindings,
  externalMeasured,
  LARGE_IMAGE_BYTES,
  largeImageFindings,
} from "@/server/lib/audit/issues/external-findings";
import type { AuditConfig } from "@/server/lib/audit/types";
import {
  DB_STEP,
  EXTERNAL_CHECK_STEP,
} from "@/server/workflows/auditStepConfigs";

const MAX_LINKS = 200;
const MAX_URLS = 300;
const CHUNK_SIZE = 40;
const CONCURRENCY = 4;
/** Linking pages named per broken target. */
const SOURCES_PER_TARGET = 20;

function chunks<T>(items: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    out.push(items.slice(i, i + CHUNK_SIZE));
  }
  return out;
}

export async function runExternalChecksPhase(
  step: WorkflowStep,
  input: { auditId: string; config: AuditConfig },
): Promise<void> {
  if (input.config.externalChecks !== true) return;
  const { auditId } = input;

  const targets = await step.do("external-targets", DB_STEP, async () => {
    const scratchpad = getAuditScratchpad(auditId);
    const links = await scratchpad.listExternalTargets("link", MAX_LINKS);
    const images = await scratchpad.listExternalTargets(
      "image",
      MAX_URLS - links.length,
    );
    return { links, images };
  });

  const verdicts: LinkVerdict[] = [];
  for (const [index, chunk] of chunks(targets.links).entries()) {
    verdicts.push(
      ...(await step.do(`external-links-${index}`, EXTERNAL_CHECK_STEP, () => {
        const cache: HostCache = new Map();
        return mapWithConcurrency(chunk, CONCURRENCY, (url) =>
          checkExternalLink(url, cache),
        );
      })),
    );
  }

  const measures: ImageMeasure[] = [];
  for (const [index, chunk] of chunks(targets.images).entries()) {
    measures.push(
      ...(await step.do(`external-images-${index}`, EXTERNAL_CHECK_STEP, () => {
        const cache: HostCache = new Map();
        return mapWithConcurrency(chunk, CONCURRENCY, (url) =>
          measureImage(url, cache),
        );
      })),
    );
  }

  await step.do("external-findings", DB_STEP, async () => {
    const scratchpad = getAuditScratchpad(auditId);
    const broken = verdicts
      .filter((verdict) => verdict.state === "broken")
      .map((verdict) => verdict.url);
    const heavy = measures
      .filter((measure) => (measure.bytes ?? 0) > LARGE_IMAGE_BYTES)
      .map((measure) => measure.url);
    const issues = [
      ...brokenLinkFindings(
        verdicts,
        await scratchpad.externalSources("link", broken, SOURCES_PER_TARGET),
      ),
      ...largeImageFindings(
        measures,
        await scratchpad.externalSources("image", heavy, SOURCES_PER_TARGET),
      ),
    ];
    await AuditRepository.insertIssues(auditId, issues);

    const measured: string[] = [];
    if (
      externalMeasured(
        targets.links.length,
        verdicts.filter((verdict) => verdict.state !== "unknown").length,
      )
    ) {
      measured.push("broken-external-link");
    }
    if (
      externalMeasured(
        targets.images.length,
        measures.filter((measure) => measure.bytes !== null).length,
      )
    ) {
      measured.push("image-file-too-large");
    }
    await AuditSiteFactsRepository.recordMeasuredChecks(auditId, measured);
    return { issueCount: issues.length };
  });
}
