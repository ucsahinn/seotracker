import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { coverageBucket, countCoverage } from "./coverageBuckets";
import { CoverageVerdictDonut } from "./CoverageVerdictDonut";

const at = "2026-09-01T10:00:00Z";

describe("coverageBucket", () => {
  it("counts only a checked, error-free, real verdict as an answer", () => {
    const bucket = (
      verdict: string | null,
      checkedAt: string | null,
      error: string | null = null,
    ) => coverageBucket({ verdict, checkedAt, error });

    expect(bucket("PASS", at)).toBe("indexed");
    expect(bucket("NEUTRAL", at)).toBe("notIndexed");
    expect(bucket("PASS", null)).toBe("pending");
    expect(bucket("PASS", at, "quota")).toBe("pending");
    expect(bucket("VERDICT_UNSPECIFIED", at)).toBe("pending");
    expect(bucket(null, at)).toBe("pending");
  });

  it("sums to the number of rows", () => {
    const counts = countCoverage([
      { verdict: "PASS", checkedAt: at, error: null },
      { verdict: "FAIL", checkedAt: at, error: null },
      { verdict: null, checkedAt: null, error: null },
    ]);

    expect(counts).toEqual({ indexed: 1, notIndexed: 1, pending: 1 });
  });
});

describe("CoverageVerdictDonut", () => {
  const counts = { indexed: 5, notIndexed: 2, pending: 0 };

  it("selects a group, and clicking the selected group releases it", () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <CoverageVerdictDonut
        counts={counts}
        selected={null}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Dizinde değil/ }));
    expect(onSelect).toHaveBeenLastCalledWith("notIndexed");

    rerender(
      <CoverageVerdictDonut
        counts={counts}
        selected="notIndexed"
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Dizinde değil/ }));
    expect(onSelect).toHaveBeenLastCalledWith(null);
  });

  it("shows an empty group but does not let it be selected", () => {
    render(
      <CoverageVerdictDonut
        counts={counts}
        selected={null}
        onSelect={() => {}}
      />,
    );

    expect(
      screen
        .getByRole("button", { name: /Yanıt bekleyen/ })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});
