import { expect, it } from "vitest";
import { getParticipantId } from "./participation";

it("keeps one anonymous participant id per browser storage", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };

  const first = getParticipantId(storage);
  const second = getParticipantId(storage);

  expect(first).toMatch(/^[0-9a-f-]{36}$/i);
  expect(second).toBe(first);
});
