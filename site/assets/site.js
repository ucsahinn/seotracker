// seowatcher site motion. No network, no state, no dependencies.
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
    function fmt(v) {
      var s = v.toFixed(decimals).replace(".", ",");
      var parts = s.split(",");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return parts.join(",");
    }
    function step(t) {
      if (start === null) start = t;
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(num * e) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
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
      still.textContent = on ? "Hareketi başlat" : "Hareketi durdur";
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
})();
