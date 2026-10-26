// Guide pages. No network, no state, no dependencies; everything degrades to
// the static page (the markup already carries the content and the links).
(function () {
  "use strict";
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $$ = function (s, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(s));
  };

  // 0. Article headings enter once, as they scroll into view. The class is
  //     added here, so without script (or without motion) they never hide.
  if (!reduce && "IntersectionObserver" in window) {
    var heads = $$("article h1, article h2, article h3");
    var headIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          headIo.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    heads.forEach(function (h) {
      h.classList.add("hx");
      headIo.observe(h);
    });
  }

  // 1. The sidebar is a disclosure on narrow screens, always open on wide ones.
  var side = document.querySelector("details.side-dd");
  var narrow = window.matchMedia("(max-width: 800px)");
  if (side) {
    var syncSide = function () {
      if (narrow.matches) side.removeAttribute("open");
      else side.setAttribute("open", "");
    };
    syncSide();
    if (narrow.addEventListener) narrow.addEventListener("change", syncSide);
  }

  // 2. "Bu sayfada": the heading nearest the top of the viewport is current.
  var tocLinks = $$(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) {
      byId[a.getAttribute("href").slice(1)] = a;
    });
    var headings = $$("article h2[id]").filter(function (h) {
      return byId[h.id];
    });
    var current = null;
    var setCurrent = function (id) {
      if (current === id) return;
      current = id;
      tocLinks.forEach(function (a) {
        var on = a.getAttribute("href") === "#" + id;
        a.classList.toggle("current", on);
        if (on) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };
    var visible = {};
    var pick = function () {
      // At the very bottom the last heading is current even when its section
      // is too short to ever reach the top band.
      var doc = document.documentElement;
      if (
        doc.scrollHeight > window.innerHeight + 2 &&
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2
      ) {
        setCurrent(headings[headings.length - 1].id);
        return;
      }
      // The first heading in document order that is in the top band wins; when
      // none is, keep the last one that scrolled past the top.
      var inBand = headings.filter(function (h) {
        return visible[h.id];
      });
      if (inBand.length) {
        setCurrent(inBand[0].id);
        return;
      }
      var above = null;
      headings.forEach(function (h) {
        if (h.getBoundingClientRect().top < 120) above = h;
      });
      if (above) setCurrent(above.id);
    };
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          visible[e.target.id] = e.isIntersecting;
        });
        pick();
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );
    headings.forEach(function (h) {
      io.observe(h);
    });
    window.addEventListener("scroll", pick, { passive: true });
    if (headings[0]) setCurrent(headings[0].id);
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function (e) {
        var target = document.getElementById(a.getAttribute("href").slice(1));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        });
        if (!target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        history.replaceState(null, "", a.getAttribute("href"));
      });
    });
  }

  // 3. Copy button on every code block. Labels come from the page (data-copy*
  //    on <main>), so the same script serves both languages.
  var main = document.querySelector("main");
  if (navigator.clipboard && main) {
    var labels = {
      copy: main.getAttribute("data-copy") || "Copy",
      copied: main.getAttribute("data-copied") || "Copied",
      failed: main.getAttribute("data-copy-failed") || "Copy failed",
      label: main.getAttribute("data-copy-label") || "Copy code",
    };
    $$("article .code").forEach(function (box) {
      var code = box.querySelector("pre code");
      if (!code) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy";
      // The announcement lives in its own hidden status element: a live
      // region on a button whose name is an aria-label is read unreliably.
      var status = document.createElement("span");
      status.className = "sr-only";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      var setState = function (text, cls) {
        btn.textContent = text;
        btn.setAttribute("aria-label", labels.label + ": " + text);
        btn.className = "copy" + (cls ? " " + cls : "");
        status.textContent = cls ? text : "";
      };
      setState(labels.copy, "");
      var timer = null;
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(code.textContent).then(
          function () {
            setState(labels.copied, "done");
            clearTimeout(timer);
            timer = setTimeout(function () {
              setState(labels.copy, "");
            }, 1600);
          },
          function () {
            setState(labels.failed, "failed");
            clearTimeout(timer);
            timer = setTimeout(function () {
              setState(labels.copy, "");
            }, 2400);
          },
        );
      });
      box.classList.add("has-copy");
      box.appendChild(btn);
      box.appendChild(status);
    });
  }

  // Dot field: the lit circle trails the pointer. Only with a fine pointer,
  // only while the pointer is over the page, and never under reduced motion
  // or the "stop motion" toggle (CSS hides the layer for those; this just
  // avoids the work).
  var dots = document.querySelector(".dots");
  if (
    dots &&
    !reduce &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    var tx = window.innerWidth / 2,
      ty = window.innerHeight * 0.3,
      cx = tx,
      cy = ty,
      raf = 0;
    var tick = function () {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      dots.style.setProperty("--mx", cx.toFixed(1) + "px");
      dots.style.setProperty("--my", cy.toFixed(1) + "px");
      raf =
        Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    };
    document.addEventListener(
      "pointermove",
      function (e) {
        tx = e.clientX;
        ty = e.clientY;
        dots.classList.add("live");
        if (!raf) raf = requestAnimationFrame(tick);
      },
      { passive: true },
    );
    document.addEventListener("pointerleave", function () {
      dots.classList.remove("live");
    });
  }

  // The language menu closes when the pointer leaves it or Escape is pressed.
  $$(".langs").forEach(function (d) {
    document.addEventListener("click", function (e) {
      if (d.open && !d.contains(e.target)) d.open = false;
    });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape") d.open = false;
    });
  });
})();
