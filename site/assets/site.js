// seowatcher site motion. No dependencies; the only network call is the
// GitHub releases API for the download count, refreshed every two minutes.
// Everything degrades to a static page: reduced-motion users and browsers
// without IntersectionObserver see the final state immediately.
(function () {
  "use strict";
  // The page's hidden start states (blocks that rise, titles that wipe in)
  // wait for this class, so without script everything is simply visible.
  document.documentElement.classList.add("js");
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $$ = function (s, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(s));
  };
  // 1. Headlines enter word by word on every device. The animation uses only
  // opacity and transform; it does not measure or rewrite layout on resize.
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
    // A title that wipes in is clipped to nothing until it is shown, and the
    // observer counts the clipped box, so it would never be "visible": its
    // parent is watched in its place. Each watched element lists what it shows.
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            (e.target.__reveal || []).forEach(show);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px 10% 0px", threshold: 0.01 },
    );
    revealables.forEach(function (el) {
      var watched = el.matches("h2.reveal") ? el.parentElement : el;
      (watched.__reveal = watched.__reveal || []).push(el);
      io.observe(watched);
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
    if (reduce) {
      el.textContent = fmt(num) + suffix;
      return;
    }
    function step(t) {
      if (reduce) {
        el.textContent = fmt(num) + suffix;
        return;
      }
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(num * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(num) + suffix;
    }
    requestAnimationFrame(step);
  }

  // 2b. Smaller headings (cards, steps, questions) get their own entrance: a
  //     short rise, and on h3 an amber stroke that draws in underneath. The
  //     class is added here, so without script they are simply there; under
  //     reduced motion the final state is set at once.
  var minor = $$("main h3, main .qa summary");
  if (reduce || !("IntersectionObserver" in window)) {
    minor.forEach(function (el) {
      el.classList.add("hx", "in");
    });
  } else {
    var minorIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          minorIo.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    var q = 0;
    minor.forEach(function (el) {
      el.classList.add("hx");
      // Questions in one list follow each other by a beat.
      if (el.tagName === "SUMMARY")
        el.style.setProperty("--hd", String((q++ % 8) * 50));
      minorIo.observe(el);
    });
  }

  // Installer download events across every public release, including Alpha.
  // Never animate or cache the number per tab: only publish a complete total.
  var live = document.querySelector("[data-live=downloads]");
  if (live && window.fetch) {
    var card = live.closest(".stat");
    var busy = false;
    var lastAttempt = 0;
    var retryAt = 0;
    var refreshDownloads = async function () {
      if (
        busy ||
        document.hidden ||
        Date.now() < retryAt ||
        Date.now() - lastAttempt < 120000
      )
        return;
      busy = true;
      lastAttempt = Date.now();
      var controller = new window.AbortController();
      var timeout = window.setTimeout(function () {
        controller.abort();
      }, 15000);
      try {
        var total = 0;
        var seen = new Set();
        for (var page = 1; ; page++) {
          if (page > 100) throw new Error("Release pagination limit");
          var response = await window.fetch(
            "https://api.github.com/repos/ucsahinn/seotracker/releases?per_page=100&page=" +
              page,
            {
              cache: "no-store",
              signal: controller.signal,
              headers: { Accept: "application/vnd.github+json" },
            },
          );
          if (!response.ok) {
            if (response.status === 403 || response.status === 429) {
              var retrySeconds =
                Number(response.headers.get("retry-after")) || 120;
              var reset =
                Number(response.headers.get("x-ratelimit-reset")) * 1000;
              retryAt = Math.max(Date.now() + retrySeconds * 1000, reset || 0);
            }
            throw new Error("Release API unavailable");
          }
          var releases = await response.json();
          if (!Array.isArray(releases)) throw new Error("Invalid release data");
          releases.forEach(function (release) {
            if (release.draft) return;
            if (!Array.isArray(release.assets))
              throw new Error("Missing assets");
            release.assets.forEach(function (asset) {
              if (
                !/^seowatcher-setup(?:-\d+\.\d+\.\d+(?:-[\w.-]+)?)?\.exe$/i.test(
                  asset.name,
                )
              )
                return;
              if (
                !Number.isSafeInteger(asset.id) ||
                !Number.isSafeInteger(asset.download_count) ||
                asset.download_count < 0
              )
                throw new Error("Invalid download count");
              if (seen.has(asset.id)) return;
              seen.add(asset.id);
              total += asset.download_count;
              if (!Number.isSafeInteger(total))
                throw new Error("Invalid total");
            });
          });
          if (releases.length < 100) break;
        }
        live.textContent = new Intl.NumberFormat(
          document.documentElement.lang || "tr",
        ).format(total);
        live.removeAttribute("data-count");
        card.hidden = false;
        card.classList.add("in");
      } catch (_) {
        // A failed page must never leave a partial or stale total on screen.
        card.hidden = true;
      } finally {
        window.clearTimeout(timeout);
        busy = false;
      }
    };
    refreshDownloads();
    window.setInterval(refreshDownloads, 120000);
    document.addEventListener("visibilitychange", refreshDownloads);
  }

  // Run the diagram's signal paths only while the diagram is on screen. The
  // CSS reduced-motion rule leaves them static for users who request less motion.
  var flow = document.querySelector(".flow");
  if (flow && !reduce) {
    if ("IntersectionObserver" in window) {
      var flowObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            flow.classList.toggle("in-view", entry.isIntersecting);
          });
        },
        { rootMargin: "-12% 0px -12% 0px", threshold: 0.01 },
      );
      flowObserver.observe(flow);
    } else {
      flow.classList.add("in-view");
    }
  }

  // Draw the roadmap rail only when its section enters view.
  var roadmap = document.querySelector("[data-roadmap]");
  if (roadmap && !reduce) {
    if ("IntersectionObserver" in window) {
      var roadmapObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            roadmap.classList.toggle("in-view", entry.isIntersecting);
          });
        },
        { rootMargin: "-12% 0px -12% 0px", threshold: 0.01 },
      );
      roadmapObserver.observe(roadmap);
    } else {
      roadmap.classList.add("in-view");
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
      if (reduce) {
        raf = 0;
        return;
      }
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
        if (reduce) return;
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
      if (!document.documentElement.classList.contains("nav-open")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setMenu(false);
      } else if (e.key === "Tab") {
        var controls = [navToggle].concat($$("a[href]", menu));
        var index = controls.indexOf(document.activeElement);
        if (e.shiftKey && index <= 0) {
          e.preventDefault();
          controls[controls.length - 1].focus();
        } else if (
          !e.shiftKey &&
          (index === controls.length - 1 || index < 0)
        ) {
          e.preventDefault();
          navToggle.focus();
        }
      }
    });
    window
      .matchMedia("(min-width: 861px)")
      .addEventListener("change", function (e) {
        if (e.matches) {
          document.documentElement.classList.remove("nav-open");
          navToggle.setAttribute("aria-expanded", "false");
        }
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
      if (running) running.cancel();
      if (reduce) {
        running = null;
        body.style.height = "";
        return;
      }
      e.preventDefault();
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

  // Keyboard and touch interactions must also work without pointer effects.
  $$(".langs").forEach(function (d) {
    document.addEventListener("click", function (e) {
      if (d.open && !d.contains(e.target)) d.open = false;
    });
    d.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        d.open = false;
        d.querySelector("summary").focus();
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
    if (reduce) return;
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
        var k = 0.1;
        el.style.transform =
          "translate(" +
          Math.max(-4, Math.min(4, dx * k)).toFixed(1) +
          "px," +
          Math.max(-4, Math.min(4, dy * k)).toFixed(1) +
          "px)";
      } else if (el.style.transform) {
        el.style.transform = "";
      }
    });
  }
  window.addEventListener(
    "pointermove",
    function (e) {
      if (reduce) return;
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    },
    { passive: true },
  );
})();
