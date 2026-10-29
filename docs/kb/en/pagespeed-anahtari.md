---
title: PageSpeed key
description: Save your PageSpeed Insights API key, check test requests and understand request quotas and the counters shown during site audits.
kind: nasil-yapilir
updated: 2026-10-27
---

## Add a key

Enable PageSpeed Insights API in Google Cloud. Create an API key and restrict it to PageSpeed Insights. Save it in Settings → Speed measurement. The key is encrypted and never displayed. Docker can also use PAGESPEED_API_KEY; the Settings value takes priority.

## What the test proves

Test key makes one real mobile request for example.com. It does not measure your site or increment the audit measurement counter. A result and test date appear. The button remains disabled while pending and for at least ten seconds from the click. Changing the key removes the old test result.

## Limits and recovery

Without a key, the application attempts at most 50 pages per audit. Google may stop requests earlier; a key does not guarantee success. Check actual quota in Google Cloud. The Settings PageSpeed counter includes only audits started within the last 24 hours, excluding key tests and other programs.

For an invalid key, copy it again. For 403/restricted, check API activation and key restrictions. Wait for rate or daily quota limits and inspect the Cloud quota screen. Retry network failures. A stored key is configuration evidence; a successful test proves only that request succeeded.
