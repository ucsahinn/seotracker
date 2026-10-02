import { describe, expect, it } from "vitest";
import { clientIdProblem } from "./googleClientId";

describe("clientIdProblem", () => {
  it("accepts a real-shaped id and an empty field", () => {
    expect(clientIdProblem("123-abc.apps.googleusercontent.com")).toBeNull();
    expect(clientIdProblem("  ")).toBeNull();
  });

  it("rejects a pasted secret and inner whitespace", () => {
    expect(clientIdProblem("GOCSPX-fake")).toContain("ile bitmeli");
    expect(clientIdProblem("12 3.apps.googleusercontent.com")).toContain(
      "boşluk",
    );
  });
});
