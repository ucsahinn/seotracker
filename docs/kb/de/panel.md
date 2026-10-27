---
title: Übersicht (Panel)
description: Der erste Bildschirm eines Projekts: Suchzahlen der letzten 28 Tage, Stand der Einrichtung, anstehende Aufgaben und Zusammenfassung des letzten Audits.
screen: Panel
route: /p/<proje>
updated: 2026-10-27
---

Das ist der erste Bildschirm eines Projekts. Er zeigt den aktuellen Stand Ihrer Website und was als Nächstes zu tun ist.

Die Suchzahlen kommen aus der Google Search Console. Die Besucherzahlen kommen aus Google Analytics. Die Audit-Zusammenfassung kommt vom eigenen Website-Crawler der App. Die Schaltfläche **Aktualisieren** oben aktualisiert alles. Hat das Projekt mindestens ein Audit, erscheint daneben **Audit starten** und führt Sie zum Audit-Bildschirm. Unter dem Titel steht die Domain des Projekts.

## Was auf dem Bildschirm zu sehen ist

**Vier Zahlenkarten.** **Klicks**, **Impressionen**, **CTR** und **Durchschnittliche Position** zeigen die letzten 28 Tage. Jede Karte hat einen Pfeil im Vergleich zu den vorherigen 28 Tagen. Bei der Durchschnittsposition ist eine kleine Zahl gut, denn 1 ist die oberste Position. Fällt die Zahl, ist das also eine gute Nachricht, und der Pfeil wird entsprechend gefärbt. Ist die Search Console nicht verbunden, steht auf der Karte „Wird angezeigt, sobald die Verbindung hergestellt wurde“. Ist sie verbunden, gab es im Zeitraum aber keine Impressionen, steht dort „Keine Impressionen in diesem Zeitraum“.

**Nächste Schritte.** Neben der Überschrift nennt ein Etikett den Stand der Einrichtung: „Einrichtung 4 / 6“ oder, wenn alles erledigt ist, „Einrichtung vollständig“. Gezählt werden sechs Punkte: Search Console, Analytics, eine aktuelle Prüfung, die Projektdefinition, der PageSpeed-Schlüssel und der KI-Agent. Dieselben sechs Punkte stehen auch auf dem Bildschirm **Projektkontext**, beide Bildschirme zeigen also dieselbe Zahl. Eine aktuelle Prüfung ist eine Prüfung der eigenen Website des Projekts, die in den letzten sieben Tagen abgeschlossen wurde. Die Prüfung einer anderen Website zählt nicht. Was fehlt, steht in der Zeile „In der Einrichtung fehlt: ...“, und der Link **Vervollständigen** daneben führt zum Bildschirm Projektkontext. Die Einrichtung sagt nichts über die Website selbst aus. Sie ist nur eine Aufgabenliste.

Die App schlägt höchstens drei Aufgaben vor. Die Reihenfolge ist:

- Ist die Search Console nicht verbunden: **Search Console verbinden** (Schaltfläche: **Verbinden**). Wurde der Google-Zugriffsschlüssel noch nicht eingetragen, steht anstelle dieser Zeile eine Warnung „Google-Zugriffsschlüssel fehlt“ mit der Schaltfläche **Geben Sie den Google-Zugriffsschlüssel in den Einstellungen ein**.
- Gibt es kein Audit: **Führen Sie Ihr erstes Audit durch** (Schaltfläche: **Starten**). Hier endet die Liste.
- Ist das letzte Audit fehlgeschlagen: **Audit erneut ausführen.** (Schaltfläche: **Erneut ausführen**). Darunter stehen die Ursache, ob der Fehler bei der Website oder bei der App liegt, und was zu tun ist. Läuft ein Audit: **Audit läuft** (Schaltfläche: **Fortschritt anzeigen**).
- Gibt es kritische Probleme: „N Kritische Probleme“ (Schaltfläche: **Ansehen**).
- Ist die Search Console verbunden: **Chancen ansehen** (Schaltfläche: **Öffnen**).
- Das letzte Audit ist älter als sieben Tage: **Audit aktualisieren** (Schaltfläche: **Starten**).
- Gibt es Warnungen: „N Warnungen“ (Schaltfläche: **Ansehen**).

Ist eine Aufgabe erledigt, verschwindet sie aus der Liste. Ist die Liste leer, steht dort „Nichts Dringendes. Das Audit ist aktuell und es gibt keine kritischen Probleme.“

**Neu im letzten Audit** und **Behoben**. Diese Karte erscheint nur, wenn sie etwas zu sagen hat. Ist das letzte Audit älter als sieben Tage, steht dort „Seit der letzten Prüfung sind N Tage vergangen“, und sie bietet **Audit starten** an. Haben sich Probleme zwischen den letzten beiden Audits verändert, erscheinen zwei Listen. **Neu im letzten Audit** zeigt, welche Probleme neu gesehen wurden, **Behoben**, welche geschlossen wurden. Wurde nichts behoben, steht dort „Keine behobenen Probleme.“ Gibt es weder das eine noch das andere, erscheint die Karte gar nicht.

