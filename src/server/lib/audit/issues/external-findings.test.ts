import { describe, expect, it } from "vitest";
import {
  brokenLinkFindings,
  externalMeasured,
  largeImageFindings,
} from "./external-findings";

const source = (target: string, pageId = "p1") => ({
  target,
  pageId,
  url: `https://example.com/${pageId}`,
});

describe("brokenLinkFindings", () => {
  it("reports each page linking to a broken target, nothing for the rest", () => {
    const issues = brokenLinkFindings(
      [
        {
          url: "https://a.example/",
          state: "broken",
          status: 404,
          reason: "http",
        },
        { url: "https://b.example/", state: "ok", status: 200, reason: null },
        {
          url: "https://c.example/",
          state: "unknown",
          status: 403,
          reason: null,
        },
      ],
      [
        source("https://a.example/"),
        source("https://a.example/", "p2"),
        source("https://b.example/"),
        source("https://c.example/"),
      ],
    );
    expect(issues.map((issue) => [issue.issueType, issue.pageId])).toEqual([
      ["broken-external-link", "p1"],
      ["broken-external-link", "p2"],
    ]);
  });
});

describe("largeImageFindings", () => {
  it("reports a page with an image over 200 KB, not one at 150 KB", () => {
    const issues = largeImageFindings(
      [
        { url: "https://example.com/big.jpg", bytes: 640_000, atLeast: false },
        { url: "https://example.com/ok.jpg", bytes: 150_000, atLeast: false },
        { url: "https://example.com/unknown.jpg", bytes: null, atLeast: false },
      ],
      [
        source("https://example.com/big.jpg"),
        source("https://example.com/ok.jpg", "p2"),
        source("https://example.com/unknown.jpg", "p3"),
      ],
    );
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({
      issueType: "image-file-too-large",
      pageId: "p1",
      details: { count: 1, over500Kb: 1 },
    });
  });
});

describe("externalMeasured", () => {
  it("is measured with nothing to check or one definite answer, not when all were unknown", () => {
    expect(externalMeasured(0, 0)).toBe(true);
    expect(externalMeasured(10, 1)).toBe(true);
    expect(externalMeasured(10, 0)).toBe(false);
  });
});
