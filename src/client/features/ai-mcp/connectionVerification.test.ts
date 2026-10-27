import { describe, expect, it } from "vitest";
import {
  connectionEvidence,
  verificationState,
} from "./connectionVerification";
const now = Date.parse("2026-10-27T12:00:00Z");
describe("agent call evidence", () => {
  it("rejects malformed and future calls instead of showing recent success", () => {
    expect(connectionEvidence("broken", now)).toBeNull();
    expect(connectionEvidence("2026-10-28 12:00:00", now)).toBeNull();
  });
  it("requires a call newer than both the start and the previous observed call", () => {
    expect(verificationState("2026-10-27 11:59:50", now, now - 1000, now)).toBe(
      "waiting",
    );
    expect(
      verificationState("2026-10-27 12:00:01", now, now - 1000, now + 2000),
    ).toBe("verified");
    expect(verificationState(null, now, null, now + 60_000)).toBe("timeout");
  });
});
