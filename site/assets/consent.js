/*
 * Google Analytics 4 with basic Consent Mode v2.
 *
 * The measurement id comes from <meta name="ga4-id">, which the site builders
 * fill from `ga4MeasurementId` in scripts/site-locales.mjs. While it is empty
 * this script only adds the footer privacy link: no Google request, no cookie
 * banner, nothing stored.
 *
 * With an id, every consent type starts denied and nothing from Google loads
 * or is sent until the visitor accepts. "Accept" grants analytics storage
 * only, then loads the Google tag; advertising consent is never granted.
 */
(function mountConsent() {
  "use strict";
  // Activate the nonblocking stylesheet before creating any consent UI.
  // A cached sheet is ready immediately; a cold request mounts on load.
  const stylesheet = document.querySelector("link[data-consent-css]");
  if (stylesheet && stylesheet.media !== "all") {
    if (!stylesheet.sheet) {
      stylesheet.addEventListener(
        "load",
        () => {
          stylesheet.media = "all";
          mountConsent();
        },
        { once: true },
      );
      return;
    }
    stylesheet.media = "all";
  }
  const key = "seowatcher-consent-v1";
  const maxAge = 180 * 86400000;
  const copy = {
    tr: {
      title: "Çerez tercihleriniz",
      text: "Siteyi iyileştirmek için, yalnızca izninizle Google Analytics kullanıyoruz. Kabul etmedikçe Google'dan hiçbir şey yüklenmez ve Google'a hiçbir veri gitmez. Reddetseniz de siteyi kullanabilirsiniz.",
      accept: "Kabul et",
      reject: "Reddet",
      settings: "Ayarlar",
      privacy: "Gizlilik",
      privacySlug: "gizlilik",
      optional: "Analiz çerezleri (Google Analytics)",
      required:
        "Tercihiniz bu tarayıcıda 6 ay saklanır. Reklam çerezleri kullanılmaz.",
      save: "Tercihimi kaydet",
      reopen: "Çerez ayarları",
    },
    en: {
      title: "Your cookie choices",
      text: "With your permission, we use Google Analytics to improve this site. Until you accept, nothing from Google loads and no data is sent to Google. You can use the site if you decline.",
      accept: "Accept",
      reject: "Reject",
      settings: "Settings",
      privacy: "Privacy",
      privacySlug: "privacy",
      optional: "Analytics cookies (Google Analytics)",
      required:
        "Your choice is stored in this browser for 6 months. No advertising cookies are used.",
      save: "Save my choice",
      reopen: "Cookie settings",
    },
    de: {
      title: "Ihre Cookie-Auswahl",
      text: "Mit Ihrer Einwilligung verwenden wir Google Analytics, um diese Website zu verbessern. Bis Sie zustimmen, wird nichts von Google geladen und nichts an Google gesendet. Sie können die Website auch ohne Einwilligung nutzen.",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      settings: "Einstellungen",
      privacy: "Datenschutz",
      privacySlug: "datenschutz",
      optional: "Analyse-Cookies (Google Analytics)",
      required:
        "Ihre Auswahl wird 6 Monate in diesem Browser gespeichert. Wir verwenden keine Werbe-Cookies.",
      save: "Auswahl speichern",
      reopen: "Cookie-Einstellungen",
    },
    fr: {
      title: "Vos choix de cookies",
      text: "Avec votre accord, nous utilisons Google Analytics pour améliorer ce site. Tant que vous n’acceptez pas, rien n’est chargé depuis Google et aucune donnée ne lui est envoyée. Vous pouvez utiliser le site en refusant.",
      accept: "Accepter",
      reject: "Refuser",
      settings: "Paramètres",
      privacy: "Confidentialité",
      privacySlug: "confidentialite",
      optional: "Cookies d’analyse (Google Analytics)",
      required:
        "Votre choix est conservé dans ce navigateur pendant 6 mois. Aucun cookie publicitaire n’est utilisé.",
      save: "Enregistrer mon choix",
      reopen: "Paramètres des cookies",
    },
    it: {
      title: "Le tue scelte sui cookie",
      text: "Con il tuo consenso usiamo Google Analytics per migliorare il sito. Finché non accetti, nulla viene caricato da Google e nessun dato gli viene inviato. Puoi usare il sito anche se rifiuti.",
      accept: "Accetta",
      reject: "Rifiuta",
      settings: "Impostazioni",
      privacy: "Privacy",
      privacySlug: "privacy",
      optional: "Cookie di analisi (Google Analytics)",
      required:
        "La scelta viene conservata in questo browser per 6 mesi. Non usiamo cookie pubblicitari.",
      save: "Salva la scelta",
      reopen: "Impostazioni dei cookie",
    },
    pt: {
      title: "As suas escolhas de cookies",
      text: "Com a sua autorização, usamos o Google Analytics para melhorar este site. Enquanto não aceitar, nada é carregado da Google e nenhum dado lhe é enviado. Pode usar o site mesmo que recuse.",
      accept: "Aceitar",
      reject: "Recusar",
      settings: "Definições",
      privacy: "Privacidade",
      privacySlug: "privacidade",
      optional: "Cookies de análise (Google Analytics)",
      required:
        "A sua escolha é guardada neste navegador durante 6 meses. Não usamos cookies de publicidade.",
      save: "Guardar escolha",
      reopen: "Definições de cookies",
    },
  };
  const lang = document.documentElement.lang.split("-")[0];
  const text = copy[lang] || copy.en;
  const prefix = lang === "tr" ? "" : `/${copy[lang] ? lang : "en"}`;

  const footer =
    document.querySelector("footer .bottom") ||
    document.querySelector("footer") ||
    document.body;
  const links = document.createElement("div");
  links.className = "cookie-footer";
  links.innerHTML = `<a href="${prefix}/${text.privacySlug}/">${text.privacy}</a>`;
  footer.append(links);

  const id = (
    document.querySelector('meta[name="ga4-id"]')?.getAttribute("content") || ""
  ).trim();
  if (!/^G-[A-Z0-9]+$/.test(id)) return;

  const denied = {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  // The default must be queued before the Google tag can run.
  window.gtag("consent", "default", denied);

  let choice = null;
  let lastFocus = null;
  try {
    const saved = JSON.parse(window.localStorage.getItem(key));
    if (
      saved &&
      typeof saved.analytics === "boolean" &&
      Number.isFinite(saved.savedAt) &&
      saved.savedAt <= Date.now() &&
      Date.now() - saved.savedAt < maxAge
    )
      choice = saved.analytics;
  } catch {
    /* Unavailable or invalid storage means ask again. */
  }

  function setAnalytics(granted) {
    window.gtag("consent", "update", {
      ...denied,
      analytics_storage: granted ? "granted" : "denied",
    });
  }
  function clearAnalyticsCookies() {
    const names = document.cookie
      .split(";")
      .map((c) => c.trim().split("=")[0])
      .filter((name) => /^_ga(?:_|$)|^_gid$|^_gat/.test(name));
    for (const name of names) {
      for (const domain of [
        "",
        `; domain=${window.location.hostname}`,
        "; domain=.seowatcher.io",
      ]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
      }
    }
  }

  let loaded = false;
  function startAnalytics() {
    setAnalytics(true);
    // Previews and local development must never pollute production reports.
    if (
      loaded ||
      !["seowatcher.io", "www.seowatcher.io"].includes(window.location.hostname)
    )
      return;
    loaded = true;
    window[`ga-disable-${id}`] = false;
    window.gtag("js", new Date());
    window.gtag("config", id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: 33696000,
      cookie_flags: "SameSite=Lax;Secure",
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    script.dataset.consentGoogle = "";
    document.head.append(script);
  }
  function stopAnalytics() {
    setAnalytics(false);
    window[`ga-disable-${id}`] = true;
    clearAnalyticsCookies();
    document.querySelector("[data-consent-google]")?.remove();
  }

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.dataset.consentBanner = "";
  banner.setAttribute("aria-labelledby", "cookie-title");
  banner.setAttribute("aria-live", "polite");
  banner.innerHTML = `<div class="cookie-copy"><h2 id="cookie-title" tabindex="-1">${text.title}</h2><p>${text.text} <a data-consent-privacy href="${prefix}/${text.privacySlug}/">${text.privacy}</a></p><div data-consent-options hidden><label><input type="checkbox" role="switch" data-consent-analytics> ${text.optional}</label><p>${text.required}</p><button type="button" data-consent-save>${text.save}</button></div></div><div class="cookie-actions"><button type="button" data-consent-accept>${text.accept}</button><button type="button" data-consent-reject>${text.reject}</button><button type="button" data-consent-expand aria-expanded="false">${text.settings}</button></div>`;
  document.body.append(banner);
  // Keeps the end of the page reachable above the fixed banner.
  const bannerSpace = document.createElement("div");
  bannerSpace.setAttribute("aria-hidden", "true");
  document.body.append(bannerSpace);
  function syncBannerSpace() {
    if (banner.hidden) bannerSpace.style.height = "0px";
    else if (!window.ResizeObserver)
      bannerSpace.style.height = `${banner.getBoundingClientRect().height + 40}px`;
  }
  if (window.ResizeObserver)
    new window.ResizeObserver((entries) => {
      const box = entries[0]?.borderBoxSize?.[0];
      if (banner.hidden) bannerSpace.style.height = "0px";
      else if (box) bannerSpace.style.height = `${box.blockSize + 40}px`;
    }).observe(banner);

  const checkbox = banner.querySelector("[data-consent-analytics]");
  const options = banner.querySelector("[data-consent-options]");
  const expand = banner.querySelector("[data-consent-expand]");
  function save(analytics) {
    choice = analytics;
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify({ analytics, savedAt: Date.now() }),
      );
    } catch {
      /* The current-page choice still applies. */
    }
    const wasLoaded = loaded;
    if (analytics) startAnalytics();
    else stopAnalytics();
    banner.hidden = true;
    syncBannerSpace();
    if (lastFocus) lastFocus.focus();
    // A fresh document also drops the listeners the Google tag installed.
    if (!analytics && wasLoaded) window.location.reload();
  }
  function showOptions() {
    options.hidden = !options.hidden;
    checkbox.checked = choice === true;
    expand.setAttribute("aria-expanded", String(!options.hidden));
    syncBannerSpace();
  }
  banner
    .querySelector("[data-consent-accept]")
    .addEventListener("click", () => save(true));
  banner
    .querySelector("[data-consent-reject]")
    .addEventListener("click", () => save(false));
  banner
    .querySelector("[data-consent-save]")
    .addEventListener("click", () => save(checkbox.checked));
  expand.addEventListener("click", showOptions);

  const reopen = document.createElement("button");
  reopen.type = "button";
  reopen.dataset.consentSettings = "";
  reopen.textContent = text.reopen;
  links.append(reopen);
  reopen.addEventListener("click", () => {
    lastFocus = reopen;
    banner.hidden = false;
    options.hidden = false;
    checkbox.checked = choice === true;
    expand.setAttribute("aria-expanded", "true");
    banner.querySelector("h2").focus();
    syncBannerSpace();
  });
  banner.hidden = choice !== null;
  syncBannerSpace();
  if (choice === true) startAnalytics();
  else clearAnalyticsCookies();
})();
