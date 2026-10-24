import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, it, vi } from "vitest";
import { Toaster } from "sonner";
import { DownloadReportButton } from "./DownloadReportButton";

vi.mock("@/serverFunctions/auditReport", () => ({
  createAuditReport: async () => ({ reportId: "r", title: "Audit" }),
}));
vi.mock("@/client/features/reports/downloadReport", () => ({
  reportFilename: () => "audit.html",
  downloadReport: async () => {
    throw new TypeError("offline");
  },
}));
vi.mock("@/client/features/reports/shared", () => ({
  reportsQueryKey: (id: string) => ["reports", id],
}));

it("explains that the saved report survives a failed download", async () => {
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <DownloadReportButton projectId="p" auditId="a" />
      <Toaster />
    </QueryClientProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Raporu indir" }));
  expect(
    await screen.findByText(
      "Rapor kaydedildi ancak indirilemedi. Raporlar ekranından tekrar deneyin.",
    ),
  ).toBeTruthy();
  client.clear();
});
