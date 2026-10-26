---
title: Website-Audit
description: Die App prüft Ihre Website Seite für Seite anhand von 201 Regeln und sortiert die Probleme nach Wichtigkeit. Zu jedem steht, was zu tun ist.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

Die App geht Ihre Website mit ihrem eigenen Crawler durch, einem Programm, das Seiten einzeln öffnet und liest. Sie sucht nach defekten Links, fehlenden Titeln und langsamen Seiten. Am Ende erhalten Sie eine Punktzahl und eine nach Wichtigkeit sortierte Problemliste. Unter jedem Problem steht, wie Sie es beheben.

## Was auf dem Bildschirm zu sehen ist

**Karte „Neues Audit starten“ (Yeni denetim başlat).** Sie hat drei Felder.

- **Taranacak site adresi** (Zu crawlende Adresse): Die Domain Ihres Projekts ist bereits eingetragen.
- **Kaç sayfa taransın?** (Wie viele Seiten sollen gecrawlt werden?): mindestens 10, höchstens 10.000, Standard 50. Geben Sie mehr als 500 ein, fragt die App nach einer Bestätigung.
- **Sayfa hızını da ölç** (Seitengeschwindigkeit auch messen): standardmäßig ausgeschaltet. Eingeschaltet wird jede Seite auf dem Smartphone und auf dem Computer gemessen. Die Messung übernimmt Google Lighthouse (Googles Werkzeug zur Seitenmessung).

Haben Sie keinen PageSpeed-Schlüssel (den kostenlosen Code, den Google für die Geschwindigkeitsmessung vergibt), ist die Geschwindigkeitsmessung auf höchstens 50 Seiten begrenzt. Um alle Seiten zu messen, tragen Sie unter **Ayarlar** (Einstellungen) einen kostenlosen Schlüssel ein.

**Frühere Audits (Önceki denetimler).** Datum, Status, Seitenzahl und Problemzahlen jedes Audits werden aufgelistet. Die Problemzahlen sind auf hundert Seiten umgerechnet. So können Sie Audits mit 50 und mit 500 Seiten vergleichen. **Denetimi sil** (Audit löschen) im Zeilenmenü löscht alles und lässt sich nicht rückgängig machen.

**Audit-Details.** Bleibt der Crawl unvollständig, erscheint eine gelbe Warnung. Zum Beispiel „Denetim bu siteyi tamamen tarayamadı.“ (Das Audit konnte diese Website nicht vollständig crawlen), etwa weil der Bot-Schutz es blockiert hat. Die Ergebnisse werden trotzdem angezeigt. **Raporu indir** (Bericht herunterladen) lädt den Bericht als einzelne HTML-Datei herunter und speichert ihn auf dem Bildschirm **Raporlar** (Berichte).

**Website-Punktzahl.** Sie sehen eine Zahl von 0 bis 100. Darunter stehen die drei Aufgaben, die am meisten Punkte bringen, jeweils mit „+N puan“ (+N Punkte).

**Zwei Diagramme.** Das eine zeigt, welches Problem die meisten Seiten betrifft, das andere, wie ernst die Probleme sind.

**Vier Reiter.**

- **Sorunlu sayfalar** (Seiten mit Problemen): Öffnen Sie eine Karte, sehen Sie die Ursache und den Kasten **Nasıl düzeltilir?** (Wie wird es behoben?). Die Schaltflächen: **URL'leri kopyala** (URLs kopieren), **CSV indir** (CSV herunterladen), **Sayfalar sekmesinde göster** (Im Reiter Seiten zeigen).
- **Sayfalar** (Seiten): jede gecrawlte Seite. Schnellfilter: **Dizine kapalı** (Vom Index ausgeschlossen), **Yavaş** (Langsam; über 1 Sekunde), **Alt metni eksik** (Alt-Text fehlt), **Site haritasında yok** (Nicht in der Sitemap).
- **Dizin durumu** (Indexstatus): Googles Antwort für jede Seite. Sie wird in einer eigenen Anleitung beschrieben.
- **Hız** (Geschwindigkeit): erscheint nur, wenn die Geschwindigkeitsmessung eingeschaltet ist.

## So gehen Sie vor

