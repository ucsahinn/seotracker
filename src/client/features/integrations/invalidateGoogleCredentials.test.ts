import { QueryClient } from "@tanstack/react-query";
import { expect, it } from "vitest";
import { invalidateGoogleCredentials } from "./invalidateGoogleCredentials";
it("drops identity-dependent answers in every project without fetching reports or removing stored history", async () => {
  const client = new QueryClient();
  client.setQueryData(["ga4Report", "a"], { ok: true });
  client.setQueryData(["searchPerformance", "b"], { ok: true });
  client.setQueryData(["reports", "a"], { history: true });
  await invalidateGoogleCredentials(client);
  expect(client.getQueryData(["ga4Report", "a"])).toBeUndefined();
  expect(client.getQueryData(["searchPerformance", "b"])).toBeUndefined();
  expect(client.getQueryData(["reports", "a"])).toEqual({ history: true });
});
it("an old in-flight result cannot repopulate the canceled report", async () => {
  const client = new QueryClient();
  let finish!: (value: string) => void;
  const pending = client
    .fetchQuery({
      queryKey: ["ga4Report", "a"],
      queryFn: () =>
        new Promise<string>((resolve) => {
          finish = resolve;
        }),
    })
    .catch(() => undefined);
  await invalidateGoogleCredentials(client);
  finish("old success");
  await pending;
  expect(client.getQueryData(["ga4Report", "a"])).toBeUndefined();
});
