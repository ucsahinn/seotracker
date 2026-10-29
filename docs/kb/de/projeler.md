---
title: Projekte
description: Projekte listet Ihre Websites, zeigt fehlende Verbindungen und führt zur Arbeit. Jedes Projekt hat eigene Google-Properties, Audits und Berichte.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

Ein Projekt steht für eine Website. Auf diesem Bildschirm wählen Sie das Projekt aus, mit dem Sie arbeiten, und sehen, welche Verbindungen noch fehlen.

## Die Projektliste lesen

Bei mehreren Projekten können Sie nach Name oder Domain suchen und sortieren. **Zuletzt geöffnet** ist das Projekt, das sich dieser Browser gemerkt hat; es sagt nichts über den SEO-Zustand aus. Die Hauptschaltfläche einer Karte richtet sich nach der Einrichtung: Sie führt zum Hinzufügen einer Website, zum Verbinden der Search Console oder zur Übersicht. **Projektkontext** öffnet die Notizen, **Einstellungen** die Konfiguration.

### Suchdaten aus dem lokalen Archiv

Die Karte zeigt Websuche-Daten über alle Geräte und Länder aus dem lokalen Archiv. Der Zeitraum ist sichtbar und endet am neuesten gespeicherten Tag, der älter sein kann als gestern. Fehlende Tage bleiben Lücken, keine Nullen; die Klicks sind dann nur die Summe der vorhandenen Tage. Einen Vergleich zeigt die Karte nur, wenn beide Zeiträume vollständig sind. Gleiche Summen heißen „unverändert“. War der Ausgangswert null, stehen vorherige und aktuelle Anzahl nebeneinander.

Hatte der vorherige Zeitraum weniger als 20 Klicks, zeigt das Abzeichen die Differenz in Klicks statt eines Prozentsatzes. Ein Anstieg von 1 auf 5 erscheint als +4 Klicks; bei so kleinen Zahlen ist das allein kein Beleg für Wachstum.

Die Quelldetails nennen den letzten gespeicherten Tag und, falls bekannt, die Abrufzeit. Ältere Datensätze speichern nicht, ob Google die Tage als endgültig gemeldet hatte. Suchklicks sind weder GA4-Sitzungen noch Summen aus dem Archiv der Suchanfragen; Zahlen aus unterschiedlichen Zeiträumen werden nicht addiert.

### Audit und Verbindungen

Das Audit gehört zum Host der Projektwebsite. Das letzte abgeschlossene Audit und ein neuerer laufender oder fehlgeschlagener Versuch werden getrennt gezeigt.

Eine gespeicherte Verbindung beweist nicht, dass ein Google-Abruf gelungen ist. Eine nicht lesbare Quelle ist weder „getrennt“ noch „null“. **Erneut versuchen** lädt die lokalen Daten neu. **Aktualisieren** liest Projektidentität und Kennzahlen gemeinsam neu, ohne Google abzufragen oder ein Audit zu starten.

## Projekte anlegen und verwalten

**Neues Projekt** fragt nach Name, optionaler Domain, Land und Sprache. Das Anlegen sammelt noch keine Daten. Die Google-Properties wählen Sie anschließend in den Projekteinstellungen unter **Verbindungen**: je Projekt eine Search-Console- und eine Analytics-Property. Unter **Allgemein** ändern Sie Name, Domain und Markt.

**Projekt archivieren** blendet ein Projekt aus und behält seine Daten; **Wiederherstellen** holt es zurück. Das letzte aktive Projekt lässt sich nicht archivieren.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
