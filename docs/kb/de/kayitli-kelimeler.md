---
title: Gespeicherte Suchbegriffe
description: Wichtige Suchanfragen speichern, mit Etiketten versehen und ihre Durchschnittsposition der letzten 90 Tage sehen. Export als CSV oder an Google Tabellen.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Sie sammeln die Suchanfragen, die Ihnen wichtig sind, versehen sie mit Etiketten und verfolgen ihre Position.

Die App schlägt Ihnen keine Suchbegriffe vor. Auf dem Bildschirm **Arama performansı** (Suchleistung) oder **Sıralama takibi** (Ranking-Verfolgung) wählen Sie im Menü einer Zeile **Kelime olarak kaydet** (Als Suchbegriff speichern), und der Begriff landet hier. Hier sehen Sie für jeden Begriff die durchschnittliche Position der letzten 90 Tage. Die Position stammt aus dem Archiv der Ranking-Verfolgung. Das Speichern startet bei Google keine neue Verfolgung. Es filtert die ohnehin gesammelten Daten für diese Begriffe.

## Was auf dem Bildschirm zu sehen ist

**Obere Leiste.** Sie hat eine Erklärungszeile sowie die Schaltflächen **E-Tablolar'a aktar** (An Google Tabellen übergeben), **CSV indir** (CSV herunterladen) und **Yenile** (Aktualisieren). Darunter steht „{n} kayıtlı kelime“ ({n} gespeicherte Suchbegriffe).

**Karte Positionsverteilung.** Die Balken zeigen, wie viele Ihrer Suchbegriffe auf Position 1-3, 4-10, 11-20 und 21+ stehen. Darunter steht der Hinweis „sıralar son 90 günün ortalaması“ (Positionen sind der Durchschnitt der letzten 90 Tage). Ein Suchbegriff ohne Eintrag im Archiv zählt als „Verisi yok“ (Keine Daten). Ist das Archiv lückenhaft, sehen Sie „Bilinmiyor (arşiv kesildi)“ (Unbekannt, Archiv abgebrochen). Die Schaltflächen **İlk 10** (Top 10) und **Sıra 11-20** (Position 11 bis 20) grenzen die Tabelle auf diesen Bereich ein.

**Filterbereich.** Unter **Sonuçları filtrele** (Ergebnisse filtern) gibt es die Felder **İçersin** (Enthält) und **İçermesin** (Enthält nicht). Beide suchen Text innerhalb des Suchbegriffs. Für die Suche nach Etiketten nutzen Sie **Etiket ara** (Etikett suchen). **Tümünü temizle** (Alle zurücksetzen) setzt alles zurück. In einem Projekt kann es höchstens 50 Etiketten geben.

**Tabelle.** Die Spalten sind: **Kelime** (Suchbegriff), **Ort. sıra** (Durchschn. Position), **Amaç** (Absicht), **Etiketler** (Etiketten), **Eklenme** (Hinzugefügt am). Ist die Position leer, steht beim Daraufzeigen „Search Console bu kelime için sıra kaydetmemiş“ (Die Search Console hat für diesen Begriff keine Position erfasst). Die Spalte **Amaç** zeigt, was die Person will, die den Begriff sucht:

- Informationsorientiert: möchte etwas lernen.
- Kommerzielle Recherche: will vergleichen und auswählen.
- Transaktionsorientiert: ist bereit zu kaufen.
- Navigierend: sucht eine bestimmte Website.
- Unbekannt: nicht klar.

In der Tabelle erscheinen die Kurzformen: Bilgi (Info), Ticari (Kommerziell), İşlem (Transaktion), Gezinme (Navigation) und ein Fragezeichen. Das Zeilenmenü hat drei Einträge: **Kelimeyi kopyala** (Suchbegriff kopieren), **Arama performansında ara** (In der Suchleistung suchen), **Kelimeyi sil** (Suchbegriff löschen).

**Mehrfachaktionen.** Markieren Sie Zeilen, erscheinen oben **Kelimeleri kopyala** (Suchbegriffe kopieren), **Etiketleri güncelle** (Etiketten aktualisieren) und die Schaltfläche zum Löschen. Vor dem Löschen kommt die Warnung „kalıcı olarak silinecek. Bu geri alınamaz.“ (wird dauerhaft gelöscht. Das lässt sich nicht rückgängig machen.)

