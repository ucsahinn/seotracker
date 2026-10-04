import { z } from "zod";

/**
 * The scratchpad's SQLite schema and its two finalize link queries, kept in a
 * plain module (no `cloudflare:workers` import) so they can be exercised
 * against a real SQLite engine in tests as well as inside the Durable Object.
 */

/**
 * `page_links` holds one row per crawled page — its internal link targets as
 * a JSON array of URL strings — instead of one row per edge. Rows written is
 * the DO SQLite billing unit, and link edges dominate an audit's writes.
 * WITHOUT ROWID keeps the TEXT primary key as the table itself, so a page
 * costs exactly one row written rather than a row plus an autoindex entry.
 *
 * The legacy per-edge `links` table is still declared (without its target
 * index, which nothing queries any more) so an audit that was mid-crawl when
 * the JSON layout shipped can still be finalized from the rows its earlier
 * chunks wrote. Delete the table and the UNION ALL branches in the queries
 * below after 2026-09-10: the 7-day cleanup alarm guarantees every such
 * object is finished or wiped by then.
 */
export const SCRATCHPAD_SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS frontier (
    url TEXT PRIMARY KEY,
    depth INTEGER,
    source TEXT NOT NULL,
    in_sitemap INTEGER NOT NULL DEFAULT 0,
    state TEXT NOT NULL DEFAULT 'pending',
    chunk_no INTEGER
  );
  CREATE INDEX IF NOT EXISTS frontier_claim_idx ON frontier (state, source);
  CREATE TABLE IF NOT EXISTS page_links (
    page_id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    targets_json TEXT NOT NULL
  ) WITHOUT ROWID;
  CREATE TABLE IF NOT EXISTS links (
    source_page_id TEXT NOT NULL,
    source_url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    PRIMARY KEY (source_page_id, target_url)
  );
  CREATE TABLE IF NOT EXISTS page_mirror (
    page_id TEXT PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    status_code INTEGER,
    fetch_class TEXT NOT NULL,
    redirect_url TEXT
  );
  CREATE INDEX IF NOT EXISTS page_mirror_redirect_idx ON page_mirror (redirect_url);
  CREATE TABLE IF NOT EXISTS truncated_links (
    page_id TEXT PRIMARY KEY
  ) WITHOUT ROWID;
  CREATE TABLE IF NOT EXISTS shortest_depth (
    url TEXT PRIMARY KEY,
    depth INTEGER NOT NULL
  ) WITHOUT ROWID;
`;

/**
 * Page rows whose stored link list was cut at the per-page cap. Their dropped
 * targets are unknown, so any conclusion built on an edge being ABSENT
 * (orphan pages, shortest click paths) is unproven while this is non-empty.
 */
export const HAS_TRUNCATED_LINKS_SQL = `SELECT 1 FROM truncated_links LIMIT 1`;

/** URLs reached at the same depth through a redirect (no click). Param: level. */
const REDIRECT_CLOSURE_SQL = `
  INSERT OR IGNORE INTO shortest_depth (url, depth)
  SELECT m.redirect_url, d.depth
  FROM shortest_depth d CROSS JOIN page_mirror m ON m.url = d.url
  WHERE d.depth = ? AND m.redirect_url IS NOT NULL
  RETURNING url
`;

/**
 * URLs one click beyond a level. page_links is the outer loop (one scan per
 * level, probing shortest_depth by primary key) because it has no url index.
 * Params: level + 1, level.
 */
const NEXT_LEVEL_SQL = `
  INSERT OR IGNORE INTO shortest_depth (url, depth)
  SELECT DISTINCT j.value, ?
  FROM page_links p
  CROSS JOIN shortest_depth d ON d.url = p.url AND d.depth = ?
  CROSS JOIN json_each(p.targets_json) j
  RETURNING url
