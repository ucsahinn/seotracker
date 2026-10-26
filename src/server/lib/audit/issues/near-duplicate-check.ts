/**
 * Pages whose text is almost, but not exactly, the same.
 *
 * `duplicate-content` groups byte-identical text; two location pages that
 * differ only by a city name never meet there. Their SimHash fingerprints
 * (of the main content: see `page-signals.ts`) differ by a few bits, so
 * pages within NEAR_DUPLICATE_BITS of each other are grouped, among the same
 * candidates (indexable, self-canonical 2xx HTML). A fingerprint is only
 * taken from enough words of main content (`MIN_CONTENT_WORDS`).
 *
 * Grouping is by leader, not by chain: a page joins a group only when it is
 * within the distance of that group's first page. The transitive closure it
 * replaced let A~B~C~D chain pages that share little into one "near
 * duplicate" group. A page whose text is an exact copy of one already in a
 * group is left to `duplicate-content` rather than reported twice.
 *
 * Banded lookup instead of comparing every pair: with a distance of at most
 * 3 across 64 bits, two close fingerprints are identical in at least one of
 * four 16-bit bands (pigeonhole), so a page is compared only with the
 * leaders that share a band value with it.
 */
import type { DetectedIssue } from "@/server/lib/audit/issues/page-reporters";
import {
  DUPLICATE_GROUP_SAMPLE,
  isDuplicateCandidate,
  type SlimPage,
} from "@/server/lib/audit/issues/multipage-checks";
import { simhashDistance } from "@/server/lib/audit/simhash";

const NEAR_DUPLICATE_BITS = 3;
const BANDS = 4;

type Candidate = SlimPage & { contentSimhash: string };

const bandKeys = (hash: string) =>
  Array.from(
    { length: BANDS },
    (_, band) => `${band}:${hash.slice(band * 4, band * 4 + 4)}`,
  );

export function findNearDuplicates(pages: SlimPage[]): DetectedIssue[] {
  const candidates = pages.filter(
    (page): page is Candidate =>
      isDuplicateCandidate(page) && page.contentSimhash !== null,
  );
  const groups: Candidate[][] = [];
  const leadersByBand = new Map<string, Candidate[][]>();

  for (const page of candidates) {
    const keys = bandKeys(page.contentSimhash);
    const seen = new Set<Candidate[]>();
    let home: Candidate[] | null = null;
    let copy = false;
    for (const key of keys) {
      for (const group of leadersByBand.get(key) ?? []) {
        if (seen.has(group)) continue;
        seen.add(group);
        const leader = group[0];
        if (
          simhashDistance(leader.contentSimhash, page.contentSimhash) >
          NEAR_DUPLICATE_BITS
        ) {
          continue;
        }
        if (
          page.contentHash !== null &&
          group.some((member) => member.contentHash === page.contentHash)
        ) {
          copy = true;
          break;
        }
        home = group;
        break;
      }
      if (home || copy) break;
    }
    if (copy) continue;
    if (home) {
      home.push(page);
      continue;
    }
    const group = [page];
    groups.push(group);
    for (const key of keys) {
      const list = leadersByBand.get(key);
      if (list) list.push(group);
      else leadersByBand.set(key, [group]);
    }
  }

  const issues: DetectedIssue[] = [];
  for (const group of groups) {
    if (group.length < 2) continue;
    const sample = group.slice(0, DUPLICATE_GROUP_SAMPLE + 1);
    for (const page of group) {
      issues.push({
        issueType: "near-duplicate-content",
        pageId: page.id,
        pageUrl: page.url,
        details: {
          groupSize: group.length,
          otherUrls: sample
            .filter((other) => other.id !== page.id)
            .slice(0, DUPLICATE_GROUP_SAMPLE)
            .map((other) => other.url),
        },
      });
    }
  }
  return issues;
}
