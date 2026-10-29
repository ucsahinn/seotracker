---
title: Ranking-Verfolgung
description: Google-Positionen Ihrer Suchanfragen und deren Entwicklung verfolgen. Das lokale Archiv bewahrt Daten auch über die 16-Monate-Grenze hinaus.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

Die Ranking-Verfolgung zeigt Suchanfragen der Websuche aus Ihrem lokalen Archiv der Search-Console-Daten. Die durchschnittliche Position ist kein fester Rang: Ort, Gerät und Suchkontext verändern das Ergebnis jeder einzelnen Suche. Impressionen sind kein Suchvolumen. Rankings von Mitbewerbern, Suchvolumen und Traffic-Prognosen liefert die App nicht.

## Zuerst die Bewegungen prüfen

Die Zusammenfassung zählt Suchanfragen, die in beiden Zeiträumen beobachtet wurden, und Bewegungen ab einer halben Position. Suchanfragen ohne möglichen Vergleich stehen separat. Öffnen Sie zuerst den vorgeschlagenen Rückgang.

Die Reihenfolge ergibt sich aus Positionsänderung mal Impressionen. Das ist eine Prüfreihenfolge, keine Schätzung verlorener Klicks. Die Listen zeigen zunächst drei Einträge und aufgeklappt höchstens fünf; aufklappen lässt sich erst ab mehr als drei Bewegungen. Wurde keine Suchanfrage in beiden Zeiträumen beobachtet, erklärt die Bewegungskarte das, statt null anzuzeigen.

## Zeitraum und Abdeckung

Wählen Sie 30, 90, 180, 480 oder 1825 Tage. 1825 Tage sind die letzten fünf Jahre im Archiv, nicht zwingend der gesamte Verlauf. Monatsangaben sind gerundet; die genauen Daten stehen in den Datendetails.

Die Tage folgen dem Kalender America/Los_Angeles. Das Enddatum nimmt drei Tage Verzögerung an, ohne bei Google zu prüfen, ob die Daten vollständig sind. Importiert werden nur Tage, die Google als endgültig liefert.

Die App zählt getrennt, an wie vielen Tagen Google vollständig geantwortet hat, an wie vielen die App selbst die Abfrage begrenzt hat, wie viele Fehler auftraten und für wie viele Tage die Abdeckung unbekannt ist. Ältere Archivtage werden nicht nachträglich als vollständig eingestuft. Auch eine vollständige Antwort enthält keine Suchanfragen, die Google verbirgt oder auslässt. „Letzte Beobachtung“ und „letzter geprüfter Tag“ sind verschiedene Angaben.

## Wie sich das Archiv füllt

Solange dieser Bildschirm geöffnet ist, lädt die App fehlende Tage selbst nach; auch die **Suchleistung** aktualisiert das Archiv, solange sie geöffnet ist. Sind beide Bildschirme oder die App geschlossen, wird nichts abgerufen.

- Nach jeder begrenzten Übertragung wartet die App 15 Sekunden, bevor sie den nächsten Abschnitt anfordert.
- Ist das Archiv aktuell, prüft sie alle 15 Minuten erneut.
- Nach einem Verbindungs- oder Kontingentfehler wartet sie 15 Minuten.
- Nach einem Autorisierungsfehler müssen Sie die Verbindung selbst erneuern.

**Archiv weiter füllen** setzt die Übertragung von Hand fort. Der erste Import beginnt am Anfang von Googles 16-monatiger Aufbewahrung; Tage, die Google nicht mehr liefert, lassen sich nicht zurückholen. Jeder Durchlauf bearbeitet höchstens vier Zeitfenster; Fenster mit vielen Zeilen werden in Tage geteilt und später fortgesetzt. Pro Tag liest die App bis zu den 50.000 Zeilen, die Google liefert; ein Tag, der trotzdem nicht vollständig wird, bleibt unvollständig. Der vorhandene Verlauf bleibt währenddessen lesbar.

## Verteilung, Suche und Filter

Die Verteilung zählt alle Suchanfragen, die im aktuellen Zeitraum beobachtet wurden. Positionen werden gerundet: 3,4 wird zu 3 und fällt in die erste Gruppe, 3,5 wird zu 4 und fällt in die zweite. Die Balkenlänge bezieht sich auf die größte Gruppe, der Prozentwert auf alle beobachteten Suchanfragen. Änderungen sind Nettoänderungen derselben vergleichbaren Suchanfragen; fehlende Vergleiche erscheinen nicht als null.

Suche und Filter durchsuchen alle Suchanfragen, nicht nur die ersten hundert. Die Zähler berücksichtigen den Suchtext und alle anderen aktiven Filter.

- **Viele Impressionen** umfasst das obere Viertel nach Impressionen, einschließlich Suchanfragen genau auf dem Grenzwert.
- **Top 10** umfasst auch Suchanfragen ohne frühere Beobachtung.
- **Aus den Top 10 ausgeschieden** setzt Beobachtungen in beiden Zeiträumen voraus.

Alle Filter lassen sich gemeinsam entfernen. Eine Seite zeigt 25, 50 oder 100 Einträge; die Zusammenfassung bleibt dabei gleich.

Suchanfragen, die früher beobachtet wurden und jetzt fehlen, stehen in einer eigenen Liste. Das beweist weder einen Rangverlust noch Position null. Die Liste zeigt die ersten 25 nach Impressionen und berücksichtigt den Suchtext.

## Verlauf einer Suchanfrage

Positionen sind nach Impressionen gewichtete Mittelwerte. Die Änderung ist der vorherige minus den aktuellen Mittelwert, ein positiver Wert also eine Verbesserung. Änderungen unter 0,05 Positionen gelten als neutral, deutliche Bewegungen beginnen bei 0,5. Die Detailansicht vergleicht dieselben Zeiträume wie die Tabelle.

Die Zahl der beobachteten Tage steht immer dabei: 10 von 90 Tagen sind keine vollständige Abdeckung. Die Punkte im Diagramm folgen dem Kalender; fehlende Tage unterbrechen die Linie. Fehlende Wochen bleiben Lücken, Wochen am Rand des Zeitraums können unvollständig sein. Mit Pfeiltasten, Pos1 und Ende wechseln Sie den Tag; die Tageswerte lassen sich als Liste aufklappen.

Der Link zur Suchleistung übernimmt die exakte Suchanfrage und den Zeitraum. Liegt der Zeitraum vor Googles Aufbewahrungsgrenze von 16 Monaten, nennt die App vorher das früheste Datum, das Google noch liefert.
