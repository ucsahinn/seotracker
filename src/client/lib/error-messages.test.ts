import { describe, expect, it } from "vitest";
import {
  getErrorCode,
  getStandardErrorMessage,
} from "@/client/lib/error-messages";

describe("getStandardErrorMessage", () => {
  it("maps known error codes to standard copy", () => {
    expect(getStandardErrorMessage(new Error("NOT_FOUND"))).toBe(
      "İstenen kayıt bulunamadı.",
    );
  });

  it("returns custom messages when the error is not a shared code", () => {
    expect(
      getStandardErrorMessage(
        new Error("DataForSEO task missing billing metadata. Response: {...}"),
      ),
    ).toBe("DataForSEO task missing billing metadata. Response: {...}");
  });
});

describe("getStandardErrorMessage fallback", () => {
  it("prefers the caller's sentence over the generic internal-error text", () => {
    expect(
      getStandardErrorMessage(new Error("INTERNAL_ERROR"), "Etiket silinemedi"),
    ).toBe("Etiket silinemedi");
  });

  it("shows CONFLICT and VALIDATION_ERROR detail from the server", () => {
    const conflict = new Error("CONFLICT: Bu adda bir etiket zaten var.");

    expect(getErrorCode(conflict)).toBe("CONFLICT");
    expect(getStandardErrorMessage(conflict, "Etiket güncellenemedi")).toBe(
      "Bu adda bir etiket zaten var.",
    );
  });
});

describe("coded error messages (CODE: detail)", () => {
  const coded = new Error(
    "AUTH_CONFIG_MISSING: TEAM_DOMAIN must be a full https URL like https://your-team.cloudflareaccess.com",
  );

  it("extracts the code from a coded message", () => {
    expect(getErrorCode(coded)).toBe("AUTH_CONFIG_MISSING");
  });

  it("shows the server detail instead of the generic text", () => {
    expect(getStandardErrorMessage(coded)).toBe(
      "TEAM_DOMAIN must be a full https URL like https://your-team.cloudflareaccess.com",
    );
  });

  it("keeps bare codes mapping to the standard copy", () => {
    const bare = new Error("AUTH_CONFIG_MISSING");
    expect(getErrorCode(bare)).toBe("AUTH_CONFIG_MISSING");
    expect(getStandardErrorMessage(bare)).toContain("yapılandırılmamış");
  });

  it("does not treat arbitrary colon messages as coded", () => {
    const arbitrary = new Error("Something failed: try again");
    expect(getErrorCode(arbitrary)).toBeNull();
    expect(getStandardErrorMessage(arbitrary)).toBe(
      "Something failed: try again",
    );
  });
});