**Klicktrend.** Ein Liniendiagramm der täglichen Klicks der letzten 28 Tage. Es nennt die Summe, die Veränderung gegenüber dem Vorzeitraum und den besten Tag. Gibt es weniger als vier Tage Daten, wird keine Linie gezeichnet. Der Link **Suchanfragen öffnen** öffnet den Bildschirm **Suchleistung**.

**Suchanfragen nahe den Top drei.** Hier stehen die Suchen mit einer Durchschnittsposition zwischen 4 und 20 und ausreichend Impressionen. Die Karte nennt, wie viele Zusatzklicks sie zusammen bringen könnten, wenn jede eine Stufe aufstiege. Das ist eine Obergrenze. Jede Zeile zeigt die Position der Suche und den möglichen Gewinn. Ein Klick auf eine Zeile öffnet diese Suche im Bildschirm Suchleistung. **Alle anzeigen** öffnet den Reiter Ranking-Chancen im Bildschirm Suchleistung. Hat keine Suche genug Impressionen, sagt die Karte das.

**Karte Website-Audit.** Sie zeigt, wie viele Seiten gecrawlt wurden und an welchem Datum, die häufigsten Probleme und die Seiten mit den meisten Problemen. Läuft ein Audit, steht dort „Das Audit läuft; die Ergebnisse erscheinen nach Abschluss.“, und die Karte aktualisiert sich alle fünf Sekunden. Konnte das Audit nicht abgeschlossen werden, steht dort „Das letzte Audit konnte nicht abgeschlossen werden, daher gibt es keine Ergebnisse.“ Wurden keine Probleme gefunden, steht dort „Keine Probleme gefunden; Ihre Website sieht fehlerfrei aus.“ Unter den Problemen zeigt ein Balken die Schweregrade. Das Fragezeichen erklärt die drei Stufen: Kritische Probleme können verhindern, dass eine Seite in der Suche erscheint, Warnungen höhlen das Ranking mit der Zeit aus, Hinweise sind kleine Verbesserungen. Ein Klick auf den Balken oder eines der Etiketten darunter führt zur Problemliste. Ganz unten steht die Liste **Seiten mit den meisten Problemen**. Gibt es kein Audit, erscheint diese Karte nicht, weil „Nächste Schritte“ das erste Audit schon vorschlägt. **Details** öffnet den Reiter „Seiten mit Problemen“ des Audits.

**Karte Organischer Traffic.** Sie erscheint, wenn Google Analytics verbunden ist. Für Besucher, die aus der Suche kamen, zeigt sie **Sitzungen**, **Aktive Nutzer**, **Interaktionsrate** und **Schlüsselereignisse**. Wird auf der Website ein Verkauf gemessen, kommen **Organischer Umsatz** und **Transaktionen** hinzu. Oben auf der Karte öffnet **Berichte** den Analytics-Bildschirm und **Verwalten** die Analytics-Verbindungseinstellungen. Ein Hinweis unten sagt, dass Analytics einen Tag und die Search Console drei Tage hinterherhinkt. Deshalb weichen die Tage dieser Karte von den Klickkacheln oben ab. Ist Analytics nicht verbunden, steht anstelle der Karte eine Einladung zum Verbinden. Schließen Sie sie, kommt sie nicht wieder.

Kann die Karte die Daten nicht lesen, zeigt sie einen Satz mit Ursache und Lösung und bietet zwei Schaltflächen: **Verbindung reparieren** (öffnet die Analytics-Einstellungen) und **Erneut versuchen**. Die wichtigsten Ursachen sind:

- Die Verbindung ist abgelaufen oder widerrufen. Verbinden Sie sie unter **Einstellungen** neu.
- Das verbundene Konto kommt nicht mehr an die Property. Geben Sie dem Konto oder dem Dienstkonto mindestens die Rolle Betrachter für die Property.
- Die Property wurde gelöscht oder verschoben. Wählen Sie sie unter **Einstellungen** neu.
- Mit diesem Projekt ist keine Analytics-Property verbunden. Wählen Sie unter **Einstellungen** eine aus.
- Das Berichtskontingent ist aufgebraucht. Das Kontingent erneuert sich stündlich und täglich, versuchen Sie es später erneut.
- Die Google Analytics Data API ist in Ihrem Google-Cloud-Projekt ausgeschaltet. Schalten Sie in der Google Cloud Console „Google Analytics Data API“ ein.
- Google ist nicht erreichbar. Prüfen Sie die Internetverbindung dieses Computers.
- Google antwortet vorübergehend nicht. Versuchen Sie es gleich noch einmal.