**Leere Zustände.** Gibt es keinen Suchbegriff, steht dort „Henüz kayıtlı kelime yok“ (Noch keine gespeicherten Suchbegriffe). Zwei Abkürzungen erscheinen: **Sorgulara göz at** (Suchanfragen ansehen) und **Sıralamayı aç** (Ranking öffnen). Passt kein Suchbegriff zum Filter, steht dort „Bu filtrelere uyan kelime yok“ (Kein Suchbegriff passt zu diesen Filtern).

## So gehen Sie vor

1. Öffnen Sie auf dem Bildschirm **Arama performansı** den Reiter **Sıra 5-20** (Position 5 bis 20). Speichern Sie fünf bis zehn Suchanfragen, die Sie für wichtig halten, mit **Kelime olarak kaydet**. Wählen Sie auch Suchanfragen von Seiten, die Umsatz bringen; sie sind ebenso nützlich wie die am häufigsten angezeigten.
2. Kommen Sie hierher und markieren Sie die Suchbegriffe. Vergeben Sie mit **Etiketleri güncelle** Etiketten wie „ürün“ (Produkt), „blog“ oder „marka“ (Marke). Das erleichtert den Vergleich im nächsten Monat.
3. Sehen Sie einmal im Monat auf die Karte **Sıra dağılımı** (Positionsverteilung). Die Suchbegriffe im Bereich 11-20 sind der ersten Seite am nächsten. Deren Seiten finden Sie auf dem Bildschirm **Fırsatlar** (Chancen).
4. Für einen Bericht wählen Sie **CSV indir** oder **E-Tablolar'a aktar**. Die Datei enthält die Filter, die Sie angewendet haben.

## Wie die Zahlen berechnet werden

Suchbegriffe und Etiketten liegen in der Datenbank auf diesem Computer. **Ort. sıra** wird aus dem Archiv der Ranking-Verfolgung für die letzten 90 Tage berechnet. Tage mit vielen Impressionen beeinflussen den Durchschnitt stärker. Groß- und Kleinschreibung spielt keine Rolle.

Aus dem Archiv werden die 500 am häufigsten angezeigten Suchanfragen abgerufen. Liegt Ihr gespeicherter Suchbegriff außerhalb dieser 500, erscheint seine Position als „unbekannt“.

Die Angabe zur Absicht wird nur eingetragen, wenn sie beim Speichern des Suchbegriffs mitkam. Sie wird nicht nachträglich berechnet. Die Liste wird in Seiten zu 50, 100 oder 250 Zeilen aufgeteilt.

## Häufige Fragen

**Ich habe den Suchbegriff gespeichert. Warum ist die Position leer?** Das Archiv hat für diesen Begriff vielleicht noch keine Tage gesammelt. Öffnen Sie den Bildschirm **Sıralama takibi** und warten Sie, bis sich das Archiv füllt. Klicken Sie dann hier auf **Yenile**.

**Wenn ich bei Google suche, ist meine Position anders.** Die Position hier ist der Durchschnitt von 90 Tagen. Sie lässt sich nicht mit einer einzelnen Suche vergleichen.

**Wo ist die Spalte Suchvolumen?** Es gibt sie nicht. Die App schätzt kein Volumen. Die Zahl der Impressionen sehen Sie auf dem Bildschirm **Arama performansı** (Suchleistung).

**Kann ich denselben Suchbegriff zweimal speichern?** Nein. Derselbe Text ergibt nur einen Eintrag.

**Werden beim Löschen eines Etiketts die Suchbegriffe gelöscht?** Nein. Das Etikett verschwindet, die Suchbegriffe bleiben.

## Grenzen

Dieser Bildschirm ist kein Werkzeug zur Suchbegriff-Recherche. Er schlägt keine Begriffe vor und zeigt weder Volumen noch Schwierigkeit. Die Positionsangabe ist auf die Tage begrenzt, die das Archiv abdeckt. Die Positionen seltener Suchanfragen, die Google ausblendet, erreichen die App nie. Die Daten liegen in der Datenbank dieser Installation, die Sicherung müssen Sie selbst anlegen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
