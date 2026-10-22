import { describe, expect, it } from "vitest";
import { describeCheck } from "./checkCopy";

describe("describeCheck", () => {
  it("turns the English keyless PageSpeed warning into Turkish advice", () => {
    const result = describeCheck(
      "pagespeed",
      { status: "warn", detail: "No PageSpeed key. The Lighthouse phase ..." },
      null,
    );
    expect(result.status).toBe("warn");
    expect(result.text).toContain("429");
    expect(result.foreign).toBe(false);
  });

  it("does not show a green tick when no Google credential is stored", () => {
    const result = describeCheck(
      "gsc",
      {
        status: "ok",
        detail: "Enter your Google OAuth client in Settings ...",
      },
      false,
    );
    expect(result.status).toBe("warn");
    expect(result.text).toContain("henüz girilmedi");
  });

  it("keeps the green tick once a service account alone is stored", () => {
    const result = describeCheck(
      "gsc",
      {
        status: "ok",
        detail: "Enter your Google OAuth client in Settings ...",
      },
      true,
    );
    expect(result.status).toBe("ok");
  });

  it("passes an unknown check through and flags it as foreign", () => {
    expect(
      describeCheck("novel", { status: "warn", detail: "Something odd" }, null),
    ).toEqual({ status: "warn", text: "Something odd", foreign: true });
  });

  it("sends a Windows package user to the tray menu, not to docker compose", () => {
    const result = describeCheck(
      "database",
      { status: "error", detail: "D1 did not answer" },
      null,
      "windows",
    );
    expect(result.text).toContain("Günlükleri aç");
    expect(result.text).not.toContain("docker");
  });

  it("tells a Windows package user to repair instead of editing env files", () => {
    const auth = describeCheck(
      "auth",
      { status: "error", detail: "AUTH_MODE missing" },
      null,
      "windows",
    );
    expect(auth.text).toContain("Kurulumu onar");
    expect(auth.text).not.toContain("ENVIRONMENT.md");
    const gsc = describeCheck(
      "gsc",
      { status: "warn", detail: "DISABLED: secret too short" },
      null,
      "windows",
    );
    expect(gsc.text).toContain("Kurulumu onar");
  });
});
