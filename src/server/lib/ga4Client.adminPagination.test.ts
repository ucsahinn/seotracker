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

it("follows nextPageToken and flags a list as incomplete when the page budget runs out", async () => {
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
  mocks.fetch.mockImplementation(() =>
    Promise.resolve(keyEventPage("x", "more")),
  );
  const truncated = await client.listKeyEvents("properties/11");
  expect(truncated.complete).toBe(false);
  expect(mocks.fetch).toHaveBeenCalledTimes(5);
});
