/**
 * Facts read off robots.txt text: size, a Sitemap line, and which named
 * crawlers may fetch the home page. Deterministic and network-free; the text
 * is the copy discovery already checkpointed.
 */
import robotsParser from "robots-parser";
import { ROBOTS_CHECKED_BOTS, type RobotsFacts } from "./types";

export function readRobotsFacts(
  origin: string,
  fetchResult: { status: number | null; text: string | null },
): RobotsFacts {
  const { status, text } = fetchResult;
  if (text === null) {
    // A 404 is a known answer (no file, no rules); anything else is unknown.
    const missing = status === 404 || status === 410;
    return {
      status,
      bytes: missing ? 0 : null,
      hasSitemapLine: null,
      disallowAll: missing ? false : null,
      googlebotOnlyRules: missing ? [] : null,
      access: [],
    };
  }

  const robots = robotsParser(`${origin}/robots.txt`, text);
  const home = `${origin}/`;
  const access = ROBOTS_CHECKED_BOTS.map((bot) => ({
    bot,
    blocked: robots.isAllowed(home, bot) === false,
  }));
  return {
    status,
    bytes: new TextEncoder().encode(text).byteLength,
    hasSitemapLine: robots.getSitemaps().length > 0,
    disallowAll: access.some(
      (entry) => entry.bot === "Googlebot" && entry.blocked,
    ),
    googlebotOnlyRules: googlebotOnlyRules(origin, text, robots),
    access,
  };
}

/** Bounded: the list crosses a Workflow step boundary. */
const MAX_GOOGLEBOT_ONLY_RULES = 100;

/**
 * The `*` group's Disallow rules that Googlebot is allowed past, judged by
 * the parser itself on a sample path built from each rule (`*` read as one
 * character, a trailing `$` dropped). npr.org closes `/*?*`, `/*.js` and
 * thirty more to everyone and opens all of it to `User-agent: Googlebot`.
 */
function googlebotOnlyRules(
  origin: string,
  text: string,
  robots: ReturnType<typeof robotsParser>,
): string[] {
  let agents: string[] = [];
  let inRules = false;
  let googlebotGroup = false;
  const starDisallows = new Set<string>();
  // A CR left on a CRLF line is whitespace, trimmed off the value below.
  for (const raw of text.split("\n")) {
    const match = /^\s*([a-z-]+)\s*:\s*([^#]*)/i.exec(raw);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "user-agent") {
      if (inRules) agents = [];
      inRules = false;
      agents.push(value.toLowerCase());
      if (value.toLowerCase() === "googlebot") googlebotGroup = true;
    } else if (key === "allow" || key === "disallow") {
      inRules = true;
      if (key === "disallow" && value && agents.includes("*")) {
        starDisallows.add(value);
      }
    }
  }
  // Without a group of its own, Googlebot reads `*` like everyone else.
  if (!googlebotGroup) return [];
  return [...starDisallows]
    .filter((rule) => {
      let path = rule.replace(/\*/g, "x").replace(/\$$/, "");
      // `/a.php?` matches only a URL with a query; an empty one is dropped.
      if (path.endsWith("?")) path += "x";
      const sample = `${origin}${path.startsWith("/") ? path : `/${path}`}`;
      return (
        robots.isAllowed(sample) === false &&
        robots.isAllowed(sample, "Googlebot") !== false
      );
    })
    .slice(0, MAX_GOOGLEBOT_ONLY_RULES);
}
