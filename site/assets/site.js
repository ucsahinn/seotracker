// seowatcher site motion. No dependencies; the only network call is the
// GitHub releases API for the download count, cached per tab in sessionStorage.
// Everything degrades to a static page: reduced-motion users and browsers
// without IntersectionObserver see the final state immediately.
(function () {
  "use strict";
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $$ = function (s, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(s));
  };

  // 1. Headlines enter word by word.
  $$("[data-words]").forEach(function (el) {
    if (reduce) return;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (w, i) {
      var s = document.createElement("span");
      s.className = "w";
      s.style.setProperty("--i", i);
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.classList.add("split");
    // Hand each word its slice of the headline gradient (see the CSS).
    var slice = function () {
      var box = el.getBoundingClientRect();
      el.style.setProperty("--hw", Math.round(box.width) + "px");
      $$(".w", el).forEach(function (w) {
        w.style.setProperty(
          "--ox",
          Math.round(w.getBoundingClientRect().left - box.left),
        );
      });
    };
    slice();
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(slice, 120);
    });
  });

  // 2. Reveal on scroll, once.
  var revealables = $$(".reveal");
  function show(el) {
    el.classList.add("in");
    $$("[data-count]", el).forEach(count);
    if (el.hasAttribute("data-count")) count(el);
  }
  if (reduce || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("in");
    });
    $$("[data-count]").forEach(function (el) {
      el.textContent =
        el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0.01 },
    );
    revealables.forEach(function (el) {
      io.observe(el);
    });
    requestAnimationFrame(function () {
      revealables.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          show(el);
          io.unobserve(el);
        }
      });
    });
  }

  // 3. Numbers count up from zero to data-count (Turkish formatting kept as written).
  function count(el) {
    if (el.getAttribute("data-counted")) return;
    el.setAttribute("data-counted", "1");
    var target = el.getAttribute("data-count");
    var num = parseFloat(target.replace(/\./g, "").replace(",", "."));
    var decimals = (target.split(",")[1] || "").length;
    var suffix = el.getAttribute("data-suffix") || "";
    var start = null,
      dur = 1400;
    // Separators follow the page language (1.085,5 in Turkish and German,
    // 1,085.5 in English, 1 085,5 in French).
    var nf = new Intl.NumberFormat(document.documentElement.lang || "tr", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    function fmt(v) {
      return nf.format(v);
    }
    function step(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(num * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(num) + suffix;
    }
    requestAnimationFrame(step);
  }

  // 3b. Live download count from GitHub releases (sum of every installer asset).
  //     Cached for an hour per tab; the card stays hidden until a number exists.
  var live = document.querySelector("[data-live=downloads]");
  if (live && window.fetch) {
    var card = live.closest(".stat");
    var key = "seowatcher-downloads";
    // A small number reads as "nobody uses this"; the card waits until the
    // count says something.
    var showDownloads = function (n) {
      if (!(n >= 100)) return;
      live.setAttribute("data-count", String(n));
      live.removeAttribute("data-counted");
      card.hidden = false;
      if (reduce || card.classList.contains("in")) {
        card.classList.add("in");
        count(live);
      }
    };
    var cached = null;
    try {
      var c = JSON.parse(sessionStorage.getItem(key));
      if (c && Date.now() - c.t < 3600000) cached = c.n;
    } catch (e) {}
    if (cached !== null) showDownloads(cached);
    else {
      fetch(
        "https://api.github.com/repos/ucsahinn/seotracker/releases?per_page=100",
        { headers: { Accept: "application/vnd.github+json" } },
      )
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (releases) {
          if (!releases) return;
          var n = 0;
          releases.forEach(function (rel) {
            (rel.assets || []).forEach(function (a) {
              if (/^seowatcher-setup.*\.exe$/.test(a.name))
                n += a.download_count || 0;
            });
          });
          try {
            sessionStorage.setItem(
              key,
              JSON.stringify({ t: Date.now(), n: n }),
            );
          } catch (e) {}
          showDownloads(n);
        })
        .catch(function () {});
    }
  }

  // 4. Header hairline once scrolled.
  var header = document.querySelector("header");
  if (header && "IntersectionObserver" in window) {
    var sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:1px;";
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle("scrolled", !entries[0].isIntersecting);
      },
      { rootMargin: "-8px 0px 0px 0px" },
    ).observe(sentinel);
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

  // 5. One control pauses every looping animation (WCAG 2.2.2). Remembered per browser.
  var still = document.querySelector("[data-still-toggle]");
  if (still) {
    var key = "seowatcher-still";
    var saved = false;
    try {
      saved = localStorage.getItem(key) === "1";
    } catch (e) {}
    var apply = function (on) {
      document.documentElement.toggleAttribute("data-still", on);
      still.setAttribute("aria-pressed", String(on));
      still.textContent = on
        ? still.getAttribute("data-still-on") || "Play motion"
        : still.getAttribute("data-still-off") || "Pause motion";
    };
    still.hidden = false;
    apply(saved);
    still.addEventListener("click", function () {
      var on = !document.documentElement.hasAttribute("data-still");
      apply(on);
      try {
        localStorage.setItem(key, on ? "1" : "0");
      } catch (e) {}
    });
  }

  // 5b. Island navigation: the toggle opens a full-screen menu on narrow
  //     screens. Escape and any menu link close it; focus goes in and comes back.
  var navToggle = document.querySelector("[data-nav-toggle]");
  var menu =
    navToggle &&
    document.getElementById(
      navToggle.getAttribute("aria-controls") || "site-menu",
    );
  if (navToggle && menu) {
    var setMenu = function (open) {
      document.documentElement.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      } else {
        navToggle.focus();
      }
    };
    navToggle.addEventListener("click", function () {
      setMenu(!document.documentElement.classList.contains("nav-open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        document.documentElement.classList.contains("nav-open")
      )
        setMenu(false);
    });
  }

  // 5c. Scroll-pinned walkthrough: the step in the middle of the viewport is
  //     the active one; the stage shows its screenshot and the rail fills.
  var walk = document.querySelector("[data-walk]");
  if (walk && "IntersectionObserver" in window) {
    var steps = $$(".walk-step", walk);
    var shots = $$(".walk-shot", walk);
    var wide = window.matchMedia("(min-width: 900px)");
    var walkIo = null;
    var activate = function (step) {
      var id = step.getAttribute("data-step");
      steps.forEach(function (s) {
        s.classList.toggle("is-active", s === step);
      });
      shots.forEach(function (s) {
        s.classList.toggle("is-active", s.getAttribute("data-step") === id);
      });
      var index = steps.indexOf(step);
      walk.style.setProperty(
        "--walk-progress",
        steps.length > 1 ? String(index / (steps.length - 1)) : "1",
      );
    };
    var setupWalk = function () {
      if (walkIo) {
        walkIo.disconnect();
        walkIo = null;
      }
      if (!wide.matches) {
        steps.forEach(function (s) {
          s.classList.remove("is-active");
        });
        walk.style.removeProperty("--walk-progress");
        return;
      }
      if (steps[0]) activate(steps[0]);
      walkIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) activate(e.target);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      steps.forEach(function (s) {
        walkIo.observe(s);
      });
    };
    setupWalk();
    if (wide.addEventListener) wide.addEventListener("change", setupWalk);
    else if (wide.addListener) wide.addListener(setupWalk);
  }

  // 5d. Questions: <details> opens and closes with a height animation.
  $$("details.qa").forEach(function (qa) {
    var body = qa.querySelector(".qa-body");
    var summary = qa.querySelector("summary");
    if (!body || !summary || reduce || !body.animate) return;
    var easing = "cubic-bezier(0.32, 0.72, 0, 1)";
    var running = null;
    summary.addEventListener("click", function (e) {
      e.preventDefault();
      if (running) running.cancel();
      if (qa.open) {
        var h = body.offsetHeight;
        running = body.animate(
          [
            { height: h + "px", opacity: 1 },
            { height: "0px", opacity: 0 },
          ],
          { duration: 280, easing: easing },
        );
        running.onfinish = function () {
          qa.open = false;
          running = null;
          body.style.height = "";
        };
      } else {
        qa.open = true;
        var target = body.offsetHeight;
        running = body.animate(
          [
            { height: "0px", opacity: 0 },
            { height: target + "px", opacity: 1 },
          ],
          { duration: 320, easing: easing },
        );
        running.onfinish = function () {
          running = null;
        };
      }
    });
  });

  if (reduce || !finePointer) return;

  // 6. Pointer-driven depth: the hero window tilts a little toward the cursor,
  //    cards get a spotlight that follows it, buttons lean toward it.
  var raf = null,
    px = 0,
    py = 0;
  var tilts = $$("[data-tilt]");
  var spots = $$("[data-spot]");
  var magnets = $$("[data-magnet]");
  function frame() {
    raf = null;
    tilts.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var cx = r.left + r.width / 2,
        cy = r.top + r.height / 2;
      var dx = (px - cx) / r.width,
        dy = (py - cy) / r.height;
      var inside = Math.abs(dx) < 0.75 && Math.abs(dy) < 0.75;
      var max = parseFloat(el.getAttribute("data-tilt")) || 4;
      el.style.setProperty("--ry", (inside ? dx * max : 0).toFixed(2) + "deg");
      el.style.setProperty("--rx", (inside ? -dy * max : 0).toFixed(2) + "deg");
    });
    spots.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      el.style.setProperty("--mx", px - r.left + "px");
      el.style.setProperty("--my", py - r.top + "px");
    });
    magnets.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var cx = r.left + r.width / 2,
        cy = r.top + r.height / 2;
      var dx = px - cx,
        dy = py - cy,
        d = Math.hypot(dx, dy);
      var reach = 56;
      if (d < r.width / 2 + reach) {
        var k = 0.22;
        el.style.transform =
          "translate(" +
          (dx * k).toFixed(1) +
          "px," +
          (dy * k).toFixed(1) +
          "px)";
      } else if (el.style.transform) {
        el.style.transform = "";
      }
    });
  }
  window.addEventListener(
    "pointermove",
    function (e) {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );

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
