import fs from "node:fs";
import { Window, type HTMLAnchorElement } from "happy-dom";
import { afterEach, describe, expect, test, vi } from "vitest";

describe.each(["site.js", "generated/site.min.js"])("%s", (filename) => {
  const script = fs.readFileSync(
    new URL(`../site/assets/${filename}`, import.meta.url),
    "utf8",
  );
  const windows: Window[] = [];

  function openSite(reducedMotion = true, prepare?: (window: Window) => void) {
    const window = new Window({ url: "https://seowatcher.io/" });
    windows.push(window);
    window.document.body.innerHTML = `
    <button data-nav-toggle aria-controls="site-menu" aria-expanded="false">Menu</button>
    <nav id="site-menu"><a href="#one">One</a><a href="#two">Two</a></nav>
    <details class="langs"><summary>Language</summary><a href="/en/">English</a></details>`;
    // Run the shipped classic script with reduced motion and without pointer effects.
    const matchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query: string) => {
      const media = matchMedia(query);
      Object.defineProperty(media, "matches", {
        value: reducedMotion && query.includes("prefers-reduced-motion"),
      });
      return media;
    };
    prepare?.(window);
    new Function(
      "window",
      "document",
      "IntersectionObserver",
      "requestAnimationFrame",
      script,
    )(
      window,
      window.document,
      window.IntersectionObserver,
      window.requestAnimationFrame.bind(window),
    );
    return window;
  }

  afterEach(async () => {
    await Promise.all(
      windows.splice(0).map((window) => window.happyDOM.close()),
    );
  });

  test("reduced motion disables JavaScript FAQ animations", () => {
    const animate = vi.fn(() => ({ cancel: vi.fn(), onfinish: null }));
    const window = openSite(true, (window) => {
      window.document.body.insertAdjacentHTML(
        "beforeend",
        `<details class="qa"><summary>Question</summary><div class="qa-body">Answer</div></details>`,
      );
      Object.defineProperty(
        window.document.querySelector(".qa-body"),
        "animate",
        { value: animate },
      );
    });
    window.document.querySelector<HTMLAnchorElement>(".qa summary")!.click();
    expect(window.document.querySelector(".qa")!.hasAttribute("open")).toBe(
      true,
    );
    expect(animate).not.toHaveBeenCalled();
  });

  test("full-screen menu keeps Tab focus inside and Escape returns to its toggle", () => {
    const window = openSite();
    const doc = window.document;
    const toggle = doc.querySelector("button")!;
    const last = doc.querySelectorAll<HTMLAnchorElement>("nav a")[1]!;
    toggle.click();
    last.focus();
    last.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(doc.activeElement).toBe(toggle);
    toggle.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "Tab",
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(doc.activeElement).toBe(last);
    last.dispatchEvent(
      new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
    expect(doc.activeElement).toBe(toggle);
  });

  test("roadmap rail activates when its section enters view", () => {
    const window = openSite(false, (window) => {
      window.document.body.insertAdjacentHTML(
        "beforeend",
        '<section data-roadmap><ol class="roadmap-track"></ol></section>',
      );
      class VisibleIntersectionObserver {
        callback: IntersectionObserverCallback;
        constructor(callback: IntersectionObserverCallback) {
          this.callback = callback;
        }
        observe(target: Element) {
          this.callback(
            [{ target, isIntersecting: true } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
          );
        }
        unobserve() {}
      }
      Object.defineProperty(window, "IntersectionObserver", {
        value: VisibleIntersectionObserver,
      });
    });
    expect(
      window.document.querySelector("[data-roadmap]")!.classList,
    ).toContain("in-view");
  });

  test("language menu closes with Escape even when motion is reduced", () => {
    const window = openSite();
    const details = window.document.querySelector("details")!;
    details.open = true;
    details
      .querySelector("a")!
      .dispatchEvent(
        new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    expect(details.open).toBe(false);
    expect(window.document.activeElement).toBe(
      details.querySelector("summary"),
    );
  });

  test("downloads include Alpha and every installer asset, without animating or caching", async () => {
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          prerelease: true,
          assets: [
            { id: 1, name: "seowatcher-setup-0.5.0.exe", download_count: 12 },
          ],
        },
        {
          assets: [
            { id: 2, name: "seowatcher-setup.exe", download_count: 8 },
            { id: 3, name: "checksums.txt", download_count: 99 },
          ],
        },
        {
          draft: true,
          assets: [{ id: 4, name: "seowatcher-setup.exe", download_count: 90 }],
        },
      ],
    });
    const window = openSite(true, (window) => {
      window.document.body.insertAdjacentHTML(
        "beforeend",
        '<div class="stat" hidden><b data-live="downloads">—</b></div>',
      );
      window.fetch = fetch;
    });
    await vi.waitFor(() =>
      expect(window.document.querySelector("[data-live]")!.textContent).toBe(
        "20",
      ),
    );
    expect(
      window.document.querySelector("[data-live]")!.hasAttribute("data-count"),
    ).toBe(false);
    expect(window.document.querySelector(".stat")!.hasAttribute("hidden")).toBe(
      false,
    );
    expect(fetch.mock.calls[0]![1]).toMatchObject({ cache: "no-store" });
  });

  test("downloads never display a partial total when a later API page fails", async () => {
    const releases = Array.from({ length: 100 }, (_, id) => ({
      assets: [{ id, name: "seowatcher-setup.exe", download_count: 1 }],
    }));
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, json: async () => releases })
      .mockResolvedValueOnce({ ok: false });
    const window = openSite(true, (window) => {
      window.document.body.insertAdjacentHTML(
        "beforeend",
        '<div class="stat" hidden><b data-live="downloads">—</b></div>',
      );
      window.fetch = fetch;
    });
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(window.document.querySelector(".stat")!.hasAttribute("hidden")).toBe(
      true,
    );
    expect(window.document.querySelector("[data-live]")!.textContent).toBe("—");
  });
});
