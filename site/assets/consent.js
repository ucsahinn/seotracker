/* Basic Consent Mode v2: no Google resource is loaded before opt-in. */
(() => {
  "use strict";
  const id = "G-DFPDX00V4R";
  const key = "seowatcher-consent-v1";
  const maxAge = 180 * 86400000;
  const copy = {
    tr: {
      title: "Çerez tercihleriniz",
      text: "Site kullanımını ve indirmeleri anlamak için, yalnızca izninizle Google Analytics kullanıyoruz. Reddetseniz de siteyi kullanabilirsiniz.",
      accept: "Kabul et",
      reject: "Reddet",
      settings: "Ayarlar",
      privacy: "Gizlilik",
      optional: "İsteğe bağlı kullanım ölçümü (Google Analytics)",
      required:
        "Tercihiniz bu tarayıcıda 6 ay saklanır. Reklam çerezleri kullanılmaz.",
      save: "Tercihimi kaydet",
      reopen: "Çerez ayarları",
    },
    en: {
      title: "Your cookie choices",
      text: "With your permission, we use Google Analytics to understand site usage and downloads. You can use the site if you decline.",
      accept: "Accept",
      reject: "Reject",
      settings: "Settings",
      privacy: "Privacy",
      optional: "Optional usage measurement (Google Analytics)",
      required:
        "Your choice is stored in this browser for 6 months. No advertising cookies are used.",
      save: "Save my choice",
      reopen: "Cookie settings",
    },
    de: {
      title: "Ihre Cookie-Auswahl",
      text: "Mit Ihrer Einwilligung verwenden wir Google Analytics, um die Nutzung und Downloads zu verstehen. Sie können die Website auch ohne Einwilligung nutzen.",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      settings: "Einstellungen",
      privacy: "Datenschutz",
      optional: "Optionale Nutzungsmessung (Google Analytics)",
      required:
        "Ihre Auswahl wird 6 Monate in diesem Browser gespeichert. Wir verwenden keine Werbe-Cookies.",
      save: "Auswahl speichern",
      reopen: "Cookie-Einstellungen",
    },
    fr: {
      title: "Vos choix de cookies",
      text: "Avec votre accord, nous utilisons Google Analytics pour comprendre les visites et téléchargements. Vous pouvez utiliser le site en refusant.",
      accept: "Accepter",
      reject: "Refuser",
      settings: "Paramètres",
      privacy: "Confidentialité",
      optional: "Mesure facultative des visites (Google Analytics)",
      required:
        "Votre choix est conservé dans ce navigateur pendant 6 mois. Aucun cookie publicitaire n’est utilisé.",
      save: "Enregistrer mon choix",
      reopen: "Paramètres des cookies",
    },
    it: {
      title: "Le tue scelte sui cookie",
      text: "Con il tuo consenso usiamo Google Analytics per comprendere visite e download. Puoi usare il sito anche se rifiuti.",
      accept: "Accetta",
      reject: "Rifiuta",
      settings: "Impostazioni",
      privacy: "Privacy",
      optional: "Misurazione facoltativa delle visite (Google Analytics)",
      required:
        "La scelta viene conservata in questo browser per 6 mesi. Non usiamo cookie pubblicitari.",
      save: "Salva la scelta",
      reopen: "Impostazioni dei cookie",
    },
    pt: {
      title: "As suas escolhas de cookies",
      text: "Com a sua autorização, usamos o Google Analytics para compreender visitas e transferências. Pode usar o site mesmo que recuse.",
      accept: "Aceitar",
      reject: "Recusar",
      settings: "Definições",
      privacy: "Privacidade",
      optional: "Medição opcional de utilização (Google Analytics)",
      required:
        "A sua escolha é guardada neste navegador durante 6 meses. Não usamos cookies de publicidade.",
      save: "Guardar escolha",
      reopen: "Definições de cookies",
    },
  };
  const lang = document.documentElement.lang.split("-")[0];
  const text = copy[lang] || copy.en;
  const prefix = lang === "tr" ? "" : `/${copy[lang] ? lang : "en"}`;
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
  window.gtag("consent", "default", denied);
  let choice = null;
  let loaded = false;
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
  function startAnalytics() {
    // Previews and local development must never pollute production reports.
    if (
      loaded ||
      !["seowatcher.io", "www.seowatcher.io"].includes(window.location.hostname)
    )
      return;
    loaded = true;
    window[`ga-disable-${id}`] = false;
    window.gtag("consent", "update", {
      ...denied,
      analytics_storage: "granted",
    });
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
  function save(analytics) {
    const wasLoaded = loaded;
    choice = analytics;
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify({ analytics, savedAt: Date.now() }),
      );
    } catch {
      /* The current-page choice still applies. */
    }
    if (analytics) startAnalytics();
    else {
      window[`ga-disable-${id}`] = true;
      clearAnalyticsCookies();
      document.querySelector("[data-consent-google]")?.remove();
    }
    banner.hidden = true;
    syncBannerSpace();
    if (lastFocus) lastFocus.focus();
    // A fresh document removes already-installed Google event listeners too.
    if (!analytics && wasLoaded) window.location.reload();
  }
  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.dataset.consentBanner = "";
  banner.setAttribute("aria-labelledby", "cookie-title");
  banner.innerHTML = `<div class="cookie-copy"><h2 id="cookie-title" tabindex="-1">${text.title}</h2><p>${text.text} <a data-consent-privacy href="${prefix}/privacy/">${text.privacy}</a></p><div data-consent-options hidden><label><input type="checkbox" data-consent-analytics> ${text.optional}</label><p>${text.required}</p><button type="button" data-consent-save>${text.save}</button></div></div><div class="cookie-actions"><button type="button" data-consent-accept>${text.accept}</button><button type="button" data-consent-reject>${text.reject}</button><button type="button" data-consent-expand aria-expanded="false">${text.settings}</button></div>`;
  document.body.append(banner);
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
  const footer =
    document.querySelector("footer .bottom") ||
    document.querySelector("footer") ||
    document.body;
  const links = document.createElement("div");
  links.className = "cookie-footer";
  links.innerHTML = `<a href="${prefix}/privacy/">${text.privacy}</a><button type="button" data-consent-settings>${text.reopen}</button>`;
  footer.append(links);
  links.querySelector("button").addEventListener("click", (event) => {
    lastFocus = event.currentTarget;
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
