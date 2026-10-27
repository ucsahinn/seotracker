---
title: Projektinfo
description: Projektinfo speichert lokale Notizen für Sie und verbundene Assistenten. Gefüllte Texte sind nicht verifiziert; nicht jeder Assistent liest sie automatisch.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Projektinfo speichert lokale Notizen für Sie und verbundene Assistenten. Gefüllte Texte sind nicht verifiziert; nicht jeder Assistent liest sie automatisch.

## Mit dem Ziel beginnen

Oben stehen die Anzahl gefüllter Hauptabschnitte und das gespeicherte Ziel. Öffnen Sie den ersten leeren Abschnitt oder die Abschnittsauswahl. Geschäftsübersicht, aktuelles Ziel, Positionierung und Schreibpräferenzen erlauben je 4.000 Zeichen. Autor und absoluter Änderungszeitpunkt stehen am Abschnitt. Speichern überträgt nur geänderte Hauptabschnitte.

Wettbewerber und wichtige Seiten sind optionale Notizlisten, keine Ranking- oder Conversion-Messungen. Jede Liste erlaubt 100 Einträge. Domain/Name/Notiz: 255/120/500 Zeichen; Seitenadresse/Thema/Notiz: 2.048/200/500. Rollen sind eigene Etiketten. Assistenten erstellen zusätzliche Abschnitte; Sie können sie bearbeiten oder entfernen. Höchstens 20 Abschnitte, 120 Zeichen Titel, 4.000 Zeichen Inhalt.

## Speichern und aktualisieren

Aktualisieren liest Notizen und Einrichtung neu. Bei einem Hintergrundfehler bleiben gespeicherte Informationen und Entwürfe mit Warnung sichtbar. Ungespeicherte Änderungen in Haupt- oder Inline-Formularen lösen beim Verlassen eine Warnung aus. Der Server verhindert gleichzeitiges Überschreiben desselben Abschnitts noch nicht; vergleichen Sie vor dem Speichern den neuesten Text.

Die Assistentenvorlage bittet um Ihre Zustimmung vor dem Speichern. Die Anwendungswerkzeuge können sofort schreiben und erzwingen keine zusätzliche Zustimmung. Ohne gelesene Projektidentität wird keine Vorlage erstellt.

Das Rechercheprotokoll zeigt höchstens die neuesten 20 Einträge, je 1.000 Zeichen. Das Datum stammt vom UTC-Tag des Servers. Einträge über 90 Tage werden beim Hinzufügen neuer Notizen bereinigt; ohne neue Einträge können ältere bleiben. Die Liste ist kein vollständiger Verlauf.

Quellen und Einrichtung zählt sechs gemeinsame Konfigurationssignale; fehlend und nicht lesbar bleiben getrennt. Optionale Listen zählen nicht. Verbindungen sind kein Live-Test, ein PageSpeed-Schlüssel garantiert keine Quote, ein Werkzeugaufruf dieser Installation beweist kein Lesen dieses Projekts. Das ist kein SEO-Wert.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
