import { toast } from "sonner";
import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText } from "@/client/lib/copyText";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe("copyText", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("reports failure instead of throwing when the clipboard API is missing", async () => {
    vi.stubGlobal("navigator", {});
    await expect(copyText("x", "ok")).resolves.toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Pano kullanılamıyor");
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("toasts success only after the write resolves", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    await expect(copyText("x", "kopyalandı")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("x");
    expect(toast.success).toHaveBeenCalledWith("kopyalandı");
  });

  it("toasts an error when the write rejects", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    await expect(copyText("x", "ok")).resolves.toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Panoya kopyalanamadı");
  });
});
