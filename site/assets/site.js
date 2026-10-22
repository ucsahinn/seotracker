// seowatcher site: two small behaviours, no network, no state.
// 1. Elements with .reveal enter once when they scroll into view.
// 2. The header grows a hairline once the page has scrolled past the top.
(function () {
  "use strict";
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    items.forEach(function (el) {
      io.observe(el);
    });
    // Anything already in view at load appears without waiting for a scroll.
    requestAnimationFrame(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
      });
    });
  }

  var header = document.querySelector("header");
  var top = document.getElementById("top");
  if (header && top && "IntersectionObserver" in window) {
    var sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:1px;";
    document.body.style.position = "relative";
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(
      function (entries) {
        header.classList.toggle("scrolled", !entries[0].isIntersecting);
      },
      { rootMargin: "-8px 0px 0px 0px" },
    ).observe(sentinel);
  }
})();
