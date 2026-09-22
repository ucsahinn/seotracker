import { describe, expect, it } from "vitest";
import { compareVersions, isNewerVersion } from "@/shared/version";

describe("compareVersions", () => {
  it("orders by major, then minor, then patch", () => {
    expect(compareVersions("0.2.0", "0.3.0")).toBe(-1);
    expect(compareVersions("1.0.0", "0.9.9")).toBe(1);
    expect(compareVersions("0.2.0", "0.2.0")).toBe(0);
    // Numeric, not lexicographic: "10" must beat "9".
    expect(compareVersions("0.9.0", "0.10.0")).toBe(-1);
  });

  it("ignores a leading v, because tags carry one and package.json does not", () => {
    expect(compareVersions("0.2.0", "v0.2.0")).toBe(0);
  });

  it("returns null rather than guessing at anything it cannot parse", () => {
    expect(compareVersions("0.2.0", "nightly")).toBeNull();
    expect(compareVersions("0.2.0", "v1.0.0-rc.1")).toBeNull();
  });
});

describe("isNewerVersion", () => {
  it("is false when the operator is ahead of the published tag", () => {
    // Routine while developing against the repo; nagging here would train
    // the operator to ignore the notice.
    expect(isNewerVersion("0.3.0", "v0.2.0")).toBe(false);
  });

  it("is false when the tag cannot be compared", () => {
    expect(isNewerVersion("0.2.0", "release-2026-09")).toBe(false);
  });

  it("is true only for a genuinely newer release", () => {
    expect(isNewerVersion("0.2.0", "v0.3.0")).toBe(true);
  });
});
