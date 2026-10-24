import fs from "node:fs";
import {
  Window,
  type HTMLButtonElement,
  type HTMLElement,
  type HTMLAnchorElement,
} from "happy-dom";
import { afterEach, describe, expect, test, vi } from "vitest";

describe.each(["consent.js", "generated/consent.min.js"])("%s", (filename) => {
  const windows: Window[] = [];
  const scriptPath = new URL(`../site/assets/${filename}`, import.meta.url);
  const script = fs.existsSync(scriptPath)
    ? fs.readFileSync(scriptPath, "utf8")
    : "";
  const key = "seowatcher-consent-v1";

  function openSite(
    choice?: { analytics: boolean; savedAt: number },
    lang = "tr",
  ) {
    const window = new Window({ url: "https://seowatcher.io/" });
    windows.push(window);
    window.document.documentElement.lang = lang;
    window.document.body.innerHTML = "<main>Content</main><footer></footer>";
    if (choice) window.localStorage.setItem(key, JSON.stringify(choice));
    // Execute the shipped classic browser script, with its actual DOM and storage.
    new Function("window", "document", script)(window, window.document);
    return window;
  }

  afterEach(async () => {
    await Promise.all(
      windows.splice(0).map((window) => window.happyDOM.close()),
    );
  });

  test("rejecting optional analytics keeps Google scripts absent and remembers the choice", () => {
    const window = openSite();
    expect(
      window.document.querySelector("[data-consent-banner]"),
    ).not.toBeNull();
    expect(
      window.document.querySelector('script[src*="googletagmanager"]'),
    ).toBeNull();
    window.document
      .querySelector<HTMLButtonElement>("[data-consent-reject]")
      ?.click();
    expect(JSON.parse(window.localStorage.getItem(key) || "{}").analytics).toBe(
      false,
    );
    expect(
      window.document.querySelector('script[src*="googletagmanager"]'),
    ).toBeNull();
    expect(
      window.document.querySelector<HTMLElement>("[data-consent-banner]")
        ?.hidden,
    ).toBe(true);
  });

  test("accepting analytics loads one Google tag with advertising consent denied", () => {
    const window = openSite();
    window.document
      .querySelector<HTMLButtonElement>("[data-consent-accept]")
      ?.click();
    window.document
      .querySelector<HTMLButtonElement>("[data-consent-settings]")
      ?.click();
    window.document
      .querySelector<HTMLButtonElement>("[data-consent-accept]")
      ?.click();
    expect(
      window.document.querySelectorAll('script[src*="googletagmanager"]'),
    ).toHaveLength(1);
    const queue = (window as unknown as { dataLayer: IArguments[] }).dataLayer;
    const commands = queue.map((args) => Array.from(args));
    expect(commands[0]).toEqual([
      "consent",
      "default",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(commands).toContainEqual([
      "consent",
      "update",
      {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
  });

  test("expired consent asks again instead of loading Analytics", () => {
    const window = openSite({
      analytics: true,
      savedAt: Date.now() - 181 * 86400000,
    });
    expect(
      window.document.querySelector('script[src*="googletagmanager"]'),
    ).toBeNull();
    expect(
      window.document.querySelector<HTMLElement>("[data-consent-banner]")
        ?.hidden,
    ).toBe(false);
  });

  test("withdrawing consent disables collection and removes GA cookies", async () => {
    const window = openSite({ analytics: true, savedAt: Date.now() });
    window.document.cookie = "_ga=test; path=/";
    window.document.cookie = "_ga_DFPDX00V4R=test; path=/";
    window.document
      .querySelector<HTMLButtonElement>("[data-consent-settings]")
      ?.click();
    window.document
      .querySelector<HTMLButtonElement>("[data-consent-reject]")
      ?.click();
    expect(
      (window as unknown as Record<string, unknown>)["ga-disable-G-DFPDX00V4R"],
    ).toBe(true);
    // happy-dom expires Max-Age=0 only after its creation millisecond.
    await vi.waitFor(() => expect(window.document.cookie).not.toContain("_ga"));
    expect(JSON.parse(window.localStorage.getItem(key) || "{}").analytics).toBe(
      false,
    );
  });

  test.each(["tr", "en", "de", "fr", "it", "pt"])(
    "%s exposes a local privacy link and keyboard-operable settings",
    (lang) => {
      const window = openSite(undefined, lang);
      const expected = lang === "tr" ? "/privacy/" : `/${lang}/privacy/`;
      expect(
        window.document
          .querySelector<HTMLAnchorElement>("[data-consent-privacy]")
          ?.getAttribute("href"),
      ).toBe(expected);
      expect(
        window.document.querySelector("button[data-consent-settings]"),
      ).not.toBeNull();
    },
  );
});
