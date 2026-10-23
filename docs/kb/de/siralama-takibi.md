---
title: Ranking-Verfolgung
description: Durchschnittliche Google-Position Ihrer Suchanfragen Tag für Tag, auch über Googles 16-Monate-Grenze hinaus, weil die Daten auf Ihrem Computer liegen.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

Sie sehen, wie Ihre Suchanfragen im Lauf der Zeit steigen und fallen. Google Search Console begrenzt den Verlauf auf 16 Monate. Sie zeigt auch nicht, an welchem Tag eine Suchanfrage auf welche Position gefallen ist.

Die App ruft diese Daten Tag für Tag ab und speichert sie auf diesem Computer. Mit jedem Öffnen des Bildschirms wächst das Archiv. Mit der Zeit reichen Sie weiter zurück, als Google zeigt.

## Was auf dem Bildschirm zu sehen ist

**Zeitraum.** Zur Wahl stehen 30 gün (30 Tage), 90 gün (90 Tage, Standard), 6 ay (6 Monate), 16 ay (16 Monate) und **Arşivin tamamı** (Gesamtes Archiv). Der Zeitraum wird von heute bis drei Tage zurück gerechnet.

**Zeile mit dem Archivstatus.** Sie nennt, wie viele Tage und wie viele Zeilen im Archiv sind. Bei jedem Öffnen holt der Bildschirm fehlende Tage von Google nach. Steht dort „Bu açılışta N gün eklendi.“ (Beim Öffnen wurden N Tage ergänzt.), sind neue Tage hinzugekommen. Steht dort „Kalan günler sonraki açılışta tamamlanacak.“ (Die übrigen Tage werden beim nächsten Öffnen ergänzt.), geht die Arbeit beim nächsten Öffnen weiter.

Das Feld **Sorgu içinde ara** (In Suchanfragen suchen) grenzt die Liste ein.

**Filter für Veränderungen.** **Yükselenler** (Aufsteiger) und **Düşenler** (Absteiger) zeigen Suchanfragen, die sich um mindestens eine halbe Position bewegt haben. Dazu kommen **Şu an ilk 10'da** (Aktuell in den Top 10) und **İlk 10'dan çıkanlar** (Aus den Top 10 gefallen). Es gibt zwei weitere Schnellfilter: **Gösterimi yüksek** (Viele Impressionen; mindestens 100 Impressionen) und **Hiç tıklanmayan** (Nie geklickt).

**Positionsverteilung.** Die Balken zeigen, wie viele Ihrer Suchanfragen in den Bereichen 1-3, 4-10, 11-20 und 21+ liegen.

**Aufsteiger und Absteiger.** Sie sehen zwei kurze Listen: „En çok yükselenler“ (Größte Aufsteiger) und „En çok düşenler“ (Größte Absteiger).

**Tabelle.** Die Spalten sind: **Sorgu** (Suchanfrage), **Ort. sıra** (Durchschn. Position), **Değişim** (Veränderung), **Gösterim** (Impressionen), **Tıklama** (Klicks), **Gün** (Tage). Die Spalte **Gün** zeigt, an wie vielen Tagen des gewählten Zeitraums die Suchanfrage erschien. Eine Suchanfrage, die in 90 Tagen nur an 3 Tagen erscheint, wird selten gesucht. In der Zelle Veränderung steht „Yükseldi 2,4“ (Gestiegen 2,4) oder „Düştü 1,1“ (Gefallen 1,1). Das Zeilenmenü hat drei Einträge: **Kelimeyi kopyala** (Suchbegriff kopieren), **Kayıtlı kelimelere ekle** (Zu gespeicherten Suchbegriffen hinzufügen), **Arama performansında ara** (In der Suchleistung suchen).

**Suchanfrage-Verlauf.** Ein Klick auf eine Zeile öffnet die Positionslinie dieser Suchanfrage Tag für Tag. Der Link **Arama performansında aç** (In der Suchleistung öffnen) zeigt dieselbe Suchanfrage auf dem anderen Bildschirm.

