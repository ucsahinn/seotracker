import { beforeEach, describe, expect, it, vi } from "vitest";
import { getProjectContext } from "./ProjectContextService";
const mocks = vi.hoisted(() => ({
  listSections: vi.fn(),
  listCompetitors: vi.fn(),
  listKeyPages: vi.fn(),
  listResearchLog: vi.fn(),
  listTemplates: vi.fn(),
}));
vi.mock(
  "@/server/features/project-context/repositories/ProjectContextRepository",
  () => ({ ProjectContextRepository: mocks }),
);
vi.mock(
  "@/server/features/reports/repositories/ReportTemplateRepository",
  () => ({ ReportTemplateRepository: mocks }),
);
vi.mock("@/db/runBatch", () => ({ runBatch: vi.fn() }));
beforeEach(() => {
  Object.values(mocks).forEach((mock) => mock.mockResolvedValue([]));
});
describe("context read isolation", () => {
  it("keeps core context when optional templates fail (previously rejected everything)", async () => {
    mocks.listTemplates.mockRejectedValueOnce(new Error("unavailable"));
    const context = await getProjectContext("p");
    expect(context.reportTemplates).toEqual([]);
    expect(context.reportTemplatesAvailable).toBe(false);
  });
  it.each([0, 19, 20, 21])(
    "reports real overflow for %i rows (previously guessed from length)",
    async (size) => {
      mocks.listResearchLog.mockResolvedValueOnce(
        Array.from({ length: size }, (_, i) => ({
          id: String(i),
          entryDate: "2026-10-27",
          summary: "entry",
          createdBy: "user",
        })),
      );
      const context = await getProjectContext("p");
      expect(context.researchLog).toHaveLength(Math.min(size, 20));
      expect(context.researchLogHasMore).toBe(size > 20);
      expect(mocks.listResearchLog).toHaveBeenLastCalledWith(
        "p",
        21,
        expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      );
    },
  );
});
