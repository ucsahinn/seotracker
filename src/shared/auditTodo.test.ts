import { describe, expect, it } from "vitest";
import {
  estimateEffort,
  pageKey,
  rankTodos,
  rankWorstPages,
  todoInputs,
  type TodoInput,
} from "./auditTodo";

const todo = (overrides: Partial<TodoInput>): TodoInput => ({
  issueType: "missing-h1",
  severity: "warning",
  points: 5,
  siteLevel: false,
  pageUrls: [],
  savingsMs: 0,
  savingsBytes: 0,
  ...overrides,
});

const savingsRow = (issueType: string, savingsMs: number) => ({
  issueType,
  severity: "warning",
  pageId: "p",
  pageUrl: "https://a.com/",
  detailsJson: JSON.stringify({ lighthouseAudit: "x", savingsMs }),
});

describe("rankTodos", () => {
  it("ranks by score impact alone without Search Console", () => {
    const ranked = rankTodos(
      [todo({ issueType: "small", points: 2 }), todo({ issueType: "big" })],
      null,
    );

    expect(ranked.map((item) => item.issueType)).toEqual(["big", "small"]);
    expect(ranked[0].clicks).toBeNull();
  });

  /*
   * The reason the list joins Search Console: a fix on the page that brings
   * the clicks comes before a slightly bigger one on pages nobody visits.
   */
  it("moves a fix on high-traffic pages ahead of a bigger one on dead pages", () => {
    const traffic = new Map([
      [pageKey("https://a.com/"), { clicks: 90, impressions: 900 }],
      [pageKey("https://a.com/dead"), { clicks: 0, impressions: 10 }],
    ]);

    const ranked = rankTodos(
      [
        todo({
          issueType: "dead",
          points: 6,
          pageUrls: ["https://a.com/dead"],
        }),
        // Written with a trailing slash difference on purpose.
        todo({ issueType: "home", points: 4, pageUrls: ["https://A.com"] }),
      ],
      traffic,
    );

    expect(ranked[0].issueType).toBe("home");
    expect(ranked[0].clicks).toBe(90);
    expect(ranked[0].trafficShare).toBe(1);
  });

  it("breaks a near tie by Lighthouse's estimated savings, read from the rows", () => {
    const inputs = todoInputs(
      [
        savingsRow("cheap", 100),
        savingsRow("costly", 300),
        savingsRow("costly", 900),
      ],
      [
        { issueType: "cheap", points: 2.1 },
        { issueType: "costly", points: 2 },
      ],
    );

    const ranked = rankTodos(
      [...inputs, todo({ issueType: "bigger", points: 4 })],
      null,
    );

    // Savings decide only within the band: a clearly bigger fix stays first.
    expect(ranked.map((item) => item.issueType)).toEqual([
      "bigger",
      "costly",
      "cheap",
    ]);
    expect(ranked[1].savingsMs).toBe(900);
  });

  it("caps the traffic boost at double the points", () => {
    const traffic = new Map([
      [pageKey("https://a.com/"), { clicks: 10, impressions: 100 }],
    ]);

    const [item] = rankTodos(
      [todo({ points: 3, pageUrls: ["https://a.com/"] })],
      traffic,
    );

    expect(item.priority).toBe(6);
  });

  // A site-level fix touches no page in particular; weighing it with all of
  // the site's traffic put a missing llms.txt above a broken earning page.
  it("weighs a site-level fix with a neutral half share", () => {
    const traffic = new Map([
      [pageKey("https://a.com/"), { clicks: 10, impressions: 100 }],
    ]);

    const [item] = rankTodos([todo({ points: 3, siteLevel: true })], traffic);

    expect(item.trafficShare).toBe(0.5);
    expect(item.priority).toBe(4.5);
  });

  it("puts every critical fix before warnings and warnings before infos", () => {
    const ranked = rankTodos(
      [
        todo({ issueType: "info", severity: "info", points: 9 }),
        todo({ issueType: "warning", severity: "warning", points: 8 }),
        todo({ issueType: "critical", severity: "critical", points: 2 }),
      ],
      null,
    );

    expect(ranked.map((item) => item.issueType)).toEqual([
      "critical",
      "warning",
      "info",
    ]);
  });
});

describe("pageKey", () => {
  it("folds scheme, www, trailing slash and query order", () => {
    expect(pageKey("http://www.Example.com/a/?b=2&a=1#top")).toBe(
      pageKey("https://example.com/a?a=1&b=2"),
    );
    expect(pageKey("https://example.com/a")).not.toBe(
      pageKey("https://example.com/b"),
    );
  });
});

describe("estimateEffort", () => {
  it("sizes by scope and by how heavy the fix is", () => {
    const site = { issueType: "missing-hsts", siteLevel: true, pageCount: 0 };

    expect(estimateEffort(site)).toBe("S");
    expect(
      estimateEffort({
        issueType: "missing-h1",
        siteLevel: false,
        pageCount: 80,
      }),
    ).toBe("L");
    expect(
      estimateEffort({
        issueType: "thin-content",
        siteLevel: false,
        pageCount: 1,
      }),
    ).toBe("M");
  });
});

const issue = (
  pageUrl: string,
  issueType: string,
  severity: "critical" | "warning" | "info",
  pageId: string | null = pageUrl,
) => ({ pageUrl, issueType, severity, pageId });

describe("rankWorstPages", () => {
  it("weighs pages by severity and leaves site-level findings out", () => {
    const worst = rankWorstPages(
      [
        issue("/many-infos", "a", "info"),
        issue("/many-infos", "b", "info"),
        issue("/one-critical", "c", "critical"),
        issue("/", "missing-hsts", "warning", null),
      ],
      10,
    );

    expect(worst.map((page) => page.url)).toEqual([
      "/one-critical",
      "/many-infos",
    ]);
  });
});
