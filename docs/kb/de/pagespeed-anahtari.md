---
title: PageSpeed-Schlüssel
description: PageSpeed-Schlüssel speichern und Testanfragen sowie Prüfungszähler verstehen.
kind: nasil-yapilir
updated: 2026-10-27
---

Ein PageSpeed-Insights-API-Schlüssel lässt das Website-Audit die Geschwindigkeit Ihrer Seiten mit Googles PageSpeed Insights messen. Sie erstellen den Schlüssel kostenlos in Google Cloud, und er ist optional: Ohne Schlüssel versucht die App, pro Audit höchstens 50 Seiten zu messen.

## Schlüssel einrichten

Aktivieren Sie PageSpeed Insights API in Google Cloud. Erstellen Sie einen API-Schlüssel und beschränken Sie ihn auf PageSpeed Insights. Speichern Sie ihn unter Einstellungen → Geschwindigkeitsmessung. Der Schlüssel wird verschlüsselt und nicht angezeigt. Docker unterstützt auch PAGESPEED_API_KEY; der gespeicherte Wert hat Vorrang.

## Aussage des Tests

Der Schlüsseltest sendet eine echte mobile Anfrage für example.com. Er misst nicht Ihre Website und erhöht den Prüfungszähler nicht. Ergebnis und Testdatum werden angezeigt. Die Schaltfläche bleibt während der Anfrage und mindestens zehn Sekunden ab Klick gesperrt. Ein Schlüsselwechsel entfernt das alte Ergebnis.

## Grenzen und Fehler

Ohne Schlüssel versucht die App höchstens 50 Seiten je Prüfung. Google kann früher begrenzen; ein Schlüssel garantiert keinen Erfolg. Tatsächliche Quoten stehen in Google Cloud. Der PageSpeed-Zähler umfasst nur Prüfungen, die in den letzten 24 Stunden begonnen haben, keine Tests oder andere Programme.

Ungültiger Schlüssel: erneut kopieren. Bei 403 API-Aktivierung und Beschränkungen prüfen. Bei Tages-/Anfragelimits warten und Cloud-Quoten prüfen. Netzwerkfehler erneut versuchen. Gespeichert bestätigt Konfiguration; ein erfolgreicher Test bestätigt nur diese Anfrage.
