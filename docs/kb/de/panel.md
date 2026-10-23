---
title: Übersicht (Panel)
description: Der erste Bildschirm eines Projekts: Suchzahlen der letzten 28 Tage, Zusammenfassung des letzten Audits und anstehende Aufgaben.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

Sie sehen den aktuellen Stand Ihrer Website und erfahren, was als Nächstes zu tun ist. Dieser Bildschirm erscheint zuerst, wenn Sie ein Projekt öffnen.

Die Suchzahlen kommen aus Googles Werkzeug Search Console. Die Besucherzahlen kommen aus Google Analytics. Die Audit-Zusammenfassung stammt vom eigenen Website-Crawler der App. Die Schaltfläche **Yenile** (Aktualisieren) oben lädt alles neu. **Denetimi başlat** (Audit starten) führt Sie zum Audit-Bildschirm.

## Was auf dem Bildschirm zu sehen ist

**Vier Zahlenkarten.** Die Karten heißen **Tıklama** (Klicks), **Gösterim** (Impressionen), **Tıklama oranı** (Klickrate) und **Ortalama sıra** (Durchschnittsposition). Alle zeigen die letzten 28 Tage. Auf jeder Karte steht ein Pfeil im Vergleich zu den 28 Tagen davor. Bei der Durchschnittsposition ist eine kleine Zahl gut, denn 1 ist die oberste Position. Ein Rückgang ist also eine gute Nachricht, und der Pfeil wird entsprechend gefärbt. Ist die Search Console nicht verbunden, steht auf der Karte „Search Console'u bağlayın“ (Verbinden Sie die Search Console).

**Nächste Schritte.** Die App schlägt Ihnen höchstens drei Aufgaben vor. Die Vorschläge kommen in dieser Reihenfolge:

- Ist die Search Console nicht verbunden: **Search Console'u bağla** (Search Console verbinden).
- Gibt es noch kein Audit oder ist das letzte älter als sieben Tage: **Denetimi başlat** (Audit starten).
- Gibt es ernste Probleme: **Kritik sorunları gör** (Kritische Probleme ansehen).
- Danach **Fırsatları aç** (Chancen öffnen) und **Uyarıları gör** (Warnungen ansehen).

Ist eine Aufgabe erledigt, verschwindet der Eintrag aus der Liste.

**Neu im letzten Audit und Behobenes.** Die Karte vergleicht die beiden letzten Audits. Sie sehen, welches Problem auf wie vielen Seiten neu aufgetreten ist und welches weniger geworden ist. Gibt es nichts Behobenes, steht dort „Düzelen sorun yok.“ (Keine behobenen Probleme.)

**Klickverlauf.** Die täglichen Klicks der letzten 28 Tage sehen Sie als Linie. Liegen Daten für weniger als vier Tage vor, wird keine Linie gezeichnet. Der Link **Sorguları aç** (Suchanfragen öffnen) führt Sie zum Bildschirm **Arama performansı** (Suchleistung).

**Suchanfragen auf Position 5 bis 20.** Hier stehen Ihre ersten vier Suchanfragen, mit denen Sie bei Google auf Position 5 bis 20 erscheinen. Mit etwas Arbeit können sie auf die erste Seite oder auf die oberen Positionen steigen. **Tümünü gör** (Alle ansehen) öffnet die vollständige Liste.

**Karte Website-Audit.** Die Karte zeigt, wie viele Seiten gecrawlt wurden, die drei häufigsten Probleme und die fünf Seiten mit den meisten Problemen. Läuft ein Audit, aktualisiert sich die Karte alle fünf Sekunden. Das Fragezeichen-Symbol erklärt die drei Schweregrade:

- Kritisch: beeinträchtigt direkt, ob Sie in der Suche erscheinen.
- Warnung: schwächt die Platzierung mit der Zeit, ist aber nicht dringend.
- Hinweis: kleine Chancen zur Verbesserung.

**Karte Organischer Traffic.** Sie erscheint, wenn Google Analytics verbunden ist. Für Besucher aus der Suche zeigt sie die Zahlen **Oturum** (Sitzungen), **Aktif kullanıcı** (Aktive Nutzer), **Etkileşim oranı** (Interaktionsrate) und **Anahtar olay** (Schlüsselereignisse). Wird auf Ihrer Website Umsatz gemessen, kommen **Organik gelir** (Organischer Umsatz) und **Sipariş** (Bestellungen) hinzu.

## So gehen Sie vor

1. Öffnen Sie den Bildschirm einmal pro Woche und achten Sie auf die Pfeile der vier Karten.
2. Erledigen Sie die erste Aufgabe im Kasten **Sıradaki adımlar** (Nächste Schritte). Ist der Kasten leer, gibt es nichts Dringendes.
3. Ist das letzte Audit älter als sieben Tage, klicken Sie auf **Denetimi başlat**.
4. Sehen Sie sich Titel und Beschreibung der Seiten auf der Karte **Sıra 5-20 arası sorgular** (Suchanfragen auf Position 5 bis 20) noch einmal an. Der leichteste Gewinn liegt meist hier.

## Wie die Zahlen berechnet werden

Die vier Karten stammen aus einem einzigen Bericht der Search Console. Google liefert die Daten mit drei Tagen Verzögerung. Deshalb endet der 28-Tage-Zeitraum nicht heute, sondern drei Tage davor. Der Vergleichszeitraum sind die 28 Tage unmittelbar vor diesem Zeitraum. Ist der Wert im Vergleichszeitraum null, wird kein Pfeil angezeigt.

Die Durchschnittsposition gewichtet Suchanfragen mit vielen Impressionen stärker. Diese vier Zahlen sind die tatsächlichen Summen der Website. Addieren Sie die Tabellenzeilen auf dem Bildschirm **Arama performansı**, kommt ein größerer Wert heraus, weil Google jede Seite, die bei derselben Suche erscheint, einzeln zählt.

## Häufige Fragen

**Warum fehlen die Daten von heute?** Google liefert die letzten drei Tage noch nicht. Es fehlt nichts; warten Sie einfach ab.

**Die Durchschnittsposition ist gestiegen. Ist das gut?** Nein. Von 3 auf 7 zu kommen, bedeutet einen Abstieg. Deshalb wird der Pfeil rot.

**Zeigt die Audit-Karte, was Google sieht?** Nein. Sie zeigt, was der eigene Crawl der App gefunden hat. Welche Seite Google gespeichert hat, sehen Sie im Reiter **Dizin durumu** (Indexstatus) auf dem Audit-Bildschirm.

**Die Karte Organischer Traffic fehlt.** In den Projekteinstellungen ist Google Analytics nicht verbunden. Die Verbindung ist freiwillig.

## Grenzen

Das Panel zeigt kein Suchvolumen, keine Backlinks (Links von anderen Websites auf Ihre) und keine Positionen von Wettbewerbern. Diese Daten gibt es in der App nicht. Sehr selten gesuchte Suchanfragen blendet die Search Console aus. Für Einzelheiten wechseln Sie auf den jeweiligen Bildschirm.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
