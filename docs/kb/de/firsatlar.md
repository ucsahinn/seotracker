---
title: Chancen
description: Welche Seite zuerst? Seiten, die Google bereits zeigt, nach einer Obergrenze zusätzlicher Klicks aus Ihren Search-Console-Daten, mit Aufgabe.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

Chancen ordnet die Seiten Ihrer Website, die Google bereits in den Suchergebnissen zeigt, nach dem möglichen Zugewinn an Klicks. Grundlage sind Ihre Search-Console-Daten und die Klickraten Ihrer eigenen Website. Jede Seite erhält eine vorgeschlagene Aufgabe und eine Obergrenze für zusätzliche Klicks. Diese Obergrenze ist weder Prognose noch Garantie.

## Wo anfangen

**Hier anfangen** öffnet die Seite mit der höchsten berechenbaren Obergrenze und nennt die Maßnahme, die Sie prüfen sollten. Wie aufwendig diese Arbeit ist, misst die App nicht.

## Zeitraum und Obergrenze

Wählen Sie 7, 28 oder 90 Tage. Die Search Console liefert vollständige Tage nach Googles pazifischem Kalender. Fehlt Googles Vollständigkeitsgrenze, kennzeichnet die App die angenommene Verzögerung. Anfangs- und Enddatum sind sichtbar.

Die Obergrenze wird auf 30 Tage umgerechnet. Sie ist eine Umrechnung des gewählten Zeitraums, keine Monatsprognose und keine Angabe zum Suchvolumen. Sie umfasst nur abgerufene, identifizierbare Suchanfragen mit ausreichend Daten. Wie viele Suchanfragen Google verbirgt, ist unbekannt; Zeilenlimits nennt die App. Die aktuellen Klicks als Vergleichsbasis enthalten alle Klicks der Kandidatenseiten, auch aus Markensuchen.

Die Übersicht schätzt Zusatzklicks je Suchanfrage nach einem anderen Modell. Addieren Sie die beiden Werte nicht.

## Vier Arbeitsarten

Jede Seite fällt nach ihren gemessenen Suchanfragen in eine Arbeitsart:

| Arbeitsart                           | Lage                                                                                           | Vorschlag                                            |
| ------------------------------------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Titel und Beschreibung**           | Auf Seite eins, aber seltener geklickt als andere Suchen Ihrer Website auf derselben Position. | **Titel und Beschreibung überarbeiten**              |
| **Auf Seite eins, Positionen 4-10**  | Unter den Top drei. Eine Stufe höher bringt deutlich mehr Klicks.                              | **Inhalt stärken**                                   |
| **Auf Seite zwei, Positionen 11-20** | Knapp hinter Seite eins; bis zum Aufstieg kaum Klicks.                                         | **Intern verlinken, Inhalt erweitern**               |
| **Weit hinten, nach Position 20**    | Impressionen vorhanden, Position niedrig.                                                      | **Suchabsicht und Themenabdeckung der Seite prüfen** |

## So entsteht die Liste

Zuerst stehen Seiten mit berechneter Obergrenze, absteigend nach Gewinn. Danach folgen Seiten mit Impressionen, deren Gewinn sich nicht berechnen lässt, absteigend nach Impressionen. Ein unbekannter Gewinn ist nicht null; die Summen enthalten nur berechnete Gewinne. Sind alle Gewinne unbekannt, zeigen die Aufgabenarten nur Seitenzahlen ohne Gewinnbalken.

Ist der Gewinn einer Seite unbekannt, richtet sich die vorgeschlagene Aufgabe allein nach der Position:

| Position | Vorschlag                        |
| -------- | -------------------------------- |
| 1–5      | Titel und Snippet prüfen         |
| 6–10     | Inhalt verbessern                |
| 11–20    | Interne Links und Inhalt stärken |
| ab 21    | Suchabsicht prüfen               |

Der Vorschlag belegt weder eine niedrige CTR noch einen künftigen Gewinn.

Die CTR-Differenz vergleicht in Prozentpunkten nur geeignete Suchanfragen ohne Markenbezug auf derselben Impressionsbasis.

## Filter und Tabelle

Aufgaben- und Conversion-Filter wirken gemeinsam (UND). Aufgabenfilter beruhen auf den Vorschlägen, Conversion-Filter auf gemessenen Analytics-Signalen; ein Conversion-Filter erscheint nur, wenn es bestätigte Einträge gibt. Der Server filtert alle Kandidatenseiten und zeigt dann die ersten 25, 50 oder 100 Treffer. Die Gesamtsummen ändern sich dabei nicht. Eine Seite kann in mehreren Aufgabenarten zählen; addieren Sie deren Seitenzahlen nicht. Zeitraum, Zeilenzahl und Filter stehen in der Adresse.

