---
title: PageSpeed key
description: Create a free PageSpeed Insights API key, save it in Settings, test it and read the quota counters shown during site audits.
kind: nasil-yapilir
updated: 2026-10-27
---

The site audit measures page speed with Google PageSpeed Insights. The API key is free and optional. Without one, the app measures at most 50 pages per audit, and Google often stops keyless requests early with a 429 (too many requests) error. Crawling and the other checks do not need a key.

## Create and save a key

1. In Google Cloud Console, enable the **PageSpeed Insights API**.
2. Create an API key and restrict it to the PageSpeed Insights API.
3. In seowatcher, open **Settings → Speed tests**, paste the key and select **Save**.

The app stores the key encrypted and never shows it again. On Docker you can set `PAGESPEED_API_KEY` instead; a key saved in Settings takes priority.

## Test the key

**Test key** sends one real mobile request for example.com. It does not measure your site and does not count toward the audit counter. The result and the test date appear next to the button. The button stays disabled while the test runs and for at least ten seconds after you select it. Saving a different key clears the old test result.

A successful test proves only that this one request worked. A key does not guarantee that every audit request succeeds; check your actual quota in Google Cloud Console.

## Quota counters

The PageSpeed counter under **Settings → Google and system limits** counts the measurements of audits started in the last 24 hours. It excludes key tests and any other program that uses the same key.

## Fix a failing key

| Result                     | What to do                                                                      |
| -------------------------- | ------------------------------------------------------------------------------- |
| Invalid key                | Copy the key again from Google Cloud Console and save it.                       |
| 403 or "restricted"        | Check that the API is enabled and that the key's restrictions allow it.         |
| 429 or daily quota reached | Wait for the quota to reset, then check the quota page in Google Cloud Console. |
| Network error              | Check the internet connection and test again.                                   |
