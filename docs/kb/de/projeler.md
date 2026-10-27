---
title: Projekte
description: Projekte hilft bei der Auswahl einer Website und zeigt fehlende Verbindungen. Jedes Projekt hat eigene Google-Properties, Prüfungen und Berichte.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Projekte hilft bei der Auswahl einer Website und zeigt fehlende Verbindungen. Jedes Projekt hat eigene Google-Properties, Prüfungen und Berichte.

## Die Anzeige verstehen

Bei mehreren Projekten können Sie nach Name oder Domain suchen und sortieren. **Zuletzt geöffnet** bezeichnet das im Browser gemerkte Projekt, keinen SEO-Zustand. Je nach bekannter Konfiguration führt die Hauptaktion zum Hinzufügen einer Website, zum Verbinden von Search Console oder zur Übersicht. Projektinfo öffnet Notizen, Einstellungen die Konfiguration.

Das Sucharchiv enthält lokal gespeicherte Web-Suchdaten für alle Geräte und Länder. Die Datumsbereiche sind sichtbar. Das Fenster endet am neuesten gespeicherten Tag, der veraltet sein kann. Bei fehlenden Tagen sind Klicks nur die Summe der vorhandenen Beobachtungen. Fehlende Tage bleiben Lücken, keine Nullen. Ein Vergleich erscheint nur bei zwei vollständigen Zeiträumen. Gleiche Summen werden als unverändert bezeichnet; bei einem Ausgangswert null erscheinen vorherige und aktuelle Anzahlen. Die Quelldetails zeigen den letzten gespeicherten Tag und gegebenenfalls die Abrufzeit. Ältere Datensätze speichern die Grundlage der Finalität nicht.

Die Prüfung gehört zum Host der ausgewählten Website. Letzte abgeschlossene Prüfung und neuerer fehlgeschlagener oder laufender Versuch werden getrennt gezeigt. Eine gespeicherte Verbindung beweist keinen erfolgreichen Google-Abruf. Nicht lesbare Quellen sind weder getrennt noch gemessene null. Erneut versuchen lädt lokale Daten. Aktualisieren liest Identität und Fakten zusammen, ohne Google-Aufruf oder Prüfungsstart.

## Erstellen und verwalten

Neues Projekt: Name, optionale Domain, Land und Sprache eingeben. Dadurch werden keine Daten gesammelt. Google-Properties wählen Sie unter Einstellungen → Verbindungen. Allgemeine Einstellungen ändern Identität und Markt. Pro Projekt gibt es eine Search-Console- und eine Analytics-Property.

Archivieren erhält Daten; Wiederherstellen holt das Projekt zurück. Das letzte Projekt kann nicht archiviert werden. Suchklicks sind keine GA4-Sitzungen oder Summen des Suchanfragenarchivs. Unterschiedliche Zeiträume werden nicht addiert.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
