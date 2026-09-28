import { beforeEach, describe, expect, it } from "vitest";
import { logClientEvent, readClientLog } from "./clientLog";

/*
 * The buffer is module state on purpose -- one ring for the tab -- so each
 * test drains it rather than resetting the module. `vi.resetModules` and a
 * per-test dynamic import are banned by the house rules, and this is the
 * case they are banned in favour of.
 */
beforeEach(() => {
  while (readClientLog().length > 0) {
    logClientEvent("info", "drain");
    if (readClientLog().length >= 100) break;
  }
});

describe("client log", () => {
  it("keeps the message, the level and when it happened", () => {
    logClientEvent("error", "Bir şey kırıldı", new Error("boom"));

    const entry = readClientLog().at(-1);

    expect(entry?.level).toBe("error");
    expect(entry?.message).toBe("Bir şey kırıldı");
    expect(entry?.detail).toContain("boom");
    expect(Number.isNaN(Date.parse(entry?.at ?? ""))).toBe(false);
  });

  /*
   * A render loop that throws every frame must not be able to grow this
   * until the tab runs out of memory.
   */
  it("keeps only the most recent entries", () => {
    for (let i = 0; i < 150; i += 1) logClientEvent("warn", `entry ${i}`);

    const log = readClientLog();

    expect(log.length).toBe(100);
    expect(log.at(-1)?.message).toBe("entry 149");
  });

  it("survives a detail that cannot be serialised", () => {
    const cyclic: Record<string, unknown> = {};
    cyclic["self"] = cyclic;

    expect(() => logClientEvent("error", "cyclic", cyclic)).not.toThrow();
    expect(readClientLog().at(-1)?.detail).toBeTypeOf("string");
  });

  it("returns a copy, so a reader cannot edit the buffer", () => {
    logClientEvent("info", "first");

    readClientLog().push({
      at: "x",
      level: "error",
      message: "injected",
    });

    expect(readClientLog().some((e) => e.message === "injected")).toBe(false);
  });
});
