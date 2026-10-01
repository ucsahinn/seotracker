import { describe, expect, it } from "vitest";
import {
  filterCounts,
  kindLabel,
  kindSegments,
  latestUpdate,
  reportKind,
  OTHER_KIND,
} from "@/client/features/reports/reportStats";

const NOW = Date.parse("2026-09-30T12:00:00Z");
const make = (
  templateName: string | null,
  skill: string | null,
  updatedAt = "2026-09-29T12:00:00Z",
) => ({ templateName, skill, updatedAt, sizeBytes: 10 });

describe("report stats", () => {
  it("names the kind by template, then skill, then a fallback", () => {
    expect(reportKind(make("Aylık", "seo-audit"))).toBe("Aylık");
    expect(reportKind(make(null, "seo-audit"))).toBe("seo-audit");
    expect(reportKind(make(null, null))).toBe(OTHER_KIND);
  });

  it("says a known skill in Turkish and leaves any other kind as written", () => {
    expect(kindLabel("seo-audit")).toBe("SEO denetimi");
    expect(kindLabel("Aylık")).toBe("Aylık");
  });

  it("counts each quick filter, with skill meaning skill-only", () => {
    const reports = [
      make("Aylık", "seo-audit"),
      make(null, "seo-audit", "2026-08-01T00:00:00Z"),
      make(null, null),
    ];
    expect(filterCounts(reports, NOW)).toEqual({
      all: 3,
      recent: 2,
      template: 1,
      skill: 1,
    });
  });

  it("pools kinds past the limit into one disabled segment", () => {
    const reports = ["a", "b", "c"].map((name) => make(name, null));
    const segments = kindSegments(reports, 2);
    expect(segments.map((s) => s.value)).toEqual([1, 1, 1]);
    expect(segments[2]).toMatchObject({
      label: "Diğer türler",
      disabled: true,
    });
  });

  it("finds the latest update with its report id", () => {
    expect(latestUpdate([])).toBeNull();
    expect(
      latestUpdate([
        { id: "a", updatedAt: "2026-01-01" },
        { id: "b", updatedAt: "2026-02-01" },
      ]),
    ).toEqual({ id: "b", updatedAt: "2026-02-01" });
  });
});
