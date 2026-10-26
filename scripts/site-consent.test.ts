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
  const id = "G-TEST123";

  function openSite({
    choice,
    lang = "tr",
    ga4 = id,
  }: {
    choice?: { analytics: boolean; savedAt: number };
    lang?: string;
    ga4?: string;
  } = {}) {
    const window = new Window({ url: "https://seowatcher.io/" });
    windows.push(window);
    window.document.documentElement.lang = lang;
    window.document.head.innerHTML = `<meta name="ga4-id" content="${ga4}">`;
    window.document.body.innerHTML = "<main>Content</main><footer></footer>";
    if (choice) window.localStorage.setItem(key, JSON.stringify(choice));
    // Execute the shipped classic browser script, with its actual DOM and storage.
    new Function("window", "document", script)(window, window.document);
    return window;
  }
  const googleTags = (window: Window) =>
    window.document.querySelectorAll('script[src*="googletagmanager"]');
  const commands = (window: Window) =>
    ((window as unknown as { dataLayer?: IArguments[] }).dataLayer ?? []).map(
      (args) => Array.from(args),
    );
  const analytics = (state: "granted" | "denied") => [
    "consent",
    "update",
    {
      analytics_storage: state,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ];
  const click = (window: Window, selector: string) =>
    window.document.querySelector<HTMLButtonElement>(selector)?.click();

  afterEach(async () => {
    await Promise.all(
      windows.splice(0).map((window) => window.happyDOM.close()),
    );
  });

  test("without a measurement id nothing reaches Google and no banner shows", () => {
    const window = openSite({ ga4: "" });
    expect(googleTags(window)).toHaveLength(0);
    expect(commands(window)).toEqual([]);
    expect(window.document.querySelector("[data-consent-banner]")).toBeNull();
    expect(window.document.querySelector("[data-consent-settings]")).toBeNull();
    expect(window.localStorage.getItem(key)).toBeNull();
    expect(
      window.document.querySelector(".cookie-footer a")?.getAttribute("href"),
    ).toBe("/gizlilik/");
  });

  test("before consent nothing from Google loads and every type is denied", () => {
    const window = openSite();
    expect(googleTags(window)).toHaveLength(0);
    expect(commands(window)).toHaveLength(1);
    expect(commands(window)[0]).toEqual([
      "consent",
      "default",
      {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
    ]);
    expect(commands(window)).not.toContainEqual(analytics("granted"));
    expect(
      window.document.querySelector<HTMLElement>("[data-consent-banner]")
        ?.hidden,
    ).toBe(false);
  });

  test("rejecting keeps analytics storage denied and remembers the choice", () => {
    const window = openSite();
    click(window, "[data-consent-reject]");
    expect(JSON.parse(window.localStorage.getItem(key) || "{}").analytics).toBe(
      false,
    );
    expect(googleTags(window)).toHaveLength(0);
    expect(commands(window)).toContainEqual(analytics("denied"));
    expect(commands(window)).not.toContainEqual(analytics("granted"));
    expect(
      window.document.querySelector<HTMLElement>("[data-consent-banner]")
        ?.hidden,
    ).toBe(true);
  });

  test("accepting grants analytics storage only, with one Google tag", () => {
    const window = openSite();
    click(window, "[data-consent-accept]");
    click(window, "[data-consent-settings]");
    click(window, "[data-consent-accept]");
    expect(googleTags(window)).toHaveLength(1);
    expect(googleTags(window)[0].getAttribute("src")).toContain(`id=${id}`);
    expect(commands(window)).toContainEqual(analytics("granted"));
  });

  test("expired consent asks again instead of granting analytics", () => {
    const window = openSite({
      choice: { analytics: true, savedAt: Date.now() - 181 * 86400000 },
    });
    expect(commands(window)).not.toContainEqual(analytics("granted"));
    expect(googleTags(window)).toHaveLength(0);
    expect(
      window.document.querySelector<HTMLElement>("[data-consent-banner]")
        ?.hidden,
    ).toBe(false);
  });

  test("withdrawing consent stops Analytics and removes GA cookies", async () => {
    const window = openSite({
      choice: { analytics: true, savedAt: Date.now() },
    });
    expect(commands(window)).toContainEqual(analytics("granted"));
    window.document.cookie = "_ga=test; path=/";
    window.document.cookie = "_ga_TEST123=test; path=/";
    click(window, "[data-consent-settings]");
    click(window, "[data-consent-reject]");
    expect(commands(window).at(-1)).toEqual(analytics("denied"));
    expect(googleTags(window)).toHaveLength(0);
    expect(
      (window as unknown as Record<string, unknown>)[`ga-disable-${id}`],
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
      const window = openSite({ lang });
      const slugs: Record<string, string> = {
        tr: "gizlilik",
        en: "privacy",
        de: "datenschutz",
        fr: "confidentialite",
        it: "privacy",
        pt: "privacidade",
      };
      const expected = `${lang === "tr" ? "" : `/${lang}`}/${slugs[lang]}/`;
      expect(
        window.document
          .querySelector<HTMLAnchorElement>("[data-consent-privacy]")
          ?.getAttribute("href"),
      ).toBe(expected);
      expect(
        window.document.querySelector(".cookie-footer a")?.getAttribute("href"),
      ).toBe(expected);
      expect(
        window.document.querySelector("button[data-consent-settings]"),
      ).not.toBeNull();
    },
  );
});
