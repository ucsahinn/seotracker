---
title: Was ist seowatcher?
description: seowatcher ist eine kostenlose Open-Source-SEO-App, die Search Console, GA4, Website-Audit und PageSpeed auf Ihrem eigenen Computer bündelt.
kind: kavram
updated: 2026-10-29
---

seowatcher ist eine kostenlose, MIT-lizenzierte Open-Source-SEO-App, die Google Search Console, Google Analytics 4, ihren eigenen Website-Crawler und PageSpeed Insights in einer Oberfläche zeigt. Sie läuft auf Ihrem eigenen Computer, nicht in der Cloud: eine einzige Installationsdatei für Windows 10 und 11, Docker auf Mac und Linux. Auf GitHub heißt sie seotracker; es ist dieselbe App.

## Kurz und knapp

| Frage                   | Antwort                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Preis                   | Kostenlos. Kein Abo, kein Konto, keine Kreditkarte                                                |
| Lizenz                  | MIT, Open Source, der gesamte Code liegt auf GitHub                                               |
| Plattformen             | Installationsdatei für Windows 10/11 (64 Bit); Docker auf Mac und Linux                           |
| Datenquellen            | Google Search Console, Google Analytics 4, der eigene Website-Crawler der App, PageSpeed Insights |
| Website-Audit           | 202 Regeln                                                                                        |
| KI-Anbindung            | Assistenten wie Claude Code, Codex, Cursor und Gemini CLI über MCP; 6 fertige Aufgaben            |
| Sprachen der Oberfläche | Türkisch, Englisch, Deutsch, Französisch, Italienisch, Portugiesisch                              |
| Nutzer                  | Ein Nutzer, nur vom eigenen Computer aus erreichbar                                               |
| Wo die Daten liegen     | Unter Windows in `%LOCALAPPDATA%\seowatcher`, in Docker im Volume `seotracker_data`               |
| Version                 | 0.8.6 Alpha, 29. Oktober 2026                                                                     |
| Größe                   | Installationsdatei 86 MB, installiert 313 MB                                                      |
| Basiert auf             | open-seo (every-app)                                                                              |

## Was macht seowatcher?

- **Suchleistung:** Klicks, Impressionen, Klickrate und durchschnittliche Position aus der Search Console, nach Suchanfrage, Seite, Land und Gerät. Google liefert 16 Monate Verlauf; die App legt zusätzlich ihr eigenes Archiv an.
- **Chancen:** ordnet die Seiten, die Google bereits zeigt, danach, wie viele zusätzliche Klicks sie bei der eigenen Klickrate Ihrer Website bringen könnten, und schlägt für jede Seite eine Aufgabe vor.
- **Website-Audit:** prüft Ihre Website (Webseiten-Audit) anhand von 202 Regeln: defekte Links, fehlende oder zu lange Titel, langsame Seiten, Seiten, die Google nicht indexiert. Zu jedem Befund steht, was zu tun ist.
- **Indexstatus:** liest über die URL-Prüfung Googles Eintrag zu jeder Seite (indexiert oder nicht, warum, wann zuletzt gecrawlt). Google begrenzt das auf 2.000 URLs pro Property und Tag.
- **Datenanalyse:** zeigt Besuche, Interaktionen und Schlüsselereignisse aus GA4 neben den Suchdaten.
- **Berichte:** speichert Berichte als einzelne HTML-Datei, die Sie auf dem Handy öffnen, drucken oder per E-Mail senden.
- **KI-Assistent:** Über MCP liest Ihr Assistent Ihre Zahlen, startet das Audit und schreibt den Bericht.

## Was macht seowatcher nicht?

- Es schätzt kein Suchvolumen. Impressionen kommen von Google und sind kein Suchvolumen.
- Es zählt keine Websites, die auf Sie verlinken (Backlinks).
- Es verfolgt keine Rankings von Wettbewerbern; es liest nur die Websites, die Sie als Projekt anlegen.
- Es ist kein gehosteter Cloud-Dienst; es gibt keine Teamkonten und keinen Mehrbenutzerzugang.
- Eine eigene Handy-App und eine Browsererweiterung gibt es noch nicht.

## Was unterscheidet es von der Search Console?

Die Search Console ist die Quelle der Daten; seowatcher liest sie und baut eine Arbeitsliste darauf. Die Search Console zeigt Ihnen Zahlen; seowatcher zeigt an einem Ort, welche Seite Sie zuerst ansehen sollten, wo Ihre Website gegen 202 Regeln verstößt und was Analytics dazu gemessen hat. Weil die App ein Archiv auf Ihrem Computer anlegt, können Sie mit der Zeit auch weiter zurückblicken als Googles 16-Monats-Fenster. Die Zahlen stammen aus derselben Quelle, aber Google liefert sie etwa drei Tage verzögert und verbirgt sehr seltene Suchanfragen; deshalb können Seitensumme und Websitesumme voneinander abweichen.

## Was unterscheidet es von kostenpflichtigen SEO-Suiten?

Kostenpflichtige SEO-Suiten verkaufen Schätzungen zu Suchvolumen, Backlinks und Wettbewerber-Rankings aus eigenen Crawls und zugekauften Daten. seowatcher tut nichts davon; es nutzt nur die Daten, die Google Ihnen als Websitebetreiber ohnehin gibt, plus den eigenen Crawl. Darum ist es kostenlos, und darum ist es nicht für Marktforschung gebaut. Es passt, wenn Sie die Präsenz Ihrer eigenen Website in Google beobachten, verbessern und darüber berichten wollen.

## Für wen ist es gedacht?

Für Websitebetreiber, Content-Teams und freiberufliche SEOs, die die Search-Console- und GA4-Daten ihrer eigenen Websites oder der ihrer Kunden an einem Ort sehen wollen. Jedes Projekt hat seine eigenen Google-Properties, Audits und Berichte.

## Häufige Fragen

### Ist es wirklich kostenlos?

Ja. Es ist ein MIT-lizenziertes Open-Source-Projekt. Die genutzten Google-Dienste bleiben innerhalb ihrer kostenlosen Nutzungsgrenzen.

### Wo liegen meine Daten?

Unter Windows im Ordner `%LOCALAPPDATA%\seowatcher`: die Datenbank, Ihr Google-Zugangsschlüssel und die Protokolle. Die Deinstallation lässt diesen Ordner unberührt. In Docker liegen die Daten im Volume `seotracker_data`.

### Womit verbindet sich die App?

Mit Google (Search Console, Analytics, PageSpeed), der geprüften Website und GitHub für die Versionsprüfung. Wenn Sie einen KI-Assistenten anbinden, können die Daten, die er liest, an dessen Anbieter gehen; diese Verbindung ist optional.

### Läuft es auf Mac oder Linux?

Ja, mit Docker. Unter Windows ist die Installation mit einer Datei einfacher.

### Warum brauche ich Zugangsdaten in Google Cloud?

seowatcher ist kein Cloud-Dienst; es läuft auf Ihrem Computer und verbindet sich direkt mit Google. Google möchte wissen, wem die verbindende App gehört. Das erledigen Sie einmal.

### Muss ich die App ins Internet stellen?

Nein. Die App öffnet sich nur auf Ihrem eigenen Computer.

## Wo anfangen?

1. [Installation unter Windows](/docs/kurulum-windows/) oder [Installation mit Docker](/docs/kurulum-docker/).
2. [Mit Google verbinden](/docs/google-baglantisi/).
3. Optional der [PageSpeed-Schlüssel](/docs/pagespeed-anahtari/) und die [Assistenten-Einrichtung](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