Hat die Karte keine organischen Sitzungen, steht dort „In diesem Zeitraum wurde kein organischer Such-Traffic erfasst.“ Es ist nichts kaputt. In dem Zeitraum gab es keine Besuche aus der Suche.

**Richten Sie Ihren Arbeitsbereich ein.** Ganz unten stehen die Einrichtungsschritte in einem zugeklappten Kasten. Die Schritte: Website hinzufügen, weitere Websites hinzufügen, KI-Agent verbinden, Search Console verbinden und das Projekt beschreiben. Dort steht „N Schritte übrig. Alles optional“. Mit **Vorerst überspringen** schieben Sie einen Schritt auf. Aufgeschobene und erledigte Schritte werden unter dem Kasten gezählt, mit **Wiederherstellen** holen Sie sie zurück. Sind alle erledigt, verschwindet der Kasten.

## So gehen Sie vor

1. Öffnen Sie sie einmal pro Woche und sehen Sie sich die Pfeile auf den vier Karten an.
2. Erledigen Sie die erste Aufgabe im Kasten **Nächste Schritte**. Ist der Kasten leer, ist nichts dringend.
3. Zeigt das Einrichtungsetikett etwas Fehlendes, klicken Sie auf **Vervollständigen**. Fehlende Punkte sind schnell erledigt.
4. Ist das letzte Audit älter als sieben Tage, klicken Sie auf **Audit starten**.
5. Sehen Sie sich Titel und Beschreibung der Seiten auf der Karte **Suchanfragen nahe den Top drei** noch einmal an. Der leichteste Gewinn liegt meist hier.
6. Erscheint die Karte **Neu im letzten Audit** und **Behoben**, geben Sie den neu gesehenen Problemen Vorrang. Die Veränderung einer Woche sehen Sie auf einen Blick.

## Wie die Zahlen berechnet werden

Die vier Karten stammen aus einem einzigen Bericht der Search Console. Google liefert die Daten mit drei Tagen Verzögerung. Der 28-Tage-Zeitraum endet deshalb nicht heute, sondern drei Tage davor. Der Vorzeitraum sind die 28 Tage direkt vor diesem Zeitraum. Ist der Vorzeitraum null, wird kein Pfeil gezeigt.

Bei der Durchschnittsposition zählen Suchen mit vielen Impressionen stärker. Diese vier Zahlen sind die echten Summen der Website. Addieren Sie die Tabellenzeilen im Bildschirm **Suchleistung**, kommt eine größere Zahl heraus, weil Google jede Seite, die bei derselben Suche erscheint, einzeln zählt.

Der Gewinn auf der Karte **Suchanfragen nahe den Top drei** ist eine Obergrenze. Es sind die Zusatzklicks, die jede Suche bekäme, wenn sie eine Stufe aufstiege. Dieselbe Rechnung gilt im Bildschirm Chancen. Beide Bildschirme nennen dieselbe Zahl.

Das Einrichtungsetikett ist eine Zahl, keine Prozentzahl und kein Punktwert. Es zeigt, wie viele der sechs Punkte erledigt sind.

## Häufige Fragen

**Warum fehlen die Daten von heute?** Google hat die letzten drei Tage noch nicht geliefert. Das ist keine Störung.

**Die Durchschnittsposition ist gestiegen. Ist das gut?** Nein. Von 3 auf 7 zu kommen, ist ein Rückgang. Deshalb wird der Pfeil rot.

**Zeigt die Audit-Karte, was Google sieht?** Nein. Sie zeigt, was der eigene Crawl der App gefunden hat. Welche Seiten Google indexiert hat, sehen Sie im Reiter **Indexstatus** des Audit-Bildschirms.

**Es gibt keine Karte Organischer Traffic.** In den Projekteinstellungen ist Google Analytics nicht verbunden, oder Sie haben die Karte geschlossen. Das Verbinden ist optional.

**Warum steht bei der Einrichtung 5 / 6, obwohl ich alles erledigt glaubte?** Die Zeile „In der Einrichtung fehlt“ nennt den fehlenden Punkt. Meist ist es ein PageSpeed-Schlüssel oder ein Audit aus den letzten sieben Tagen.

**Die Analytics-Karte zeigt einen Fehler.** Der Satz auf der Karte nennt die Ursache. Meist genügt es, die Verbindung unter **Einstellungen** zu erneuern.

## Grenzen

Die Übersicht zeigt weder Suchvolumen noch Backlinks (Links von anderen Websites auf Sie) noch Positionen von Mitbewerbern. Diese Daten gibt es in der App nicht. Sehr selten gesuchte Anfragen blendet die Search Console aus. Für Details wechseln Sie zum passenden Bildschirm.

<!-- Quellen: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; Ga4ConnectCard.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; DashboardOnboarding.tsx; dashboardSteps.ts; GoogleSetupBanner.tsx; src/client/features/projects/projectSetupQuery.ts; src/shared/projectSetup.ts; src/server/lib/errors.ts; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
