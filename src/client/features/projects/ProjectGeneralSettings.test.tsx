import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ProjectGeneralSettings } from "./ProjectGeneralSettings";

const api = vi.hoisted(() => ({
  getProjects: vi.fn(),
  updateProject: vi.fn(),
  archiveProject: vi.fn(),
}));
vi.mock("@/serverFunctions/projects", () => api);
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));

it("guards client-3: locks the general-settings draft until a pending normalized save finishes", async () => {
  const project = {
    id: "p1",
    name: "A",
    domain: "old.example",
    locationCode: 2840,
    languageCode: "en",
    createdAt: "2026-01-01",
  };
  api.getProjects.mockResolvedValue([project]);
  let finish!: (value: typeof project) => void;
  api.updateProject.mockReturnValue(
    new Promise<typeof project>((resolve) => {
      finish = resolve;
    }),
  );
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <ProjectGeneralSettings projectId="p1" />
    </QueryClientProvider>,
  );
  const name = await screen.findByRole("textbox", { name: "Ad" });
  const domain = screen.getByRole("textbox", { name: "Alan adı" });
  fireEvent.change(name, { target: { value: "B" } });
  fireEvent.change(domain, { target: { value: "https://www.New.example/" } });
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(
    screen.getByRole("button", { name: "Değişiklikleri kaydet" }),
  );
  await waitFor(() => expect(api.updateProject).toHaveBeenCalledOnce());
  expect(name.closest("fieldset")?.disabled).toBe(true);
  expect(domain.closest("fieldset")?.disabled).toBe(true);
  finish({ ...project, name: "B", domain: "new.example" });
  await waitFor(() => expect(domain).toHaveProperty("value", "new.example"));
  await waitFor(() => expect(name.closest("fieldset")?.disabled).toBe(false));
  client.clear();
});

it("distinguishes saved market preferences from the global ranking archive", async () => {
  api.getProjects.mockResolvedValue([
    {
      id: "market",
      name: "Acme",
      domain: null,
      locationCode: 2792,
      languageCode: "tr",
      createdAt: "2026-01-01",
    },
  ]);
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <ProjectGeneralSettings projectId="market" />
    </QueryClientProvider>,
  );
  expect(
    await screen.findByText(
      /Arşivdeki sıralamalar tüm ülkeleri ve cihazları kapsar/,
    ),
  ).toBeDefined();
  client.clear();
});
