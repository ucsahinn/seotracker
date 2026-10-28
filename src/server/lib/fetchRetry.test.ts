import { afterEach, expect, it, vi } from "vitest";
import { fetchWithRetry, UpstreamNetworkError } from "./fetchRetry";

const fetchMock = vi.fn<typeof fetch>();
const options = { service: "Test API", retryDelaysMs: [0, 0] };

it("ERR-02 preserves caller cancellation when adding a request deadline", async () => {
  stub();
  const controller = new AbortController();
  fetchMock.mockImplementation(
    (_url, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener(
          "abort",
          () => reject(init.signal?.reason),
          { once: true },
        );
      }),
  );
  const result = fetchWithRetry(
    "https://x.test/",
    { signal: controller.signal },
    { ...options, timeoutMs: 30_000 },
  );
  const assertion = expect(result).rejects.toMatchObject({
    name: "AbortError",
  });
  controller.abort();
  await assertion;
  expect(fetchMock).toHaveBeenCalledOnce();
});

afterEach(() => vi.unstubAllGlobals());

function stub() {
  vi.stubGlobal("fetch", fetchMock);
}

// workerd's wording for a dropped outbound connection (server.log, 0.8.0).
it("retries a dropped connection and returns the answer that follows", async () => {
  stub();
  fetchMock
    .mockRejectedValueOnce(new Error("Network connection lost."))
    .mockResolvedValueOnce(new Response("ok"));

  const response = await fetchWithRetry("https://x.test/", {}, options);

  expect(await response.text()).toBe("ok");
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it("gives up after the bounded retries with the transport's reason", async () => {
  stub();
  fetchMock.mockRejectedValue(
    new TypeError("fetch failed https://x.test/?key=secret"),
  );

  const error = await fetchWithRetry("https://x.test/", {}, options).catch(
    (caught: unknown) => caught,
  );

  expect(error).toBeInstanceOf(UpstreamNetworkError);
  expect(error).toMatchObject({ attempts: 3, reason: "fetch failed <url>" });
  expect(fetchMock).toHaveBeenCalledTimes(3);
});

it("never retries an HTTP answer in the 4xx range or a timeout", async () => {
  stub();
  fetchMock.mockResolvedValueOnce(new Response("", { status: 403 }));
  expect((await fetchWithRetry("https://x.test/", {}, options)).status).toBe(
    403,
  );

  fetchMock.mockRejectedValueOnce(
    new DOMException("signal timed out", "TimeoutError"),
  );
  await expect(
    fetchWithRetry("https://x.test/", {}, options),
  ).rejects.toMatchObject({ name: "TimeoutError" });
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it("retries a gateway 503 and hands back the last one when it persists", async () => {
  stub();
  fetchMock.mockImplementation(
    async () => new Response("busy", { status: 503 }),
  );

  const response = await fetchWithRetry("https://x.test/", {}, options);

  expect(response.status).toBe(503);
  expect(fetchMock).toHaveBeenCalledTimes(3);
});
