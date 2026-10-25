import { Script } from "node:vm";
import { describe, expect, it } from "vitest";
import { adminPage } from "./admin";

describe("announcement admin page", () => {
  it("shows authentication failures outside the hidden editor", () => {
    const authFormEnd = adminPage.indexOf(
      "</form>",
      adminPage.indexOf('id="auth"'),
    );
    const authNoticeStart = adminPage.indexOf('id="auth-notice"');
    const editorStart = adminPage.indexOf('id="editor"');

    expect(authFormEnd).toBeGreaterThan(-1);
    expect(authNoticeStart).toBeGreaterThan(authFormEnd);
    expect(authNoticeStart).toBeLessThan(editorStart);
    expect(adminPage).toContain(
      "const authNotice = document.querySelector('#auth-notice');",
    );
    expect(adminPage).toContain("authNotice.textContent = error.message;");
    expect(adminPage).toContain("if (response.status === 401)");
    expect(adminPage).toContain(
      "Bu Worker için tanımlı ADMIN_TOKEN değerini kullanın.",
    );
  });

  it("offers bilingual content, interaction controls, history filters, and response review", () => {
    expect(adminPage).toContain('name="titleTr"');
    expect(adminPage).toContain('name="titleEn"');
    expect(adminPage).not.toContain('name="titleDe"');
    expect(adminPage).not.toContain('name="bodyFr"');
    expect(adminPage).toContain('name="interactionType"');
    expect(adminPage).toContain('value="poll"');
    expect(adminPage).toContain('value="question"');
    expect(adminPage).toContain('id="status-filter"');
    expect(adminPage).toContain('id="search"');
    expect(adminPage).toContain('id="responses"');
    expect(adminPage).toContain(
      'id="response-status" role="status" aria-live="polite"',
    );
    expect(adminPage).toContain("async function loadSafely()");
    expect(adminPage).toContain(
      "Yazılı yanıtlar yöneticiler tarafından görülebilir.",
    );
    expect(adminPage).toContain(
      "genellikle birkaç dakika içinde bildirim olarak görünür",
    );
    expect(adminPage).toContain("/clone");
    expect(adminPage).toContain("/responses");
    expect(adminPage).toContain('id="previous-response-page"');
    expect(adminPage).toContain('id="next-response-page"');
    expect(adminPage).toContain("responsePage + '&limit=50'");
    expect(adminPage).toContain(
      "edit.disabled = hasResponses || immutablePublishedInteraction",
    );
    expect(adminPage).toContain("Yeni bir taslak kopyalayın.");
  });

  it("contains syntactically valid browser code", () => {
    const script = /<script>([\s\S]*?)<\/script>/.exec(adminPage)?.[1];
    expect(script).toBeTruthy();
    expect(() => new Script(script!)).not.toThrow();
  });

  it("keeps stale poll choices out of non-poll submissions and shows field errors", () => {
    expect(adminPage).toContain("options: interactionType.value === 'poll'");
    expect(adminPage).toContain(
      "Array.from(optionList.querySelectorAll('.option-row'))",
    );
    expect(adminPage).toContain("Array.isArray(data.issues)");
    expect(adminPage).toContain('name="publishNow" type="checkbox"');
    expect(adminPage).toContain(
      "const publishNow = form.get('publishNow') === 'on'",
    );
    expect(adminPage).toContain("Anket için en az iki seçenek gerekli.");
  });

  it("resets conditional interaction validation after saving or cancelling", () => {
    expect(adminPage).toContain("function resetComposer()");
    expect(adminPage).toContain("interactionType.value = 'none';");
    expect(adminPage).toContain("updateInteractionFields();");
    expect(adminPage.match(/resetComposer\(\);/g)).toHaveLength(2);
  });
});
