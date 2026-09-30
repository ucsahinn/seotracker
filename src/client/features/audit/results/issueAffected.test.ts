import { describe, expect, it } from "vitest";
import {
  buildAffectedPages,
  buildCopyText,
  buildCountLabel,
  buildIssueCsv,
  describeDetails,
  filterAffectedPages,
  isSiteWide,
  nextVisibleCount,
} from "./issueAffected";
import { groupIssues, type AuditIssueRow } from "./issueGroups";

let next = 0;
function row(
  issueType: string,
  pageUrl: string,
  over: Partial<AuditIssueRow> = {},
): AuditIssueRow {
  next += 1;
  return {
    id: `r-${next}`,
    auditId: "a",
    pageId: `p-${next}`,
    pageUrl,
    issueType,
    severity: "warning",
    detailsJson: null,
    ...over,
  };
}

describe("describeDetails", () => {
  it("turns evidence into plain Turkish lines", () => {
    const lines = describeDetails(
      JSON.stringify({ length: 82, statusCode: 404, hops: ["a", "b"] }),
    );
    expect(lines).toEqual([
      { label: "Uzunluk (karakter)", value: "82" },
      { label: "Durum kodu", value: "404" },
      { label: "Yönlendirme zinciri", value: "a → b" },
    ]);
  });

  it("returns nothing for empty, broken or non-object details", () => {
    expect(describeDetails(null)).toEqual([]);
    expect(describeDetails("{oops")).toEqual([]);
    expect(describeDetails("[1,2]")).toEqual([]);
  });
});

describe("site-wide issues", () => {
  it("are the ones with no page id, and say so instead of a page count", () => {
    const rows = [
      row("robots-txt-unreachable", "https://x.com/", { pageId: null }),
    ];
    expect(isSiteWide(rows)).toBe(true);
    const [group] = groupIssues(rows);
    expect(group && buildCountLabel(group, true)).toBe("Tüm site");
    expect(isSiteWide([row("missing-title", "https://x.com/a")])).toBe(false);
    expect(isSiteWide([])).toBe(false);
  });
});

describe("count label", () => {
  it("names pages, and records too when they differ", () => {
    const one = groupIssues([row("missing-title", "https://x.com/a")])[0];
    expect(one && buildCountLabel(one, false)).toBe("1 sayfa");
    const many = groupIssues([
      row("broken-page", "https://x.com/a"),
      row("broken-page", "https://x.com/a"),
      row("broken-page", "https://x.com/b"),
    ])[0];
    expect(many && buildCountLabel(many, false)).toBe("2 sayfa · 3 bulgu");
  });
});

describe("affected pages", () => {
  const pages = buildAffectedPages([
    row("title-too-long", "https://x.com/a", {
      detailsJson: JSON.stringify({ length: 90 }),
    }),
    row("title-too-long", "https://x.com/a"),
    row("title-too-long", "https://x.com/Blog"),
  ]);

  it("groups records by page in first-seen order", () => {
    expect(pages.map((page) => page.url)).toEqual([
      "https://x.com/a",
      "https://x.com/Blog",
    ]);
    expect(pages[0]?.records).toHaveLength(2);
  });

  it("filters by address or evidence, ignoring case", () => {
    expect(filterAffectedPages(pages, "blog")).toHaveLength(1);
    expect(filterAffectedPages(pages, "90")).toHaveLength(1);
    expect(filterAffectedPages(pages, "  ")).toHaveLength(2);
    expect(filterAffectedPages(pages, "yok")).toHaveLength(0);
  });
});

describe("paging and copy", () => {
  it("shows ten more at a time and never past the total", () => {
    expect(nextVisibleCount(10, 35)).toBe(20);
    expect(nextVisibleCount(30, 35)).toBe(35);
  });

  it("copies one address per line", () => {
    expect(buildCopyText(["a", "b"])).toBe("a\nb");
  });
});

describe("buildIssueCsv", () => {
  it("has a header and one line per record with readable details", () => {
    const [group] = groupIssues([
      row("title-too-long", "https://x.com/a", {
        detailsJson: JSON.stringify({ length: 90 }),
      }),
    ]);
    const csv = group ? buildIssueCsv(group) : "";
    const lines = csv.split("\n");
    expect(lines[0]).toContain("Adres");
    expect(lines).toHaveLength(2);
    expect(lines[1]).toContain("https://x.com/a");
    expect(lines[1]).toContain("Uzunluk (karakter): 90");
  });
});