**Leeres Archiv.** Ist das Archiv leer, steht dort „Henüz hangi kelimeyle arandığınız bilinmiyor“ (Noch ist nicht bekannt, mit welchen Suchbegriffen man Sie findet), und die Schaltfläche **Arama performansını aç** (Suchleistung öffnen) erscheint. Die Liste ist auf die 100 am häufigsten angezeigten Suchanfragen begrenzt. Gibt es mehr, steht darunter ein Hinweis.

## So gehen Sie vor

1. Öffnen Sie den Bildschirm zum ersten Mal und warten Sie, bis in der Archivzeile „eklendi“ (ergänzt) steht.
2. Die erste Befüllung reicht bis zu 480 Tage zurück. Das kann einige Öffnungen dauern.
3. Suchen Sie einen Rückgang, klicken Sie auf **Düşenler**. Blenden Sie danach mit **Gösterimi yüksek** das Unwichtige aus.
4. Klicken Sie auf die oberste Suchanfrage. Lesen Sie im Verlaufsdiagramm ab, an welchem Tag der Rückgang begann.
5. Markieren Sie die Suchanfragen, die Sie verfolgen möchten, mit **Kayıtlı kelimelere ekle**.
6. Sehen Sie einmal im Monat in die Listen „En çok yükselenler“ und „En çok düşenler“. Für den Überblick genügt das.

## Wie die Zahlen berechnet werden

Das Archiv füllt sich nur mit Daten, die Google endgültig festgelegt hat. Bei jedem Öffnen werden die letzten drei Tage neu abgerufen, weil Google diese Tage nachträglich korrigieren kann. So werden korrigierte Tage im Archiv neu geschrieben.

Klicks und Impressionen sind Summen. **Ort. sıra** gewichtet Tage mit vielen Impressionen stärker. **Gün** ist die Zahl der Tage mit Daten.

Die Veränderung ist die Durchschnittsposition des vorherigen Zeitraums minus die Position dieses Zeitraums. Ist das Ergebnis positiv, sind Sie gestiegen. Der vorherige Zeitraum ist gleich lang und endet unmittelbar vor diesem Zeitraum.

Die Liste enthält die 100 am häufigsten angezeigten Suchanfragen. Im Browser wird sie in Seiten zu 25, 50 oder 100 Zeilen aufgeteilt.

## Häufige Fragen

**Warum weicht die Zahl von der in der Search Console ab?** Das Archiv enthält nur endgültige Tage und reicht bis drei Tage zurück. Haben Sie in der Search Console einen Zeitraum gewählt, der den heutigen Tag einschließt, stimmen die Zahlen nicht überein.

**Die Suchanfrage steht in der Liste, aber ihr Positionsverlauf ist leer.** Die Suchanfrage ist möglicherweise nur an wenigen Tagen erschienen. Sehen Sie in die Spalte **Gün**.

**Warum bleibt das Archiv an einem Tag hängen?** Die App ruft im Hintergrund keine Daten ab. Öffnen Sie den Bildschirm und warten Sie auf den Hinweis „eklendi“.

**Kann ich die Position meines Wettbewerbers sehen?** Nein. Die Search Console liefert nur die Daten Ihrer eigenen Website.

**Was bedeutet Position 1,0?** Sie sind im ganzen Zeitraum bei jeder Impression auf Position 1 erschienen. Wären Sie an einem Tag auf Position 3 gefallen, läge der Durchschnitt über 1.

## Grenzen

Das Archiv enthält nur die Tage, die diese Installation gesehen hat. Haben Sie die App gerade erst installiert, können Sie beim ersten Öffnen höchstens 480 Tage zurückgehen. Seltene Suchanfragen, die Google ausblendet, gelangen auch nicht ins Archiv. Wird das Archiv gelöscht, ist der Verlauf weg. Das geschieht zum Beispiel, wenn Sie den Docker-Datenspeicher oder den Datenordner entfernen. Eine Sicherung müssen Sie selbst anlegen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
