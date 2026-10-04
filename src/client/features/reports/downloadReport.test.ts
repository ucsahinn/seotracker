import { describe, expect, it } from "vitest";
import { reportFilename, withDownloadCsp } from "./downloadReport";

describe("withDownloadCsp", () => {
  const prefix = `<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none';`;

  it("puts a trusted doctype and the policy first, ahead of scripts and remote images", () => {
    const html =
      '<!doctype html><html><head><script>x()</script></head><body><img src="https://evil.test/a.png"></body></html>';
    const out = withDownloadCsp(html);
    expect(out.startsWith(prefix)).toBe(true);
    expect(out.indexOf("<script>")).toBeGreaterThan(out.indexOf("<meta"));
    expect(out).toContain("img-src data:");
  });

  /*
   * `<!-->` and `--!>` are whole comments to a browser but not to a search for
   * a literal `-->`, which used to place the policy after a live script.
   */
  it("leads even when comments are malformed, so nothing executes before the policy", () => {
    for (const html of [
      "<!--><script>x()</script><!-- --><!doctype html><p>x</p>",
      "<!----!><script>x()</script><!-- --><!doctype html><p>x</p>",
      "<!-- <head> --><html></html>",
    ]) {
      const out = withDownloadCsp(html);
      expect(out.startsWith(prefix)).toBe(true);
    }
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