`;

/** A real site is not this many clicks deep; past it the walk reports incomplete. */
const MAX_DEPTH_LEVELS = 100;

const depthRowSchema = z.object({ url: z.string(), depth: z.number() });

/**
 * Shortest click depth of every crawled page, breadth-first over the retained
 * link graph from the start URL. A redirect hop costs no click, matching how
 * the frontier hands out depths. `complete` is false when the walk stopped at
 * MAX_DEPTH_LEVELS rather than running out of new URLs.
 *
 * The frontier cannot do this itself: it only lowers depths for URLs a link
 * rediscovers, and a child of a depth-NULL parent (every sitemap-seeded
 * page) is queued with NULL and never revisited.
 */
export function computeShortestDepths(
  run: (query: string, ...params: Array<string | number>) => unknown[],
  startUrl: string,
): { depths: Array<{ url: string; depth: number }>; complete: boolean } {
  run(`DELETE FROM shortest_depth`);
  run(`INSERT INTO shortest_depth (url, depth) VALUES (?, 0)`, startUrl);
  let complete = false;
  for (let level = 0; level < MAX_DEPTH_LEVELS; level += 1) {
    while (run(REDIRECT_CLOSURE_SQL, level).length > 0) {
      // Redirect chains settle within the level.
    }
    if (run(NEXT_LEVEL_SQL, level + 1, level).length === 0) {
      complete = true;
      break;
    }
  }
  // Only URLs that became page rows: the rest have nothing to repair.
  const depths = run(
    `SELECT d.url AS url, d.depth AS depth
     FROM shortest_depth d CROSS JOIN page_mirror m ON m.url = d.url`,
  ).flatMap((row) => {
    const parsed = depthRowSchema.safeParse(row);
    return parsed.success ? [parsed.data] : [];
  });
  return { depths, complete };
}

/**
 * Every internal link whose target we crawled and saw fail. `json_each`
 * expands a page's target array into one row per edge; the join is on
 * page_mirror's UNIQUE url, so it stays an index seek per link. CROSS JOIN
 * pins that order — left to itself the planner drives page_mirror off
 * `fetch_class` via an automatic index and re-expands the JSON array per
 * candidate, which is quadratic in page count. Takes the issue cap as its
 * only parameter.
 */
export const BROKEN_LINKS_SQL = `
  SELECT source_page_id, source_url, target_url, target_status FROM (
    SELECT p.page_id AS source_page_id, p.url AS source_url, j.value AS target_url,
           m.status_code AS target_status
    FROM page_links p, json_each(p.targets_json) AS j
    CROSS JOIN page_mirror m ON m.url = j.value
    WHERE m.status_code >= 400 AND m.fetch_class = 'ok'
    UNION ALL
    SELECT l.source_page_id, l.source_url, l.target_url, m.status_code AS target_status
    FROM links l JOIN page_mirror m ON m.url = l.target_url
    WHERE m.status_code >= 400 AND m.fetch_class = 'ok'
  )
  ORDER BY source_page_id, target_url
  LIMIT ?
`;

/**
 * Every internal link whose target we crawled and saw redirect.
 *
 * A link is a vote, and a vote cast at a redirect is spent walking: the
 * crawler follows the hop, the reader waits for it, and the strength the
 * link carries arrives diluted. `BROKEN_LINKS_SQL` next door only looks at
 * 4xx and 5xx, so the far more common case -- a site that moved its URLs
 * and left every internal link pointing at the old ones -- was invisible.
 *
 * Same shape and the same CROSS JOIN pinning as the broken-link query, for
 * the same planner reason. Takes the issue cap as its only parameter.
 */
export const REDIRECT_LINKS_SQL = `
  SELECT source_page_id, source_url, target_url, target_status, final_url FROM (
    SELECT p.page_id AS source_page_id, p.url AS source_url, j.value AS target_url,
           m.status_code AS target_status, m.redirect_url AS final_url
    FROM page_links p, json_each(p.targets_json) AS j
    CROSS JOIN page_mirror m ON m.url = j.value
    WHERE m.status_code >= 300 AND m.status_code < 400 AND m.fetch_class = 'ok'
    UNION ALL
    SELECT l.source_page_id, l.source_url, l.target_url,
           m.status_code AS target_status, m.redirect_url AS final_url
    FROM links l JOIN page_mirror m ON m.url = l.target_url
    WHERE m.status_code >= 300 AND m.status_code < 400 AND m.fetch_class = 'ok'
  )
  ORDER BY source_page_id, target_url
  LIMIT ?
`;

/**
 * Pages nothing links to. The inbound set is built once and anti-joined,
 * rather than probed per page: without the old per-edge target index a
 * correlated NOT EXISTS would rescan the whole edge set for every page.
 * Self-links don't count (a page linking to itself doesn't rescue it), and
 * page_id is 1:1 with url in page_mirror, so comparing URLs is the same test
 * the per-edge form made on ids. Takes the start URL as its only parameter.
 */
export const ORPHAN_PAGES_SQL = `
  SELECT m.page_id, m.url FROM page_mirror m
  LEFT JOIN (
    SELECT DISTINCT j.value AS target_url
    FROM page_links p, json_each(p.targets_json) AS j
    WHERE j.value != p.url
    UNION ALL
    SELECT DISTINCT l.target_url
    FROM links l
    WHERE l.target_url != l.source_url
  ) inbound ON inbound.target_url = m.url
  WHERE m.url != ?
    AND m.fetch_class = 'ok'
    AND m.status_code >= 200 AND m.status_code < 300
    AND inbound.target_url IS NULL
    AND NOT EXISTS (
      SELECT 1 FROM page_mirror r WHERE r.redirect_url = m.url
    )
`;

/**
 * A link-discovered URL: new rows are inserted, known rows keep everything
 * but a lowered depth. The CASE matters: SQLite's scalar MIN returns NULL if
 * any argument is NULL, so a rediscovery without a depth would otherwise wipe
 * a depth that is already known.
 */
export const UPSERT_DISCOVERED_SQL = `
  INSERT INTO frontier (url, depth, source, in_sitemap) VALUES (?, ?, 'link', 0)
  ON CONFLICT(url) DO UPDATE SET depth = CASE
    WHEN excluded.depth IS NULL THEN depth
    ELSE MIN(COALESCE(depth, excluded.depth), excluded.depth)
  END`;
