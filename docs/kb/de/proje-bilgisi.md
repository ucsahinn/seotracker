---
title: Projektkontext
description: Der Projektkontext speichert lokale Notizen zu Ziel, Positionierung und wichtigen Seiten für Sie und verbundene KI-Agenten.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Die Notizen sind Ihre eigenen Angaben. Die App prüft sie nicht auf Richtigkeit, und nicht jeder Agent liest sie automatisch.

## Mit dem Ziel beginnen

Oben sehen Sie, wie viele Hauptabschnitte ausgefüllt sind, und das gespeicherte Ziel. Von dort öffnen Sie den ersten leeren Abschnitt oder die Abschnittsauswahl.

Die vier Hauptabschnitte sind Geschäftsübersicht, aktuelles Ziel, Positionierung und Schreibpräferenzen. Jeder fasst bis zu 4.000 Zeichen. Am Abschnitt stehen, wer ihn zuletzt geändert hat und wann. **Änderungen speichern** überträgt nur die geänderten Abschnitte.

Mitbewerber und Schlüsselseiten sind optionale Notizlisten. Sie messen weder Rankings noch Conversions. Jede Liste fasst 100 Einträge:

| Liste           | Feldgrenzen                                       |
| --------------- | ------------------------------------------------- |
| Mitbewerber     | Domain 255, Name 120, Notiz 500 Zeichen           |
| Schlüsselseiten | Seitenadresse 2.048, Thema 200, Notiz 500 Zeichen |

Die Rolle einer Schlüsselseite ist ein frei wählbares Etikett.

Agenten können weitere Abschnitte anlegen, die Sie bearbeiten oder entfernen können. Erlaubt sind höchstens 20 solcher Abschnitte mit je 120 Zeichen Titel und 4.000 Zeichen Inhalt.

## Speichern und aktualisieren

**Aktualisieren** liest Notizen und Einrichtungsstatus neu. Schlägt das im Hintergrund fehl, bleiben gespeicherte Angaben und Ihre Entwürfe mit einer Warnung sichtbar. Verlassen Sie die Seite mit ungespeicherten Änderungen, warnt die App.

Hat ein anderer Client einen Abschnitt geändert, während Sie ihn bearbeiten, lehnt die App den gesamten Speichervorgang ab. Ihr Entwurf bleibt erhalten. Die App zeigt den Text zu Beginn Ihrer Bearbeitung, den zuletzt gespeicherten Text und Ihren Entwurf. Führen Sie die Änderungen zusammen und speichern Sie erneut. Agenten nutzen denselben Schutz über das Feld `expectedContent`; ältere Clients ohne dieses Feld funktionieren weiter.

## Agenten und Rechercheprotokoll

Die Agentenvorlage bittet um Ihre Zustimmung, bevor ein Agent etwas speichert. Die MCP-Werkzeuge selbst schreiben jedoch sofort und verlangen keine zusätzliche Bestätigung. Kann die App die Projektidentität nicht lesen, erstellt sie keine Vorlage.

Das Rechercheprotokoll zeigt die neuesten 20 Einträge der letzten 90 Tage mit je bis zu 1.000 Zeichen. Das Datum folgt dem UTC-Tag des Servers. Ältere Einträge werden beim Lesen ausgefiltert. Gibt es im Zeitraum mehr Einträge, weist ein Hinweis darauf hin. Das Protokoll ist daher kein vollständiger Verlauf.

## Quellen und Einrichtung

Dieser Bereich zählt sechs Konfigurationssignale, die auch die Übersicht verwendet. Fehlende und nicht lesbare Signale werden getrennt gezählt; die optionalen Listen zählen nicht mit. Der Wert beschreibt nur die Einrichtung, keine SEO-Leistung:

- Eine gespeicherte Verbindung ist kein Live-Test.
- Ein PageSpeed-Schlüssel garantiert kein Kontingent.
- Ein Werkzeugaufruf über diese Installation beweist nicht, dass ein Agent dieses Projekt gelesen hat.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
