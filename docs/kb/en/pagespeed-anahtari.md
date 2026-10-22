---
title: PageSpeed key
description: Get a free Google PageSpeed key to measure page speed and enter it in the app. Without a key, measurement stays limited to 50 pages.
kind: nasil-yapilir
updated: 2026-10-22
---

By the end of this page, your free PageSpeed key will be obtained, entered in the app and tested. It takes five minutes. The "Sayfa hızını da ölç" (Also measure page speed) option in the site audit measures each page on a phone and on a computer with Google's PageSpeed Insights service. Google offers this service without a key too, but the allowance is very small. After a few pages it returns "429, too many requests". Without a key, the app limits measurement to at most 50 pages in an audit. A free key removes this limit.

## What you need

- A Google account and a project in Google Cloud Console (Google's developer page). If you opened a project for the Google connection, the same one works.
- No card or fee is needed. The PageSpeed Insights API (the gateway to the service) is free.

## Steps

1. At `console.cloud.google.com`, select your project.
2. Open the **API'ler ve Hizmetler → Kitaplık** (APIs & Services → Library) page. Search for **PageSpeed Insights API** and say **Etkinleştir** (Enable). If you skip this step, the key exists but every request is rejected with 403.
3. Say **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → API anahtarı** (APIs & Services → Credentials → Create credentials → API key). A key that starts with "AIza" appears. Copy it.
4. Optional but recommended: say **Anahtarı kısıtla** (Restrict key). In the API restriction, select only **PageSpeed Insights API**. If your AI assistant will also look at the history of real user data (CrUX), add the **Chrome UX Report API** too.
5. In the app, open **Ayarlar → Hız ölçümü** (Settings → Speed measurement). Paste the key into the **API anahtarı** (API key) field. Say **Kaydet** (Save). The notice "PageSpeed anahtarı kaydedildi" (PageSpeed key saved) appears. You do not need to restart.
6. In the same section, press the **Anahtarı test et** (Test the key) button. The app makes one real measurement for example.com (it uses 1 measurement). The answer you expect: "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti." (The key works: Google PageSpeed Insights accepted the measurement.)

If you use Docker, you can also give the key in the `.env` file as `PAGESPEED_API_KEY`. The Ayarlar screen is easier, and the value entered there takes priority.

## Check

- The **Ayarlar → Hız ölçümü** badge should say **Anahtar kayıtlı** (Key saved).
- On the site audit start card, with "Sayfa hızını da ölç" on, the time estimate should no longer mention the "en çok 50 sayfa" (at most 50 pages) limit.
- The "PageSpeed Insights" card in **Ayarlar → Sınırlar** (Settings → Limits) should say "Anahtar tanımlı" (Key defined).

## Frequently asked questions

**How big is the allowance (quota)?** Google does not give an official number, and it changes it over time. You see the real value in Cloud Console under **API'ler ve Hizmetler → Kotalar** (APIs & Services → Quotas). In practice there is a per-minute limit and a daily limit. Each page uses two measurements: phone and computer.

**What happens if I hit the per-minute limit?** The app waits and tries again. The audit slows down, but you do not need to do anything. If the daily limit runs out, measurement stops. The results up to that point stay. It is completed in a new audit the next day.

**What if two audits measure speed at the same time?** They share the per-minute limit, and both become twice as slow. Speed measurement for a site with 212 pages takes about 24 minutes on its own and 48 minutes together with another audit; with the crawl, the whole audit reaches 35 minutes.

**Where is the key stored?** In the database on this computer, encrypted. It is not sent back to the browser. The Ayarlar screen shows only the "saved" information.

**Is no measurement done at all without a key?** It is done, up to 50 pages. Often some of it fails with 429. It may be enough for a small site. For sites larger than 50 pages, a key is needed.

## If something goes wrong

- **The test says "restricted" or 403.** Step 2 is missing: the PageSpeed Insights API is not turned on, or the key is restricted to a different API.
- **The test says "invalid_key".** The key was copied incompletely. Copy it again from Cloud Console. The app does not look at the key's format, it only tells you whether Google accepted it.
- **The test says "quota_exhausted".** Today's allowance has run out. Try again tomorrow, or look at the quota in Cloud Console.
- **The speed column in the audit is empty.** "Sayfa hızını da ölç" was off when the audit started. Turn it on in a new audit. An old audit is not measured afterwards.
- **The quota card says "Anahtar yok" (No key) but I entered a key.** Refresh the page. The card looks at the audits of the last 24 hours. The new key takes effect in the next audit.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
