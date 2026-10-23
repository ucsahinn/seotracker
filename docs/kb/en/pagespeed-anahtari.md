---
title: PageSpeed key
description: Get a free Google PageSpeed key to measure page speed and enter it in the app. Without a key, measurement stays limited to 50 pages.
kind: nasil-yapilir
updated: 2026-10-22
---

This guide gets you a free PageSpeed key, enters it in the app and tests it. It takes five minutes. The "Sayfa hızını da ölç" (Also measure page speed) option in the site audit measures each page on a phone and on a computer using Google's PageSpeed Insights service. Google offers the service without a key too, but the allowance is tiny: after a few pages it returns "429, too many requests". Without a key, the app measures at most 50 pages per audit. A free key removes that limit.

## What you need

- A Google account and a project in Google Cloud Console (Google's developer console). If you opened a project for the Google connection, the same one works.
- No card or fee is needed. The PageSpeed Insights API (the interface programs use to reach the service) is free.

## Steps

1. At `console.cloud.google.com`, select your project.
2. Open the **API'ler ve Hizmetler → Kitaplık** (APIs & Services → Library) page. Search for **PageSpeed Insights API** and choose **Etkinleştir** (Enable). If you skip this step, the key exists but every request is rejected with 403.
3. Choose **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → API anahtarı** (APIs & Services → Credentials → Create credentials → API key). A key that starts with "AIza" appears. Copy it.
4. Optional but recommended: choose **Anahtarı kısıtla** (Restrict key). Under API restrictions, select only **PageSpeed Insights API**. If your AI assistant will also look at the history of real user data (CrUX), add the **Chrome UX Report API** too.
5. In the app, open **Ayarlar → Hız ölçümü** (Settings → Speed measurement). Paste the key into the **API anahtarı** (API key) field. Choose **Kaydet** (Save). The notice "PageSpeed anahtarı kaydedildi" (PageSpeed key saved) appears. You do not need to restart.
6. In the same section, press the **Anahtarı test et** (Test the key) button. The app makes one real measurement for example.com (it uses 1 measurement). The expected answer is "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti." (The key works: Google PageSpeed Insights accepted the measurement.)

If you use Docker, you can also give the key in the `.env` file as `PAGESPEED_API_KEY`. The **Ayarlar** (Settings) screen is easier, and a value entered there takes priority.

## Check

- The **Ayarlar → Hız ölçümü** badge should say **Anahtar kayıtlı** (Key saved).
- On the site audit start card, with "Sayfa hızını da ölç" on, the time estimate should no longer mention the "en çok 50 sayfa" (at most 50 pages) limit.
- The "PageSpeed Insights" card in **Ayarlar → Sınırlar** (Settings → Limits) should say "Anahtar tanımlı" (Key defined).

## Frequently asked questions

**How big is the allowance (quota)?** Google does not publish an official number and changes it over time. You see the real value in Cloud Console under **API'ler ve Hizmetler → Kotalar** (APIs & Services → Quotas). In practice there is a per-minute limit and a daily limit. Each page uses two measurements: phone and computer.

**What happens if I hit the per-minute limit?** The app waits and tries again. The audit slows down, but you do not need to do anything. If the daily limit runs out, measurement stops; results up to that point are kept, and a new audit the next day completes the rest.

**What if two audits measure speed at the same time?** They share the per-minute limit, so each runs at half speed. For a site with 212 pages, speed measurement takes about 24 minutes alone and 48 minutes alongside another audit; with the crawl included, the whole audit takes about 35 minutes.

**Where is the key stored?** In the database on this computer, encrypted. It is not sent back to the browser. The **Ayarlar** screen shows only that a key is saved.

**Does measurement work at all without a key?** Yes, for up to 50 pages, although some requests often fail with 429. That may be enough for a small site; a site larger than 50 pages needs a key.

## If something goes wrong

- **The test says "restricted" or 403.** Step 2 is missing: the PageSpeed Insights API is not turned on, or the key is restricted to a different API.
- **The test says "invalid_key".** The key was copied incompletely. Copy it again from Cloud Console. The app does not check the key's format; it only reports whether Google accepted it.
- **The test says "quota_exhausted".** Today's allowance has run out. Try again tomorrow or check the quota in Cloud Console.
- **The speed column in the audit is empty.** "Sayfa hızını da ölç" was off when the audit started. Turn it on in a new audit. An old audit is not measured afterwards.
- **The quota card says "Anahtar yok" (No key) but I entered a key.** Refresh the page. The card looks at the audits of the last 24 hours. The new key takes effect in the next audit.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
