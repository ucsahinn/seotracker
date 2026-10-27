---
title: Analytics
description: Analytics zeigt gemessene Besuche, Interaktionen und Schlüsselereignisse Ihrer GA4-Property.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

Analytics zeigt gemessene Besuche, Interaktionen und Schlüsselereignisse Ihrer GA4-Property. Die Berichtsauswahl umfasst Einstiegsseiten, Seiten, Akquisition, Schlüsselereignisse, E-Commerce, interne Suche, Zielgruppen und Messeinstellungen.

## Zuerst den Umfang prüfen

Organische Suche umfasst auch andere Suchmaschinen als Google. Gesamter Traffic ändert Übersicht und Bericht gemeinsam. Die interne Suche zeigt immer gemessene Suchergebnis-Ereignisse aller Kanäle; hier gibt es keinen Kanalumschalter. Alle Hosts und Streams der Property sind enthalten. Weitere Websites oder Apps können zu den Summen beitragen.

Die Zeiträume von 7, 28 und 90 Tagen enden gestern in der Zeitzone der Property. Gestern ist ein abgelaufener Kalendertag, keine Garantie für endgültige Daten. Aktuelle Tage können neu verarbeitet werden. Aktueller Zeitraum, gleich langer Vorzeitraum und Zeitzone werden angezeigt. Links akzeptieren startDate/endDate gemeinsam; ein zukünftiges Enddatum wird mit Hinweis auf gestern begrenzt. GA4 und Search Console verwenden verschiedene Kalender und Messwerte. Gleiche Datumsangaben garantieren keine identischen Zeitspannen.

## Ergebnisse und Zeilen untersuchen

Die Übersicht folgt dem gewählten Umfang: Sitzungen, Interaktionsrate, Schlüsselereignisse und Kaufumsatz. Schlüsselereignisse sind keine eindeutigen Kunden. Null Umsatz beweist nicht, dass kein Shop existiert. Eine unbekannte Währung wird am Betrag genannt. Interaktionsdauer ist die Gesamtdauer, kein Durchschnitt pro Nutzer. Die Tageswerte unterscheiden unbekannte Tage von null. Eingeschränkte Daten verhindern sichere Vergleiche und Empfehlungen.

Wählen Sie 50, 100 oder 200 Zeilen pro Seite. Zurück/Weiter erschließt weitere Zeilen. Filter, Sortierung, Zusammenfassungen und Exporte gelten nur für die gelistete Seite. Ein Balken filtert die Tabelle, ohne die Basis der Zusammenfassung zu ändern. Nutzer können in mehreren Kategorien vorkommen; addieren Sie sie nicht zu eindeutigen Property-Nutzern. Gleiche Pfade verschiedener Hosts sowie gleichnamige Produkte mit verschiedenen IDs bleiben getrennt. Bei negativen oder unbekannten Umsätzen entfällt das Anteilsdiagramm.

Der Filter für geringe Conversion ist ein Prüfhinweis über mindestens vier geeignete gelistete Seiten mit jeweils mindestens 30 Sitzungen. Er schätzt keine entgangenen Verkäufe. Keine beobachteten Schlüsselereignisse beweisen keine fehlende Einrichtung. Häufige interne Suchbegriffe beweisen keine Inhaltslücke.

## Teilen, Messung und Kontingent

Bericht, Kanal, Daten, Aufschlüsselung, Seitengröße und Versatz bleiben in der URL. Der exakte host/path-Filter gilt nur für gelistete Zeilen und fasst URL-Varianten nicht zusammen. CSV und Google Tabellen exportieren die gefilterten Zeilen mit numerischen Rohwerten. ga4_scope_json enthält Quelle, Property, Zeitraum, Zeitzone, Währung, Datenqualität, Seite und Filter.

Die Messprüfung liest nur Admin-Einstellungen. Ein Ergebnis ohne Lücken beweist nicht, dass das Tag Daten sendet; folgen Sie den verlinkten Erfassungstests. Teilbestände werden als mindestens angegeben. Ist der Hauptschalter der erweiterten Messung aus, sind effektiv null Unterfunktionen aktiv. Kontoeinstellungen werden nicht verändert.

Das eingeklappte Kontingent zeigt einen lokalen Stand aus der letzten Berichtsantwort, keine Nutzung des gewählten Traffic-Zeitraums. Die Standardobergrenze ist eine Annahme. Aktualisieren fordert sichtbare Berichte erneut an und kann Berichtstokens verbrauchen.

Wenn Google Daten im angeforderten Zeitraum kürzt, zeigen die Analytics-Übersicht und die Berichtsdetails den Grund und die von Google angegebenen Daten. Der Bericht gilt als eingeschränkt; unvollständige Abdeckung wird nicht als verlässlicher Zeitraumvergleich dargestellt.
