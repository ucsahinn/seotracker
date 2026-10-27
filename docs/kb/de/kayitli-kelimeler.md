---
title: Gespeicherte Suchbegriffe
description: Wichtige Suchanfragen speichern, mit Etiketten versehen und ihre Durchschnittsposition der letzten 90 Tage sehen. Export als CSV oder an Google Tabellen.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Sie sammeln die Suchanfragen, die Ihnen wichtig sind, versehen sie mit Etiketten und verfolgen ihre Position.

Die App schlägt Ihnen keine Suchbegriffe vor. Auf dem Bildschirm **Suchleistung** oder **Ranking-Verfolgung** wählen Sie im Menü einer Zeile **Als Keyword speichern**, und der Begriff landet hier. Hier sehen Sie für jeden Begriff die durchschnittliche Position der letzten 90 Tage. Die Position stammt aus dem Archiv der Ranking-Verfolgung. Das Speichern startet bei Google keine neue Verfolgung. Es filtert die ohnehin gesammelten Daten für diese Begriffe.

## Was auf dem Bildschirm zu sehen ist

**Obere Leiste.** Sie hat eine Erklärungszeile sowie die Schaltflächen **Nach Google Tabellen exportieren**, **CSV herunterladen** und **Aktualisieren**. Darunter steht „N gespeicherte Keywords“.

**Karte Positionsverteilung.** Die Balken zeigen, wie viele Ihrer Suchbegriffe auf Position 1-3, 4-10, 11-20 und 21+ stehen. Darunter steht der Hinweis „Positionen sind der Durchschnitt der letzten 90 Tage“. Ein Suchbegriff ohne Eintrag im Archiv zählt als „Keine Daten“. Ist das Archiv lückenhaft, sehen Sie „Unbekannt (Archiv abgeschnitten)“. Die Schaltflächen **Top 10** und **Position 11-20** grenzen die Tabelle auf diesen Bereich ein.

**Filterbereich.** Unter **Ergebnisse filtern** gibt es die Felder **Enthält** und **Enthält nicht**. Beide suchen Text innerhalb des Suchbegriffs. Für die Suche nach Etiketten nutzen Sie **Tags suchen**. **Alle entfernen** setzt alles zurück. In einem Projekt kann es höchstens 50 Etiketten geben.

**Tabelle.** Die Spalten sind: **Keyword**, **Ø Position**, **Absicht**, **Tags**, **Hinzugefügt**. Ist die Position leer, steht beim Daraufzeigen „Die Search Console hat für dieses Keyword keine Position erfasst“. Die Spalte **Absicht** zeigt, was die Person will, die den Begriff sucht:

- Informativ: möchte etwas lernen.
- Kommerzielle Recherche: will vergleichen und auswählen.
- Transaktional: ist bereit zu kaufen.
- Navigationsbezogen: sucht eine bestimmte Website.
- Unbekannt: nicht klar.

In der Tabelle erscheinen die Kurzformen: Info, Kommerziell, Transaktional, Navigationsbezogen und ein Fragezeichen. Das Zeilenmenü hat drei Einträge: **Keyword kopieren**, **In der Suchleistung suchen**, **Keyword löschen**.

**Mehrfachaktionen.** Markieren Sie Zeilen, erscheinen oben **Keywords kopieren**, **Tags aktualisieren** und die Schaltfläche zum Löschen. Vor dem Löschen kommt die Warnung „wird dauerhaft gelöscht. Das lässt sich nicht rückgängig machen.“

**Leere Zustände.** Gibt es keinen Suchbegriff, steht dort „Noch keine gespeicherten Keywords“. Es erscheint eine Abkürzung: **Suchanfragen durchsuchen**; ist die Search Console noch nicht verbunden, stattdessen **Search Console verbinden**. Passt kein Suchbegriff zum Filter, steht dort „Keine Keywords entsprechen diesen Filtern“.

## So gehen Sie vor

1. Öffnen Sie auf dem Bildschirm **Suchleistung** den Reiter **Ranking-Chancen**. Speichern Sie fünf bis zehn Suchanfragen, die Sie für wichtig halten, mit **Als Keyword speichern**. Wählen Sie auch Suchanfragen von Seiten, die Umsatz bringen; sie sind ebenso nützlich wie die am häufigsten angezeigten.
2. Kommen Sie hierher und markieren Sie die Suchbegriffe. Vergeben Sie mit **Tags aktualisieren** Etiketten wie „ürün“ (Produkt), „blog“ oder „marka“ (Marke). Das erleichtert den Vergleich im nächsten Monat.
3. Sehen Sie einmal im Monat auf die Karte **Positionsverteilung**. Die Suchbegriffe im Bereich 11-20 sind der ersten Seite am nächsten. Deren Seiten finden Sie auf dem Bildschirm **Chancen**.
4. Für einen Bericht wählen Sie **CSV herunterladen** oder **Nach Google Tabellen exportieren**. Die Datei enthält die Filter, die Sie angewendet haben.

## Wie die Zahlen berechnet werden

Suchbegriffe und Etiketten liegen in der Datenbank auf diesem Computer. **Ø Position** wird aus dem Archiv der Ranking-Verfolgung für die letzten 90 Tage berechnet. Tage mit vielen Impressionen beeinflussen den Durchschnitt stärker. Groß- und Kleinschreibung spielt keine Rolle.

Aus dem Archiv werden die 500 am häufigsten angezeigten Suchanfragen abgerufen. Liegt Ihr gespeicherter Suchbegriff außerhalb dieser 500, erscheint seine Position als „unbekannt“.

Die Angabe zur Absicht wird nur eingetragen, wenn sie beim Speichern des Suchbegriffs mitkam. Sie wird nicht nachträglich berechnet. Die Liste wird in Seiten zu 50, 100 oder 250 Zeilen aufgeteilt.

## Häufige Fragen

**Ich habe den Suchbegriff gespeichert. Warum ist die Position leer?** Das Archiv hat für diesen Begriff vielleicht noch keine Tage gesammelt. Öffnen Sie den Bildschirm **Ranking-Verfolgung** und warten Sie, bis sich das Archiv füllt. Klicken Sie dann hier auf **Aktualisieren**.

**Wenn ich bei Google suche, ist meine Position anders.** Die Position hier ist der Durchschnitt von 90 Tagen. Sie lässt sich nicht mit einer einzelnen Suche vergleichen.

**Wo ist die Spalte Suchvolumen?** Es gibt sie nicht. Die App schätzt kein Volumen. Die Zahl der Impressionen sehen Sie auf dem Bildschirm **Suchleistung**.

**Kann ich denselben Suchbegriff zweimal speichern?** Nein. Derselbe Text ergibt nur einen Eintrag.

**Werden beim Löschen eines Etiketts die Suchbegriffe gelöscht?** Nein. Das Etikett verschwindet, die Suchbegriffe bleiben.

## Grenzen

Dieser Bildschirm ist kein Werkzeug zur Suchbegriff-Recherche. Er schlägt keine Begriffe vor und zeigt weder Volumen noch Schwierigkeit. Die Positionsangabe ist auf die Tage begrenzt, die das Archiv abdeckt. Die Positionen seltener Suchanfragen, die Google ausblendet, erreichen die App nie. Die Daten liegen in der Datenbank dieser Installation, die Sicherung müssen Sie selbst anlegen.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
