---
title: Übersicht
description: Die Übersicht zeigt den Suchtraffic des Projekts, die nächsten belegten Aufgaben und die Grenzen jeder Datenquelle auf einen Blick.
screen: Panel
route: /p/<proje>
updated: 2026-10-28
---

**Aktualisieren** liest die aktiven Datenquellen, den Einrichtungsstatus und die Google-Konfiguration neu. Schlägt ein einzelner Abruf fehl, meldet die Übersicht die Aktualisierung als teilweise. Die angezeigte Abrufzeit ist nicht der letzte Tag, für den Messdaten vorliegen.

## Suchdaten lesen

Standardmäßig zeigt die Übersicht 28 Tage Websuche über alle Geräte und Länder. Die letzten, noch unvollständigen Tage zählen nicht zu den Summen. Die Tage folgen der pazifischen Zeitzone, die Google für Search Console verwendet. Die Quellenangaben nennen den tatsächlichen Vergleichszeitraum, den letzten Datentag und ausgeschlossene Tage. Liefert Google kein Vollständigkeitsdatum, erklärt die Übersicht, welche Tage sie deshalb ausschließt.

Die vier Kacheln zeigen:

- **Klicks**: Besuche aus Google-Suchergebnissen.
- **Impressionen**: wie oft Ihre Seiten in Suchergebnissen erschienen.
- **CTR**: Anteil der Klicks an den Impressionen.
- **Durchschnittliche Position**: nach Impressionen gewichtet; ein kleinerer Wert ist besser.

Jede Kachel öffnet die Suchleistung mit demselben Zeitraum und denselben Filtern. Steigt ein Wert von null, zeigt die Kachel die absolute Änderung statt eines Prozentsatzes. Ohne Vorperiode wird keine Änderung angezeigt. Die blasse Linie im Diagramm sind die täglichen Klicks der Vorperiode.

Google verbirgt seltene Suchanfragen und begrenzt die Zahl der Zeilen. Die Liste der Suchanfragen bildet daher nie die gesamte Website ab.

## Aufgaben und Einrichtung

Die Übersicht nennt höchstens drei Aufgaben. Jede stammt aus einem Verbindungsfehler, einem gemessenen Audit-Befund, einer Suchanfrage mit Potenzial oder einem veralteten Crawl. Eine bloße Verbindung erzeugt keine Aufgabe, und ein Lesefehler wird nicht als „erstes Audit starten“ gedeutet. Erscheint keine Aufgabe, heißt das nicht, dass alle Datenquellen in Ordnung sind.

Die Einrichtung prüft dieselben sechs Signale wie der Projektkontext und trennt fehlende von nicht lesbaren Signalen. Ein abgeschlossenes Audit der eigenen Website gilt nach sieben Tagen als veraltet. Die optionale Einrichtungstour lässt sich einklappen; zurückgestellte Schritte können Sie jederzeit wiederherstellen.

## Geschätzte Zusatzklicks je Suchanfrage

Berücksichtigt werden Suchanfragen mit ausreichend Impressionen und einer gerundeten Position von 4 bis 20. Die Schätzung nimmt an, dass die Suchanfrage in das nächsthöhere Positionsband aufsteigt. Sie ist eine Obergrenze, kein gemessener Traffic.

Suchanfragen mit und ohne berechenbare Schätzung werden gezählt, bevor die vier angezeigten Zeilen ausgewählt werden. Ist keine Schätzung berechenbar, zeigt die Karte keine Obergrenze von null. Ob Markenbegriffe bestätigt, nur vorgeschlagen oder nicht hinterlegt sind, steht offen auf der Karte. Addieren Sie diese Schätzung nicht zur Summe auf dem Bildschirm Chancen: Diese rechnet pro Seite, mit anderem Zeitraum und anderer Einheit.

## Audit der eigenen Website

Die Karte berücksichtigt nur Crawls der Projektdomain; Audits anderer Websites zählen nicht, auch wenn sie neuer sind. Den letzten abgeschlossenen Stand und einen neueren laufenden oder fehlgeschlagenen Versuch zeigt sie getrennt. Hat das Projekt keine Domain, führt ein Link zu den Projekteinstellungen. Die Karte nennt Startadresse, Datum, Zahl der gemessenen Prüfungen und Seitenlimit.

Betroffene Seiten, Prüfungsarten und Kombinationen aus Seite und Prüfungsart sind verschiedene Einheiten: Eine einzelne Seite kann drei Prüfungen nicht bestehen. Der Balken zeigt nur kritische Befunde und Warnungen; Hinweise stehen daneben.

Alle Aussagen gelten nur für den gecrawlten Bereich. Fehlende Messungen oder ein erreichtes Seitenlimit bestätigen nicht die gesamte Website. Änderungen zwischen zwei Audits zeigt die Karte nur, wenn Startadresse, Einstellungen und URL-Menge übereinstimmen und beide Messungen lesbar sind. Ein kleinerer oder nicht lesbarer Crawl gilt nicht als Behebung. Ein Klick auf eine Seite öffnet die Probleme desselben Audits für diese URL.

## Analytics

Organische Sitzungen, aktive Nutzer, Interaktionen und Schlüsselereignisse stammen aus Google Analytics. Zeitraum und Zeitzone der Property sind sichtbar. Sitzungen sind keine Google-Klicks: Sie enthalten auch Besuche aus anderen Suchmaschinen. Ein unbekannter oder gesperrter Wert bedeutet nicht null Traffic; lesbare Werte bleiben sichtbar. Datenschutzschwellen, Stichproben und Zugriffsbeschränkungen werden erklärt. Ist ein Vergleich unsicher, entfällt er; unbekannte Tage bleiben Lücken im Diagramm.

Hat einer der beiden Zeiträume Umsatz oder Bestellungen, bleiben beide Werte sichtbar, auch wenn der andere Zeitraum null zeigt. Ohne Nachweis gilt die Umsatzmessung als unbestätigt. Ist die Währung unbekannt, steht das am Betrag. Den Hinweis zur Verkaufsmessung finden Sie in der aufklappbaren Erklärung zum organischen Umsatz.

Zeigt die Karte unbekannte Sitzungen, prüfen Sie die Quellenwarnungen im Analytics-Bericht, die Zugriffsrechte und das Tag auf der Website.

## Wenig Daten

Liegen die Klicks des Vergleichszeitraums unter der Analyseschwelle, nennt die Zusammenfassung zuerst die tatsächlichen Klicks und Impressionen. Prozentsätze und Mittelwerte belegen bei wenig Daten weder Wachstum noch Verlust.

Eine leere Liste bedeutet nicht, dass keine Suchanfrage auf Position 4 bis 20 steht. Auch die zeitraumabhängige Impressionsschwelle und der Ausschluss von Markensuchanfragen können sie leeren.

Die Übersicht enthält kein Suchvolumen, keine Backlinks und keine Rankings von Mitbewerbern. Wollen Sie Zahlen mit der Search Console abgleichen, verwenden Sie dort denselben Zeitraum und dieselben Filter.