1. Lassen Sie beim ersten Audit die Seitenzahl bei 50. Lassen Sie die Geschwindigkeitsmessung ausgeschaltet. Nach ein bis zwei Minuten ist das Audit fertig.
2. Beginnen Sie mit den drei „+N puan“-Aufgaben auf der Punktzahl-Karte. Mit dem geringsten Aufwand bringen sie die meisten Punkte.
3. Beheben Sie im Reiter **Sorunlu sayfalar** zuerst die kritischen Probleme. Ein kritisches Problem verhindert, dass Google die Seite sieht.
4. Kopieren Sie die Liste mit **URL'leri kopyala** und geben Sie sie an die Person weiter, die Ihre Website betreut. Den Kasten **Nasıl düzeltilir?** können Sie unverändert weitergeben.
5. Klicken Sie nach der Korrektur auf **Aynı ayarlarla yeniden başlat** (Mit denselben Einstellungen neu starten). Die Karte „Düzelenler“ (Behobenes) im Panel zeigt, was erledigt ist.
6. Schalten Sie die Geschwindigkeitsmessung einmal pro Woche für wichtige Seiten ein. Jede Seite braucht etwa zehn Sekunden und verbraucht Google-Kontingent.

## Wie die Zahlen berechnet werden

**Punktzahl.** Jedes Problem hat ein anderes Gewicht: kritisch 40, Warnung 15, Hinweis 3. Je mehr Seiten ein Problem betrifft, desto mehr Punkte kostet es. Die Punktzahl beginnt bei 100 und fällt nicht unter null. Gibt es auch nur ein einziges Problem, beträgt die Punktzahl höchstens 99.

Die Bereiche der Punktzahl sind: ab 90 sehr gut, ab 70 gut, ab 50 mittel, darunter schwach.

**Crawl.** Die App belastet Ihre Website nicht. Sie sendet höchstens zwei Anfragen gleichzeitig. Meldet die Website „zu viele Anfragen“ (429), wartet sie. Übersteigt die gesamte Wartezeit 30 Minuten, bricht der Crawl ab.

**Geschwindigkeitsmessung.** Bei einer Website mit 212 Seiten dauerte das gesamte Audit 35 Minuten. Davon waren etwa 24 Minuten die Geschwindigkeitsmessung. Ist das Tageskontingent aufgebraucht, bricht die Messung ab, und die bisherigen Ergebnisse bleiben. Ein Problem wird in diesen Fällen eingetragen:

- Der Hauptinhalt erscheint später als nach 4 Sekunden (LCP).
- Der Inhalt verschiebt sich um mehr als 0,25 (CLS).
- Die Antwort auf einen Klick kommt später als nach 500 Millisekunden (INP).
- Der Lighthouse-SEO-Wert liegt unter 90.

## Häufige Fragen

**Zeigt das Audit, was Google sieht?** Nein. Der Crawler der App liest die Seite selbst. Googles Antwort finden Sie im Reiter **Dizin durumu**.

**Die Punktzahl ist 98. Warum nicht 100?** Schon ein einziges Problem begrenzt die Punktzahl auf 99.

**Was bedeutet die Warnung „Wir wurden blockiert“ („Engellendik“)?** Der Bot-Schutz Ihrer Website hat den Crawler gestoppt. Erlauben Sie in der Firewall den Namen „seotracker-audit“.

**Die Geschwindigkeitsmessung ist mittendrin abgebrochen.** Meist fehlt der PageSpeed-Schlüssel, oder das Tageskontingent ist aufgebraucht. Die Kontingentkarte unter **Ayarlar** nennt den Grund.

**Wie viele Audits laufen gleichzeitig?** Höchstens drei. Zwei Audits mit Geschwindigkeitsmessung bremsen sich gegenseitig.

## Grenzen

Der Crawler sieht Inhalte, die JavaScript (Code, der auf der Seite läuft) nachträglich einfügt, möglicherweise nicht. Ein Audit crawlt höchstens 10.000 Seiten. Die Geschwindigkeitsmessung ist eine Labormessung von Google, keine Daten echter Besucher. Das Audit ändert nichts an Ihrer Website. Die Korrektur nehmen Sie oder Ihr Assistent vor.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
