import { describe, expect, it } from "vitest";
import { reportFilename, withDownloadCsp } from "./downloadReport";

describe("withDownloadCsp", () => {
  const meta = `<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none';`;

  it("puts the policy first, after the doctype and ahead of scripts and remote images", () => {
    const html =
      '<!doctype html><html><head><script>x()</script></head><body><img src="https://evil.test/a.png"></body></html>';
    const out = withDownloadCsp(html);
    expect(out.startsWith(`<!doctype html>${meta}`)).toBe(true);
    expect(out.indexOf("<script>")).toBeGreaterThan(out.indexOf(meta));
    expect(out).toContain("img-src data:");
  });

  it("leads even without a doctype, and ignores a decoy <head> in a comment", () => {
    expect(withDownloadCsp("<p>düz</p>").startsWith(meta)).toBe(true);
    expect(
      withDownloadCsp("<!-- <head> --><html></html>").startsWith(meta),
    ).toBe(true);
  });

  it("finds a doctype behind comments, and stays fast on thousands of them", () => {
    expect(
      withDownloadCsp("<!-- a --> <!-- b --><!DOCTYPE html><p>x</p>"),
    ).toContain(`<!-- b --><!DOCTYPE html>${meta}`);
    const comments = "<!-- x -->".repeat(5000);
    const started = performance.now();
    const out = withDownloadCsp(`${comments}<p>x</p>`);
    expect(performance.now() - started).toBeLessThan(500);
    expect(out.startsWith(meta)).toBe(true);
    expect(withDownloadCsp(`${comments}<!doctype html>`)).toContain(
      `${comments}<!doctype html>${meta}`,
    );
  });
});

const date = new Date("2026-09-28T10:00:00.000Z");

describe("reportFilename", () => {
  it("stamps the date so a second download does not land as a copy", () => {
    expect(reportFilename("Eylül denetimi", date)).toBe(
      "Eylül denetimi-2026-09-28.html",
    );
  });

  /*
   * Report titles are free text and a title is allowed to contain a slash.
   * Windows refuses the name outright; other systems read it as a path.
   */
  it("strips characters a filesystem will not take", () => {
    const name = reportFilename('a/b\\c:d*e?f"g<h>i|j', date);

    expect(name).not.toMatch(/[\\/:*?"<>|]/);
    expect(name.endsWith(".html")).toBe(true);
  });

  it("drops control characters and leading dots, and guards reserved names", () => {
    expect(reportFilename("a\u0000b\u001fc\u007fd", date)).toBe(
      "a b c d-2026-09-28.html",
    );
    expect(reportFilename("..gizli", date)).toBe("gizli-2026-09-28.html");
    expect(reportFilename("CON", date)).toBe("_CON-2026-09-28.html");
    expect(reportFilename("lpt3", date)).toBe("_lpt3-2026-09-28.html");
    expect(reportFilename("aux.report", date)).toBe(
      "_aux.report-2026-09-28.html",
    );
    expect(reportFilename("CON.txt", date)).toBe("_CON.txt-2026-09-28.html");
    expect(reportFilename("console", date)).toBe("console-2026-09-28.html");
  });

  it("removes C1 controls and bidi overrides", () => {
    expect(reportFilename("a\u0085b\u202ecod.exe\u2069", date)).toBe(
      "a b cod.exe-2026-09-28.html",
    );
  });

  it("stamps the local calendar day, not the UTC one", () => {
    expect(reportFilename("x", new Date(2026, 8, 28, 0, 30))).toBe(
      "x-2026-09-28.html",
    );
    expect(reportFilename("x", new Date(2026, 0, 5, 23, 59))).toBe(
      "x-2026-01-05.html",
    );
  });

  it("does not cut a surrogate pair in half", () => {
    const name = reportFilename(`${"a".repeat(79)}😀😀`, date);
    expect(name).toBe(`${"a".repeat(79)}😀-2026-09-28.html`);
  });

  it("never produces a nameless file", () => {
    expect(reportFilename("///", date)).toBe("rapor-2026-09-28.html");
    expect(reportFilename("   ", date)).toBe("rapor-2026-09-28.html");
  });
});
