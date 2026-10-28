import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  PROJECT_CONTEXT_SECTION_KEYS,
  PROJECT_CONTEXT_SECTION_LABELS,
} from "@/types/schemas/projectContext";

vi.mock("@tanstack/react-router", () => ({ useBlocker: vi.fn() }));

const getProjectContext = vi.hoisted(() => vi.fn());
vi.mock("@/serverFunctions/projectContext", () => ({
  getProjectContext,
  updateProjectContext: vi.fn(),
}));
// Uses router links, irrelevant to the draft behaviour under test.
vi.mock("./ContextHealthCard", () => ({ ContextHealthCard: () => null }));

import { ProjectContextPage } from "./ProjectContextPage";
import { ContextSaveError } from "./shared";

const emptyContext = {
  sections: [],
  missingSections: [...PROJECT_CONTEXT_SECTION_KEYS],
  competitors: [],
  keyPages: [],
  customSections: [],
  researchLog: [],
};

describe("ProjectContextPage", () => {
  it("lets the section menu reach key pages and competitors, not only prose", async () => {
    getProjectContext.mockResolvedValue(emptyContext);
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={client}>
        <ProjectContextPage projectId="navigation" projectName="Acme" />
      </QueryClientProvider>,
    );
    const menu = await screen.findByRole("combobox", { name: "Bölüme git" });
    expect(
      screen.getByRole("option", { name: "Önemli sayfalar" }),
    ).toHaveProperty("value", "context-key-pages");
    expect(screen.getByRole("option", { name: "Rakipler" })).toHaveProperty(
      "value",
      "context-competitors",
    );
    const target = document.getElementById("context-key-pages")!;
    const focus = vi.spyOn(target, "focus");
    fireEvent.change(menu, { target: { value: "context-key-pages" } });
    expect(focus).toHaveBeenCalled();
  });
  it("explains atomic conflicts without exposing the storage marker", () => {
    render(
      <ContextSaveError
        error={new Error("VALIDATION_ERROR: context_edit_conflict")}
      />,
    );
    expect(screen.getByRole("alert").textContent).toContain(
      "Metinleri karşılaştırıp",
    );
    expect(screen.getByRole("alert").textContent).not.toContain(
      "context_edit_conflict",
    );
  });
  it("pins the editing base and preserves both texts on refetch (previously a draft overwrote agent edits)", async () => {
    const base = {
      ...emptyContext,
      sections: [
        {
          key: "current_goal",
          content: "base",
          updatedAt: "2026-10-27T10:00:00Z",
          updatedBy: "user",
        },
      ],
    };
    getProjectContext.mockResolvedValue(base);
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={client}>
        <ProjectContextPage projectId="conflict" projectName="Acme" />
      </QueryClientProvider>,
    );
    const field = await screen.findByLabelText(
      PROJECT_CONTEXT_SECTION_LABELS.current_goal,
    );
    fireEvent.change(field, { target: { value: "my draft" } });
    client.setQueryData(["projectContext", "conflict"], {
      ...base,
      sections: [{ ...base.sections[0], content: "agent text" }],
    });
    expect(
      await screen.findByText(/Son kayıtlı metin.*agent text/),
    ).toBeDefined();
    expect(field).toHaveProperty("value", "my draft");
    expect(
      screen.getByRole("button", { name: "Değişiklikleri kaydet" }),
    ).toHaveProperty("disabled", true);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Karşılaştırdım, birleştirilmiş taslağı kullan",
      }),
    );
    expect(
      screen.getByRole("button", { name: "Değişiklikleri kaydet" }),
    ).toHaveProperty("disabled", false);
  });
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
    expect(
      screen.getByText(
        "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.",
      ),
    ).toBeDefined();
  });
});
