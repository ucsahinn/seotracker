import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { createGa4AdminClient } from "./ga4Client";

const mocks = vi.hoisted(() => ({ fetch: vi.fn<typeof fetch>() }));

vi.mock("@/lib/auth", () => ({
  getGoogleGrantAuth: () =>
    Promise.resolve({
      api: { getAccessToken: () => Promise.resolve({ accessToken: "tok" }) },
    }),
}));
// The real module reaches the database, which Node tests cannot load.
vi.mock("@/server/lib/googleServiceAccountToken", () => ({
  hasServiceAccount: () => Promise.resolve(false),
  getServiceAccountToken: vi.fn(),
}));

beforeEach(() => vi.stubGlobal("fetch", mocks.fetch));
afterEach(() => vi.unstubAllGlobals());

const keyEventPage = (name: string, nextPageToken?: string) =>
  Response.json({
    keyEvents: [{ eventName: name, countingMethod: "ONCE_PER_EVENT" }],
    nextPageToken,
  });

it("follows every nextPageToken beyond the former five-page cap", async () => {
  const client = createGa4AdminClient({ userId: "u1", ga4AccountId: "acct" });
  mocks.fetch
    .mockResolvedValueOnce(keyEventPage("a", "more"))
    .mockResolvedValueOnce(keyEventPage("b"));
  const finished = await client.listKeyEvents("properties/11");
  expect(finished.complete).toBe(true);
  expect(finished.items.map((event) => event.eventName)).toEqual(["a", "b"]);
  const secondRequest = mocks.fetch.mock.calls[1]?.[0];
  expect(
    secondRequest instanceof Request
      ? secondRequest.url
      : String(secondRequest),
  ).toContain("pageToken=more");

  mocks.fetch.mockReset();
  let page = 0;
  mocks.fetch.mockImplementation(() => {
    page += 1;
    return Promise.resolve(
      keyEventPage(String(page), page < 7 ? String(page) : undefined),
    );
  });
  const complete = await client.listKeyEvents("properties/11");
  expect(complete.complete).toBe(true);
  expect(complete.items.map((event) => event.eventName)).toEqual([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);
});

// Access persistence is tested with real SQLite in GoogleAccessRepository.test.ts.
vi.mock("@/server/features/google/GoogleAccessService", () => ({
  googleAccessScope: async (scope: object) => ({ ...scope, generation: 0 }),
  observeGoogleAccess: async (_scope: object, read: () => Promise<unknown>) =>
    read(),
}));

it("rejects repeated Admin tokens rather than looping or claiming completeness", async () => {
  mocks.fetch.mockImplementation(() =>
    Promise.resolve(keyEventPage("a", "repeat")),
  );
  await expect(
    createGa4AdminClient({ userId: "u1" }).listKeyEvents("properties/11"),
  ).rejects.toThrow();
  expect(mocks.fetch).toHaveBeenCalledTimes(2);
});

it("discovers properties beyond the former hundred-page budget", async () => {
  let page = 0;
  mocks.fetch.mockImplementation(() => {
    page += 1;
    return Promise.resolve(
      Response.json({
        accountSummaries: [
          {
            account: "accounts/1",
            displayName: "Account",
            propertySummaries: [
              { property: "properties/" + page, displayName: String(page) },
            ],
          },
        ],
        ...(page < 101 ? { nextPageToken: String(page) } : {}),
      }),
    );
  });
  const result = await createGa4AdminClient({ userId: "u1" }).listProperties();
  expect(result).toHaveLength(101);
  expect(result[100]?.propertyId).toBe("properties/101");
});
