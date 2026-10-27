import { expect, it } from "vitest";
import {
  comparePanelAudits,
  type PanelAuditSnapshot,
} from "./panelAuditComparison";

const snapshot = (
  overrides: Partial<PanelAuditSnapshot> = {},
): PanelAuditSnapshot => ({
  startUrl: "https://example.com/",
  completed: true,
  config: { maxPages: 100, lighthouseStrategy: "none", externalChecks: false },
  pages: [{ url: "https://example.com/", fetchClass: "ok" }],
  measuredChecks: ["missing-title"],
  counts: [],
  ...overrides,
});

it("compares only checks measured in both identical crawl scopes, rather than treating missing measurements as fixes", () => {
  const previous = snapshot({
    counts: [{ issueType: "missing-title", severity: "critical", pages: 1 }],
  });
  expect(comparePanelAudits(snapshot(), previous)?.resolvedIssues).toEqual([
    {
      issueType: "missing-title",
      severity: "critical",
      count: 0,
      previousCount: 1,
    },
  ]);
  expect(
    comparePanelAudits(snapshot({ measuredChecks: [] }), previous),
  ).toBeNull();
});

it("withholds changes for narrower, differently configured, failed or unreadable crawls", () => {
  const previous = snapshot();
  for (const current of [
    snapshot({ pages: [] }),
    snapshot({ startUrl: "https://example.com/blog" }),
    snapshot({ config: { ...previous.config, maxPages: 50 } }),
    snapshot({ completed: false }),
    snapshot({
      pages: [{ url: "https://example.com/", fetchClass: "blocked" }],
    }),
  ])
    expect(comparePanelAudits(current, previous)).toBeNull();
});

it("rejects different measured speed URL sets even when the HTML crawl population matches", () => {
  expect(
    comparePanelAudits(
      snapshot({ speedUrls: ["https://example.com/"] }),
      snapshot({ speedUrls: [] }),
    ),
  ).toBeNull();
});
