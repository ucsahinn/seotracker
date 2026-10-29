---
title: PageSpeed-Schlüssel
description: Einen kostenlosen PageSpeed-Insights-Schlüssel anlegen und speichern und verstehen, was der Schlüsseltest und der Audit-Zähler aussagen.
kind: nasil-yapilir
updated: 2026-10-27
---

Mit einem PageSpeed-Insights-API-Schlüssel misst das Website-Audit die Geschwindigkeit Ihrer Seiten über Googles PageSpeed Insights. Der Schlüssel ist kostenlos und optional. Ohne Schlüssel misst die App höchstens 50 Seiten pro Audit, und Google kann schon früher begrenzen. Auch mit Schlüssel ist eine vollständige Messung nicht garantiert; die tatsächlichen Kontingente sehen Sie in Google Cloud.

## Schlüssel einrichten

1. Aktivieren Sie in Google Cloud die PageSpeed Insights API.
2. Erstellen Sie einen API-Schlüssel und beschränken Sie ihn auf die PageSpeed Insights API.
3. Speichern Sie ihn in der App unter **Einstellungen → Geschwindigkeitstests**.

Die App speichert den Schlüssel verschlüsselt und zeigt ihn danach nicht mehr an. Unter Docker können Sie ihn alternativ als `PAGESPEED_API_KEY` setzen; ein in der App gespeicherter Schlüssel hat Vorrang.

## Was der Test aussagt

**Schlüssel testen** sendet eine echte mobile Anfrage für example.com. Der Test misst nicht Ihre Website und zählt nicht zum Audit-Zähler. Ergebnis und Testdatum werden angezeigt. Die Schaltfläche bleibt während der Anfrage und mindestens zehn Sekunden nach dem Klick gesperrt. Speichern Sie einen neuen Schlüssel, verschwindet das alte Ergebnis.

Ein gespeicherter Schlüssel bestätigt nur die Konfiguration, ein erfolgreicher Test nur diese eine Anfrage.

Der PageSpeed-Zähler unter **Einstellungen → Google- und Systemlimits** zählt Audits, die in den letzten 24 Stunden begonnen haben. Schlüsseltests und andere Programme, die denselben Schlüssel nutzen, zählt er nicht.

## Fehler beheben

- **Ungültiger Schlüssel**: Kopieren Sie den Schlüssel erneut aus Google Cloud.
- **Fehler 403**: Prüfen Sie, ob die API aktiviert ist und die Schlüsselbeschränkungen sie zulassen.
- **Tages- oder Minutenlimit erreicht**: Warten Sie und prüfen Sie die Kontingente in Google Cloud.
- **Netzwerkfehler**: Versuchen Sie es erneut.
