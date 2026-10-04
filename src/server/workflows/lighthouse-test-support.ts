import type { Mock } from "vitest";

type Row = { pageId: string; strategy: string; errorMessage?: string };

/**
 * Lighthouse repository double for tests that mock the insert. Nothing persists
 * between attempts, so a retry re-fetches (siteAuditWorkflowLighthouse.test.ts
 * covers the reuse); progress counts the distinct checks written so far.
 */
export function lighthouseRepositoryMock(insert: Mock) {
  return {
    insertLighthouseResults: insert,
    getSucceededChecks: async () => [],
    countResultsForPages: async () => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- vi.fn() calls are untyped
      const calls = insert.mock.calls as Array<[string, Row[]]>;
      const checks = new Map(
        calls
          .flatMap(([, rows]) => rows)
          .map((row) => [`${row.pageId}|${row.strategy}`, row.errorMessage]),
      );
      const error = [...checks.values()].filter(Boolean).length;
      return { ok: checks.size - error, error };
    },
  };
}
