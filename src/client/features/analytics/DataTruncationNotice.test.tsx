// @vitest-environment happy-dom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { DataTruncationNotice } from "./DataTruncationNotice";
afterEach(cleanup);
// Previously truncation detail never reached Analytics even when Google supplied it.
it("shows Google's truncation evidence as escaped source text", () => {
  render(
    <DataTruncationNotice
      reasons={[
        {
          dataTruncationMessage: "<script>source</script>",
          dataTruncationDate: "2026-01-01",
        },
      ]}
    />,
  );
  expect(screen.getByRole("status").textContent).toContain(
    "toplamlar ve karşılaştırmalar eksik olabilir",
  );
  expect(screen.getByText("<script>source</script>")).toBeTruthy();
  expect(document.querySelector("script")).toBeNull();
});
