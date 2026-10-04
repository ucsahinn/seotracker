import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
} from "@/types/schemas/projectContext";

const getProjectContext = vi.hoisted(() => vi.fn());
vi.mock("@/serverFunctions/projectContext", () => ({
  getProjectContext,
  updateProjectContext: vi.fn(),
}));
// Uses router links, irrelevant to the draft behaviour under test.
vi.mock("./ContextHealthCard", () => ({ ContextHealthCard: () => null }));

import { ProjectContextPage } from "./ProjectContextPage";

const emptyContext = {
  sections: [],
  missingSections: [...PROJECT_CONTEXT_SECTION_KEYS],
  competitors: [],
  keyPages: [],
  customSections: [],
  researchLog: [],
};

describe("ProjectContextPage", () => {
  it("keeps a typed draft when a background refetch fails", async () => {
    getProjectContext.mockResolvedValueOnce(emptyContext);
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={client}>
        <ProjectContextPage projectId="p1" projectName="Acme" />
      </QueryClientProvider>,
    );

    const label =
      PROJECT_CONTEXT_SECTION_LABELS[PROJECT_CONTEXT_SECTION_KEYS[0]];
    const field = await screen.findByLabelText(label);
    fireEvent.change(field, { target: { value: "taslak" } });

    getProjectContext.mockRejectedValueOnce(new Error("boom"));
    await client.refetchQueries({ queryKey: ["projectContext", "p1"] });
    await waitFor(() =>
      expect(client.getQueryState(["projectContext", "p1"])?.status).toBe(
        "error",
      ),
    );

    expect(screen.getByLabelText(label)).toHaveProperty("value", "taslak");
  });
});
