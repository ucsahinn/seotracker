import { afterEach, describe, expect, it, vi } from "vitest";
import {
  formatDateTime,
  formatDuration,
  formatRemaining,
  formatRelativeTime,
} from "./format";
import { setLocale, type Locale } from "./i18n";

afterEach(() => {
  setLocale("tr");
  vi.useRealTimers();
});
describe("shared time formatting", () => {
  it.each([
    ["tr", "1,5 sn", "2 dk", "1 sa 1 dk"],
    ["en", "1.5 s", "2 min", "1 h 1 min"],
    ["de", "1,5 Sek.", "2 Min.", "1 Std. 1 Min."],
    ["fr", "1,5 s", "2 min", "1 h 1 min"],
    ["it", "1,5 s", "2 min", "1 h 1 min"],
    ["pt", "1,5 s", "2 min", "1 h 1 min"],
  ] as const)(
    "guards bug 5: %s durations use localized units and retain estimate rounding",
    (locale, duration, minutes, hours) => {
      setLocale(locale);
      expect(formatDuration(1500)).toBe(duration);
      expect(formatRemaining(65000)).toBe(minutes);
      expect(formatRemaining(3601000)).toBe(hours);
      expect(formatRemaining(1000)).toBe(
        locale === "tr" ? "1 sn" : locale === "de" ? "1 Sek." : "1 s",
      );
      expect(formatDuration(500)).toBe("500 ms");
    },
  );
  it.each(["tr", "en", "de", "fr", "it", "pt"] as Locale[])(
    "uses %s under a minute (previously non-English locales returned Turkish)",
    (locale) => {
      vi.useFakeTimers();
      vi.setSystemTime("2026-10-27T12:00:00Z");
      setLocale(locale);
      const expected = new Intl.RelativeTimeFormat(
        {
          tr: "tr-TR",
          en: "en-US",
          de: "de-DE",
          fr: "fr-FR",
          it: "it-IT",
          pt: "pt-PT",
        }[locale],
        { numeric: "auto" },
      ).format(0, "second");
      expect(formatRelativeTime("2026-10-27T11:59:45Z")).toBe(expected);
    },
  );
  it("identifies a prior-year timestamp (previously its year was omitted)", () => {
    vi.useFakeTimers();
    vi.setSystemTime("2026-10-27T12:00:00Z");
    expect(formatDateTime("2025-10-27T12:00:00Z")).toContain("2025");
    expect(formatDateTime("2026-10-27T12:00:00Z")).not.toContain("2026");
  });
});
