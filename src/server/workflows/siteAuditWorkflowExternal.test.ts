import { z } from "zod";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { measuredMock, stepDoMock, targets } = vi.hoisted(() => ({
  measuredMock: vi.fn(),
  stepDoMock: vi.fn(),
  // What the scratchpad holds, most-referenced first.
  targets: { link: [] as string[], image: [] as string[] },
}));

vi.mock("cloudflare:workers", () => ({ env: {} }));
vi.mock("@/server/features/audit/AuditScratchpad", () => ({
  getAuditScratchpad: () => ({
    listExternalTargets: async (kind: "link" | "image", limit: number) =>
      targets[kind].slice(0, limit),
    externalSources: async () => [],
  }),
}));
vi.mock("@/server/features/audit/repositories/AuditRepository", () => ({
  AuditRepository: { insertIssues: async () => undefined },
}));
vi.mock(
  "@/server/features/audit/repositories/AuditSiteFactsRepository",
  () => ({
    AuditSiteFactsRepository: { recordMeasuredChecks: measuredMock },
  }),
);
vi.mock("@/server/lib/audit/external-checks", () => ({
  mapWithConcurrency: async <T, R>(
    items: T[],
    _concurrency: number,
    run: (item: T) => Promise<R>,
  ) => Promise.all(items.map(run)),
  checkExternalLink: async (url: string) => ({
    url,
    state: "ok",
    status: 200,
    reason: null,
  }),
  measureImage: async (url: string) => ({ url, bytes: 1_000, atLeast: false }),
}));

import { runExternalChecksPhase } from "@/server/workflows/siteAuditWorkflowExternal";

// The phase only calls `step.do`; run each step inline.
const step: Parameters<typeof runExternalChecksPhase>[0] = {
  do: stepDoMock,
  sleep: vi.fn(),
  sleepUntil: vi.fn(),
  waitForEvent: vi.fn(),
};

const urls = (count: number, kind: string) =>
  Array.from({ length: count }, (_, i) => `https://other.test/${kind}/${i}`);

async function measuredChecks(): Promise<string[]> {
  await runExternalChecksPhase(step, {
    auditId: "audit-1",
    config: {
      maxPages: 100,
      lighthouseStrategy: "none",
      externalChecks: true,
    },
  });
  const checks: unknown = measuredMock.mock.calls[0]?.[1];
  return z.array(z.string()).parse(checks);
}

describe("runExternalChecksPhase", () => {
  beforeEach(() => {
    targets.link = [];
    targets.image = [];
    measuredMock.mockClear();
    stepDoMock.mockImplementation(
      async (_name: string, _config: unknown, run: () => Promise<unknown>) =>
        run(),
    );
  });

  it("records both checks as measured when every target fit the cap", async () => {
    targets.link = urls(200, "link");
    targets.image = urls(100, "image");

    expect(await measuredChecks()).toEqual([
      "broken-external-link",
      "image-file-too-large",
    ]);
  });

  // The unchecked remainder would otherwise read as "passed".
  it("does not record a check as measured when its targets were cut", async () => {
    targets.link = urls(201, "link");
    targets.image = urls(101, "image");

    expect(await measuredChecks()).toEqual([]);
  });
});
