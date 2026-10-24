import { describe, expect, it } from "vitest";
import {
  CHANGELOG_ENTRIES,
  CHANGELOG_ENTRIES_EN,
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
    expect(CHANGELOG_ENTRIES_EN[0]?.sections[0]?.heading).toBe("Features");
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
