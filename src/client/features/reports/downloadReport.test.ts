import { describe, expect, it } from "vitest";
import { reportFilename } from "./downloadReport";

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

  it("never produces a nameless file", () => {
    expect(reportFilename("///", date)).toBe("rapor-2026-09-28.html");
    expect(reportFilename("   ", date)).toBe("rapor-2026-09-28.html");
  });
});
