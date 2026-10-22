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
        history.replaceState(null, "", a.getAttribute("href"));
      });
    });
  }

  // 3. Copy button on every code block.
  if (navigator.clipboard) {
    $$("article pre").forEach(function (pre) {
      var code = pre.querySelector("code");
      if (!code) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy";
      btn.textContent = "Kopyala";
      btn.setAttribute("aria-label", "Kodu kopyala");
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(code.textContent).then(
          function () {
            btn.textContent = "Kopyalandı";
            btn.classList.add("done");
            setTimeout(function () {
              btn.textContent = "Kopyala";
              btn.classList.remove("done");
            }, 1600);
          },
          function () {
            btn.textContent = "Kopyalanamadı";
          },
        );
      });
      pre.classList.add("has-copy");
      pre.appendChild(btn);
    });
  }
})();
