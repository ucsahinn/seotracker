import { describe, expect, it } from "vitest";
import { describeAuditFailure, describeAuditNotice } from "./auditFailureCopy";

describe("describeAuditFailure", () => {
  it("blames the app, not the site, for a missing secret, and names the speed phase even on rows stored as crawling", () => {
    const copy = describeAuditFailure({
      errorCode: "missing_secret",
      failedPhase: "crawling",
    });
    expect(copy.phase).toBe("hız ölçümü");
    expect(copy.side).toBe("Sorun sitenizde değil, uygulamada.");
    expect(copy.cause).toContain("kurulum anahtarı");
  });

  it("points at a slow site for a step timeout", () => {
    const copy = describeAuditFailure({
      errorCode: "step_timeout",
      failedPhase: "crawling",
    });
    expect(copy.phase).toBe("tarama");
    expect(copy.side).toContain("sitenizin yavaş");
  });

  it("falls back to the unknown copy without leaking the raw code", () => {
    const copy = describeAuditFailure({ errorCode: "brand_new_code" });
    expect(copy.phase).toBeNull();
    expect(copy.title).toBe("Denetim tamamlanamadan durdu.");
    expect(copy.side).toBe("Nedeni belirlenemedi.");
    expect(copy.action).toContain("tanılama paketini");
  });
});

describe("describeAuditNotice", () => {
  it("only speaks for the worked-around missing key", () => {
    expect(describeAuditNotice("missing_secret")?.title).toContain(
      "Kayıtlı PageSpeed anahtarı okunamadı",
    );
    expect(describeAuditNotice(null)).toBeNull();
    expect(describeAuditNotice("oom")).toBeNull();
  });
});
