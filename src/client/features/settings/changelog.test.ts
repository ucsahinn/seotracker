import { describe, expect, it } from "vitest";
import {
  CHANGELOG_ENTRIES,
  CHANGELOG_ENTRIES_EN,
  CHANGELOG_ENTRIES_BY_LOCALE,
  plainText,
} from "./changelog";

/*
 * These are the customer-facing notes shipped with the app, separate from
 * the fuller repository changelog. The tests protect their structure and
 * keep local setup instructions out of the release screen.
 */
describe("changelog", () => {
  it("reads the releases out of the real file", () => {
    expect(CHANGELOG_ENTRIES.length).toBeGreaterThan(0);
    for (const entry of CHANGELOG_ENTRIES) {
      expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });

  it("keeps a complete English translation aligned with every Turkish release", () => {
    expect(CHANGELOG_ENTRIES_EN).toHaveLength(CHANGELOG_ENTRIES.length);
    for (const [index, entry] of CHANGELOG_ENTRIES.entries()) {
      const english = CHANGELOG_ENTRIES_EN[index];
      expect(english?.version).toBe(entry.version);
      expect(english?.sections.map((section) => section.items.length)).toEqual(
        entry.sections.map((section) => section.items.length),
      );
    }
    expect(
      CHANGELOG_ENTRIES_EN.find((entry) => entry.version === "0.7.0")
        ?.sections[0]?.heading,
    ).toBe("Features");
  });

  it("keeps every release translated and aligned across all six locales", () => {
    for (const locale of ["en", "de", "fr", "it", "pt"] as const) {
      const entries = CHANGELOG_ENTRIES_BY_LOCALE[locale];
      expect(entries).toHaveLength(CHANGELOG_ENTRIES.length);
      for (const [index, entry] of CHANGELOG_ENTRIES.entries()) {
        const translated = entries[index];
        expect(translated?.version, `${locale} ${entry.version}`).toBe(
          entry.version,
        );
        expect(
          translated?.sections.map((section) => section.items.length),
          `${locale} ${entry.version}`,
        ).toEqual(entry.sections.map((section) => section.items.length));
      }
    }
  });

  it("uses the published date and the planned date for the upcoming release", () => {
    for (const locale of ["tr", "en", "de", "fr", "it", "pt"] as const) {
      const entries = CHANGELOG_ENTRIES_BY_LOCALE[locale];
      expect(
        entries.find((entry) => entry.version === "0.7.1")?.date,
        `${locale} v0.7.1`,
      ).toBe("2026-10-26");
      expect(
        entries.find((entry) => entry.version === "0.6.0")?.date,
        `${locale} v0.6.0`,
      ).toBe("2026-10-24");
      expect(
        entries.find((entry) => entry.version === "0.7.0")?.date,
        `${locale} v0.7.0`,
      ).toBe("2026-10-25");
    }
  });

  it("leaves the unreleased section out", () => {
    expect(
      CHANGELOG_ENTRIES.some((entry) => entry.version === "Yayınlanmamış"),
    ).toBe(false);
  });

  it("omits retired setup instructions from customer-facing history", () => {
    const text = CHANGELOG_ENTRIES.flatMap((entry) =>
      entry.sections.flatMap((section) =>
        section.items.map((item) => item.text),
      ),
    ).join("\n");
    expect(text).not.toContain("docker compose exec");
    expect(text).not.toContain(".wrangler/mcp-token");
    expect(CHANGELOG_ENTRIES.some((entry) => entry.version === "0.0.0")).toBe(
      false,
    );
  });

  it("keeps releases newest first", () => {
    const order = CHANGELOG_ENTRIES.map((entry) =>
      entry.version.split(".").map(Number),
    );
    for (let i = 1; i < order.length; i += 1) {
      const [prevMajor, prevMinor, prevPatch] = order[i - 1];
      const [major, minor, patch] = order[i];
      const prev = prevMajor * 1e6 + prevMinor * 1e3 + prevPatch;
      expect(major * 1e6 + minor * 1e3 + patch).toBeLessThan(prev);
    }
  });

  it("carries the bullets under their own heading", () => {
    const newest = CHANGELOG_ENTRIES[0];
    expect(newest.sections.length).toBeGreaterThan(0);
    expect(newest.sections.every((s) => s.items.length > 0)).toBe(true);
  });

  it("keeps each published change in its own readable list item", () => {
    const release = CHANGELOG_ENTRIES.find(
      (entry) => entry.version === "0.6.0",
    );
    expect(release?.sections.map((section) => section.items.length)).toEqual([
      4, 2, 1,
    ]);
    expect(
      release?.sections
        .flatMap((section) => section.items)
        .every((item) => item.text.startsWith("- ")),
    ).toBe(false);
  });

  it("labels the affected screen for the two most recent releases in every locale", () => {
    for (const locale of ["tr", "en", "de", "fr", "it", "pt"] as const) {
      for (const version of ["0.7.1", "0.7.0"]) {
        const release = CHANGELOG_ENTRIES_BY_LOCALE[locale].find(
          (entry) => entry.version === version,
        );
        expect(release, `${locale} v${version}`).toBeDefined();
        expect(
          release?.sections
            .flatMap((section) => section.items)
            .every((item) => item.text.startsWith("**")),
          `${locale} v${version} labels`,
        ).toBe(true);
      }
    }
  });

  /*
   * The notes wrap at 78 characters, so most bullets span several lines. A
   * parser that took only the first line would truncate nearly every entry
   * mid-sentence, which reads as a bug in the app rather than in the parser.
   */
  it("joins a bullet that wraps across lines", () => {
    const wrapped = CHANGELOG_ENTRIES.flatMap((entry) =>
      entry.sections.flatMap((section) => section.items),
    ).filter((item) => item.text.length > 90);
    expect(wrapped.length).toBeGreaterThan(0);
  });

  /*
   * A release note is not always a list. "Önce şunu yapın" is a paragraph
   * and a command, and writing it as a bullet to satisfy the parser would be
   * the tail wagging the dog -- which is exactly what happened: the notes
   * were rewritten in plainer language and the screen silently dropped a
   * whole section because it had no bullets in it.
   */
  it("keeps a prose section rather than dropping it", () => {
    const prose = CHANGELOG_ENTRIES.flatMap((entry) => entry.sections).filter(
      (section) => !section.heading.includes("Ekle"),
    );
    expect(prose.every((section) => section.items.length > 0)).toBe(true);
  });

  it("strips the inline markdown rather than printing it", () => {
    expect(plainText("**kalın** ve `kod` ve [bağlantı](http://x)")).toBe(
      "kalın ve kod ve bağlantı",
    );
  });
});
