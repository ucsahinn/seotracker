import { describe, expect, it } from "vitest";
import { CHANGELOG_ENTRIES, plainText } from "./changelog";

/*
 * These notes are read out of the real CHANGELOG.md at build time, so the
 * parser's input is a file that changes every release. The tests assert the
 * shape it must keep producing, not any particular release's wording.
 */
describe("changelog", () => {
  it("reads the releases out of the real file", () => {
    expect(CHANGELOG_ENTRIES.length).toBeGreaterThan(0);
    for (const entry of CHANGELOG_ENTRIES) {
      expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });

  /*
   * "Yayınlanmamış" is what is committed but not released, so it describes a
   * build nobody is running. Showing it under a version heading in the app
   * would promise the operator changes their container does not have.
   */
  it("leaves the unreleased section out", () => {
    expect(
      CHANGELOG_ENTRIES.some((entry) => entry.version === "Yayınlanmamış"),
    ).toBe(false);
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
    ).filter((item) => item.length > 90);
    expect(wrapped.length).toBeGreaterThan(0);
  });

  it("strips the inline markdown rather than printing it", () => {
    expect(plainText("**kalın** ve `kod` ve [bağlantı](http://x)")).toBe(
      "kalın ve kod ve bağlantı",
    );
  });
});