Am Desktop erscheint eine sortierbare Tabelle, auf dem Smartphone eine Seitenliste mit aufklappbaren Details. Die Details zeigen je Suchanfrage Impressionen, Position, angestrebte Position und den zugeteilten Klickanteil. Die zehn größten Beiträge stehen einzeln, der Rest in der Zeile **Weitere Suchanfragen (zugeteilter Rest)**; zusammen ergeben sie die Obergrenze der Seite. Suchanfragen ohne Markenbezug stehen nach Impressionen sortiert; reine Markenseiten sind gekennzeichnet.

## Unbekannte Werte

Ein nicht berechenbarer Umfang bedeutet kein fehlendes Potenzial. Die App trennt drei Fälle von einer gemessenen Null: Suchanfragen ohne Zuordnung zu einer Seite, zu wenige Impressionen und fehlende Vergleichsraten. Liefert Google keine Seitenzeilen, beweist das nicht, dass es keine Impressionen gab.

Bei wenig Daten ist der Zugewinn unbekannt, nicht null. Fehlen geeignete Suchanfragen ohne Markenbezug, kann das an verborgenen Suchanfragen, am Ausschluss von Markensuchen oder an Datenlimits liegen. Ein längerer Zeitraum kann mehr Suchanfragen zeigen; beim längsten Zeitraum schlägt die App keine Verlängerung mehr vor. Öffnen Sie dann die Suchleistung und prüfen Sie die Suchanfragen mit Impressionen. Die Rechenwege stehen im aufklappbaren Bereich zur Datenabdeckung.

Ist der Gewinn einer Seite unbekannt, prüfen Sie zuerst die Seite und ihre erfassten Suchanfragen. Ändern Sie Titel oder Inhalt erst, wenn Sie eine konkrete Abweichung gefunden haben.

## Analytics ergänzen

Ist Analytics verbunden, ergänzt die App gemessene organische Sitzungen, Schlüsselereignisse und den Anteil der Sitzungen mit Schlüsselereignis. Aus zusätzlichen Klicks prognostiziert sie keine künftigen Ereignisse. Analytics verwendet dieselben Kalendertage in der Zeitzone der Property; das ist nicht zwingend derselbe Zeitabschnitt wie in der Search Console.

Die Conversion-Übersicht trennt zugeordnete Seiten von Seiten mit unbekanntem Conversion-Status. Fehlende Analytics-Daten bedeuten nicht null Conversions; die Seitendetails erklären sie einmal, statt sie in jeder Zeile zu wiederholen. Eingeschränkte Messwerte bleiben unbekannt. Mehrere URL-Varianten können zur selben Analytics-Gruppe gehören; summieren Sie deren Sitzungen nicht über mehrere Zeilen.

**Analytics-Adressgruppe prüfen** in Zeile und Details öffnet die organischen Einstiegsseiten in Analytics, gefiltert auf die normalisierte Adressgruppe. Fehlt eine passende Adresse oder fehlen Daten, steht statt des Links eine Erklärung. Die Gruppe wird aus denselben höchstens 1.000 Quellzeilen gefiltert, die auch Chancen nutzt.

Ist das Kontingent erschöpft, warten Sie und aktualisieren Sie. Fehlen Rechte, prüfen Sie die Verbindung. Schlägt eine Aktualisierung fehl, bleiben die bisherigen Daten mit ihren ursprünglichen Daten und einer Warnung sichtbar.

## Export und Erfolgskontrolle

CSV und Google Tabellen enthalten die gefilterten Zeilen mit Zeitraum, 30-Tage-Obergrenze, Modell, Property, Quelle der Markenbegriffe, Datenbeschränkungen und Analytics-Gruppe. Unbekannte Gewinne bleiben leer; dazu kommen Status, Grund, Markenhinweis und gemessene Suchanfragen. In Google Tabellen schreibt die App erst, nachdem Sie ein Ziel ausgewählt haben.

**In der Suchleistung öffnen** übernimmt Start- und Enddatum und öffnet die Details der exakten URL. Ist ein Zeitraum nicht lesbar, erklärt die App das, statt andere Daten einzusetzen.

So kontrollieren Sie den Erfolg einer Maßnahme: Notieren Sie, was Sie geändert haben, und vergleichen Sie danach gemessene Klicks, CTR und Position in vergleichbaren Zeiträumen. Eine sinkende Schätzung allein beweist keinen Erfolg. Löschen Sie keine Inhalte nur wegen einer niedrigen Position oder Schätzung. Seiten zusammenzuführen lohnt sich erst, wenn sie nachweislich denselben Nutzerbedarf bedienen.
