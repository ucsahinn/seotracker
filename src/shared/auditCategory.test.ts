import { describe, expect, it } from "vitest";
import { AUDIT_CATEGORIES, AUDIT_CATEGORY_LABEL } from "./auditCategory";
import { en } from "./i18n/en";

describe("AUDIT_CATEGORY_LABEL", () => {
  /*
   * The labels reach t() through a map, where the i18n check cannot see
   * them: "Sosyal ve yapılandırılmış veri" stayed Turkish on the English
   * screen with every check green.
   */
  it("has an English entry for every category", () => {
    for (const category of AUDIT_CATEGORIES) {
      expect(en[AUDIT_CATEGORY_LABEL[category]], category).toBeTypeOf("string");
    }
  });
});
