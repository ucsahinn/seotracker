---
title: Analytics-Daten verstehen
description: Analytics zeigt gemessene Besuche, Interaktionen und Schlüsselereignisse Ihrer GA4-Property neben den Suchdaten des Projekts.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

Die Berichtsauswahl umfasst Einstiegsseiten, Seiten, Akquisition, Schlüsselereignisse, E-Commerce, interne Suche, Zielgruppen und **Messzustand**. Alle Zahlen stammen aus der Google-Analytics-4-Property, die Sie dem Projekt zugeordnet haben.

## Zuerst den Umfang prüfen

Umfang, Zeitraum und Warnungen stehen immer sichtbar über den Zahlen. Allgemeine Erklärungen finden Sie eingeklappt unter **Analytics-Daten verstehen**.

**Kanal.** „Organische Suche“ umfasst auch andere Suchmaschinen als Google. Ein Wechsel zu „Gesamter Traffic“ ändert Übersicht und Bericht gemeinsam. Die interne Suche zeigt immer die gemessenen Suchereignisse aller Kanäle und hat deshalb keinen Kanalumschalter.

**Property.** Alle Hosts und Datenstreams der Property zählen mit. Erfasst die Property weitere Websites oder Apps, fließen deren Besuche in die Summen ein.

**Zeitraum.** Die Zeiträume von 7, 28 und 90 Tagen enden gestern, gerechnet in der Zeitzone der Property. Auch gestern kann Google noch nachverarbeiten; die Daten der letzten Tage sind nicht garantiert endgültig. Aktueller Zeitraum, gleich langer Vorzeitraum und Zeitzone werden angezeigt. Links können `startDate` und `endDate` nur gemeinsam übergeben; ein Enddatum in der Zukunft wird mit Hinweis auf gestern gekürzt.

GA4 und Search Console verwenden verschiedene Kalender und Messwerte. Gleiche Datumsangaben bedeuten daher nicht denselben Zeitabschnitt.

**Unbekannte Werte.** Kann Google einen Messwert nicht liefern, zeigt die App den Traffic als „nicht ermittelbar“ an; bekannte Werte bleiben sichtbar. Gemeldete Einschränkungen stehen direkt am Messwert. Ist die Ursache unbekannt, sagt die App das. Versuchen Sie es erneut oder öffnen Sie **Messzustand**. Ein Wechsel des Kanals behebt keinen Lesefehler und wird deshalb nicht angeboten.

## Ergebnisse und Zeilen untersuchen

Die Übersicht zeigt für den gewählten Umfang Sitzungen, Interaktionsrate, Schlüsselereignisse und Kaufumsatz. Beachten Sie beim Lesen:

- Schlüsselereignisse zählen Ereignisse, keine eindeutigen Kunden.
- Ein Umsatz von null beweist nicht, dass es keinen Shop gibt. Ist die Währung unbekannt, steht das am Betrag.
- Die Interaktionsdauer ist die Gesamtdauer, kein Durchschnitt pro Nutzer.
- Die Tageswerte unterscheiden unbekannte Tage von Tagen mit null.
- Bei eingeschränkten Daten entfallen Vergleiche und Empfehlungen.

Tabellen zeigen 50, 100 oder 200 Zeilen pro Seite; mit **Zurück** und **Weiter** blättern Sie. Filter, Sortierung, Zusammenfassungen und Exporte gelten nur für die angezeigte Seite. Ein Klick auf einen Balken filtert die Tabelle, ändert aber nicht die Basis der Zusammenfassung.

Ein Nutzer kann in mehreren Kategorien vorkommen. Addieren Sie die Kategorien daher nicht zu einer Gesamtzahl eindeutiger Nutzer. Gleiche Pfade auf verschiedenen Hosts und gleichnamige Produkte mit verschiedenen IDs bleiben getrennte Zeilen. Bei negativen oder unbekannten Umsätzen entfällt das Anteilsdiagramm.

Der Filter für geringe Conversion ist ein Prüfhinweis. Er erscheint erst ab vier geeigneten Seiten mit jeweils mindestens 30 Sitzungen und schätzt keine entgangenen Verkäufe. Fehlende Schlüsselereignisse beweisen keine fehlende Einrichtung, und häufige interne Suchbegriffe beweisen keine Inhaltslücke.

## Von Chancen zur Adressgruppe

Der Link **Analytics-Adressgruppe prüfen** auf dem Bildschirm Chancen öffnet die organischen Einstiegsseiten, gefiltert auf eine normalisierte Adressgruppe (Parameter `pageGroup`). Abfrageparameter und ein abschließender Schrägstrich gehören zur selben Gruppe. Andere Hosts und Pfade mit abweichender Groß- und Kleinschreibung bleiben getrennt.

Der Server liest dafür alle organischen Einstiegsseiten seitenweise von Google und filtert sie, bevor die Tabelle in Seiten aufgeteilt wird. Verhindern Quellen- oder Qualitätsgrenzen eine vollständige Prüfung, kennzeichnet die App die Gruppe als nicht bestätigt. Ein leeres Ergebnis beweist keinen fehlenden Traffic. Die Übersicht oben bleibt auf Ebene der Property. Den Gruppenfilter können Sie entfernen; Adresse, Zurück-Navigation und Exporte behalten ihn bei.

## Teilen und exportieren

Bericht, Kanal, Zeitraum, Aufschlüsselung, Seitengröße und Position in der Liste stehen in der Adresse, sodass Sie eine Ansicht als Link teilen können. Der exakte Filter auf Host und Pfad gilt nur für die angezeigten Zeilen und fasst keine URL-Varianten zusammen.

CSV und Google Tabellen exportieren die gefilterten Zeilen mit unformatierten Zahlen. Die Spalte `ga4_scope_json` beschreibt den Umfang: Quelle, Property, Zeitraum, Zeitzone, Währung, Datenqualität, Seite und Filter.

## Messung und Kontingent

**Messzustand** liest nur die Admin-Einstellungen der Property und ändert nichts am Konto. Findet sie keine Lücken, beweist das nicht, dass das Tag auf der Website Daten sendet; dafür gibt es die verlinkten Erfassungstests. Teilbestände gibt die App als Mindestwerte an. Ist der Hauptschalter der erweiterten Messung aus, ist keine ihrer Unterfunktionen aktiv.

Kürzt Google die Daten im angeforderten Zeitraum, nennen Übersicht und Berichtsdetails den Grund und den Zeitraum, für den Google Daten liefert. Der Bericht gilt dann als eingeschränkt und wird nicht als verlässlicher Zeitraumvergleich dargestellt.

Der eingeklappte Bereich zum Kontingent zeigt den Stand aus der letzten Antwort von Google, nicht den Verbrauch im gewählten Zeitraum. Die Standardobergrenze ist eine Annahme. **Aktualisieren** fordert alle sichtbaren Berichte neu an und verbraucht dabei Kontingent.
